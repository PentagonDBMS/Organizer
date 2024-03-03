// src/components/auth/Register.js
import React, { useState } from 'react';
import { Button, Container, Form, Header, Segment, Message } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e, { name, value }) => setFormData({ ...formData, [name]: value });

    const handleSubmit = async () => {
        setLoading(true);
        setError(''); // Reset error state
        if (await register(formData.name, formData.email, formData.password)) {
            navigate('/dashboard'); // Or wherever you'd like to redirect post-registration
        } else {
            setError('Registration failed. Please try again.');
        }
        setLoading(false);
    };

    return (
        <Container>
            <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>Admin Register</Header>
            <Segment loading={loading}>
                {error && <Message error content={error} />}
                <Form onSubmit={handleSubmit}>
                    <Form.Input
                        label="Name"
                        type="text"
                        name="name"
                        placeholder="Full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <Form.Input
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Form.Input
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <Button type='submit' fluid primary>Register</Button>
                </Form>
            </Segment>
        </Container>
    );
};

export default Register;
