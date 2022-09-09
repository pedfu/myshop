import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { checkPassword, getUserDetails, update } from '../actions/userActions';
import { listUserOrders } from '../actions/orderActions';

export default function ProfileScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [previousPassword, setPreviousPassword] = useState('');
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, user, error } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const ordersListUser = useSelector(state => state.ordersListUser);
    const { loading: loadingOrders, orders, error: errorOrders } = ordersListUser;

    useEffect(() => {
        if(!userInfo) {
            navigate('/login');
        } else {
            if(!user.name) {
                dispatch(getUserDetails('profile'));
                dispatch(listUserOrders())
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


                <Button type='submit' variant='primary' className='mb-5'>
                    Update
                </Button>
            </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders ? 
                        orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? (
                                    order.paidAt.substring(0,10)
                                ) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}</td>
                                <td>{order.isDelivered ? (
                                    order.deliveredAt.substring(0,10)
                                ) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className='btn-sm' variant='light'>Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        )) : <tr><td><h3>No orders</h3></td></tr>}
                    </tbody>
                </Table>
            )   }
        </Col>
    </Row>
  )
}
