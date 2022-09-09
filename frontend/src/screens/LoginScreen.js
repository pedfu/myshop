import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [ searchParams ] = useSearchParams();
    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/';

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selector = useSelector(state => state.userLogin);
    const { loading, userInfo, error } = selector;

    useEffect(() => {
        if(userInfo) {
            if(redirect !== '' && redirect !== 'login') {
                navigate(`${redirect}`);
            } else {
                navigate('/');
            }
        }
    }, [dispatch, redirect, userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

  return (
    <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email' className='pb-3'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                    type='email' 
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className='pb-3'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                    type='password' 
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='pb-3'>
                Sign In
            </Button>

            <Row className='py-3'>
                <Col>
                    New Customer?{''}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}> Register</Link>
                </Col>
            </Row>
        </Form>
    </FormContainer>
  )
}
