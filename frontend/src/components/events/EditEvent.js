import React, { useState, useEffect } from 'react';
import { Button, Form, Segment, Header, Loader } from 'semantic-ui-react';
import { useParams, useNavigate } from 'react-router-dom';


const EditEvent = () => {
    const { id } = useParams();

    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        start_time: '',
        end_time: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/org/events/${id}`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setFormData({
                    name: data.name,
                    description: data.description,
                    start_time: data.start_time,
                    end_time: data.end_time,
                });
            }
            setLoading(false);
        };



        fetchEvent();
    }, [id]);

    const handleChange = (e, { name, value }) => setFormData({ ...formData, [name]: value });

    const handleSubmit = async () => {

        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/org/events/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            navigate('/events');
        } else {
            alert('Failed to update event');
        }
        setLoading(false);
    };

    if (loading) {
        return <Loader active>Loading Event...</Loader>
    }

    return (
        <>
            <Header textAlign='centered' as='h2'>Edit Event</Header>
            <Segment>
                <Form onSubmit={handleSubmit}>
                    <Form.Input
                        label="Name"
                        type="text"
                        name="name"
                        placeholder="Event Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <Form.TextArea
                        label="Description"
                        name="description"
                        placeholder="Event Description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <Form.Input
                        label="Start Time"
                        type="datetime-local"
                        name="start_time"
                        value={formData.start_time}
                        onChange={handleChange}
                    />
                    <Form.Input
                        label="End Time"
                        type="datetime-local"
                        name="end_time"
                        value={formData.end_time}
                        onChange={handleChange}
                    />
                    <Button type='submit' primary>Update Event</Button>
                </Form>
            </Segment>
        </>
    );
}

export default EditEvent;

