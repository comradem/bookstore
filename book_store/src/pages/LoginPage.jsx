import React, {useState,useContext} from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router';
import '../styles/login.css';
import {useHttp} from '../hooks/http.hook';
import {PayloadContext} from '../context/PayloadContext';


export default function LoginPage(props) {
    const [form, setForm] = useState({email: '', password: ''});
    const {request, loading} = useHttp();
    const auth = useContext(PayloadContext);

    const loginHandler = async () => {
        try {
            const data = await request('api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId, data.userType);
            // console.log("data received from login and payload has been updated: "+ JSON.stringify(auth));
        } catch (e) {
            //handled in hook
        }
    };

    const regHandler = async () => {
        try {
            const data = await request('api/auth/register', 'POST', {...form});

        } catch (e) {
            //handled in hook
        }
    };

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value});
    };

    if (auth.isLoggedIn === true) {
        return <Redirect to={{
            pathname: '/manager',
            state: props.storeData,
        }}
        />;
    }
    return (
        <Container>
            <Form className='p-login'>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name='email' type="email" placeholder="Enter email" value={form.email}
                                  onChange={handleChange}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type="password" placeholder="Password" value={form.password}
                                  onChange={handleChange}/>
                </Form.Group>
                <Button variant="light" type="button" onClick={loginHandler} disabled={loading}>
                    Login
                </Button>
                <Button variant="light" type="button" onClick={regHandler} disabled={loading}>
                    Register
                </Button>
            </Form>
        </Container>
    );
}
