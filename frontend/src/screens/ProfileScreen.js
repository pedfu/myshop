import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { checkPassword, getUserDetails, update } from '../actions/userActions';

export default function ProfileScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [previousPassword, setPreviousPassword] = useState('');
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const selector = useSelector(state => state.userDetails);
    const { loading, user, error } = selector;

    const selector2 = useSelector(state => state.userLogin);
    const { userInfo } = selector2;

    const selector3 = useSelector(state => state.userUpdateProfile);
    const { success } = selector3;

    useEffect(() => {
        if(!userInfo) {
            navigate('/login');
        } else {
            if(!user.name) {
                dispatch(getUserDetails('profile'));
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, userInfo, user, navigate])

    const submitHandler = async (e) => {
        e.preventDefault();
        if(previousPassword || newPassword) {
            if(previousPassword === '' || newPassword === '') {
                setMessage('Password should not be empty')
            }
            if(previousPassword === newPassword) {
                setMessage('Passwords cannot be equal')
            } else {
                const checkedPassword = await checkPassword(email, previousPassword);    
                if(checkedPassword) {
                    setMessage(null);
                    dispatch(update({ id: user._id, name, email, password: newPassword }))
                    dispatch(getUserDetails('profile'));  
                    setPreviousPassword('');
                    setNewPassword('');  
                } else {
                    setMessage('Password incorrect');
                }
            }
        } else {
            setMessage(null);
            dispatch(update(name, email));
            dispatch(getUserDetails('profile')); 
            setPreviousPassword('');
            setNewPassword('');
        }
    }

  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
            {loading && <Loader />}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='pb-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email' className='pb-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        type='email' 
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <p>Ideia - pedir senha antiga e senha nova, verificar se ambas sao diferentes e depois verificar se a senha antiga esta correta e mudar a senha</p>
                <Form.Group controlId='previouspassword' className='pb-3'>
                    <Form.Label>Previous password</Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='Enter password'
                        value={previousPassword}
                        onChange={(e) => setPreviousPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='newpassword' className='pb-3'>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='Enter password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>


                <Button type='submit' variant='primary' className='pb-3'>
                    Update
                </Button>
            </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
        </Col>
    </Row>
  )
}
