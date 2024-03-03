// In src/components/events/EventForm.js

import React, { useState } from 'react';
import { Button, Form, Header, Message, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const EventForm = () => {
    const [event, setEvent] = useState({
        name: '',
        description: '',
        // Set start_time and end_time to current date and time
        start_time: new Date().toISOString().slice(0, 16),
        end_time: new Date().toISOString().slice(0, 16),
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e, { name, value }) => setEvent({ ...event, [name]: value });

    const handleSubmit = async () => {

        setIsLoading(true);
        // Assuming you have an API endpoint to create an event
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/org/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include authorization if needed
            },
            credentials: 'include',
            body: JSON.stringify(event)
        });

        setIsLoading(false);
        if (response.ok) {
            navigate('/events');
        } else {
            const errorData = await response.json();
            setError(errorData.message || 'An error occurred');
        }
    };

    return (
        <>
            <Header textAlign='centered' as='h2'>Create Event</Header>
            <Segment>
                <Form loading={isLoading} error={!!error} onSubmit={handleSubmit}>
                    <Form.Input
                        label="Name"
                        type="text"
                        name="name"
                        value={event.name}
                        onChange={handleChange}
                        required
                    />
                    <Form.TextArea
                        label="Description"
                        name="description"
                        value={event.description}
                        onChange={handleChange}
                        required
                    />
                    <Form.Input
                        label="Start Time"
                        type="datetime-local"
                        name="start_time"
                        value={event.start_time}
                        onChange={handleChange}
                        required
                    />
                    <Form.Input
                        label="End Time"
                        type="datetime-local"
                        name="end_time"
                        value={event.end_time}
                        onChange={handleChange}
                        required
                    />
                    {error && <Message error content={error} />}
                    <Button type='submit' primary>Create Event</Button>
                </Form >
            </Segment >
        </>
    );
};

export default EventForm;
