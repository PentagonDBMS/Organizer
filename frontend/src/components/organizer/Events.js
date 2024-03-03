// src/components/admin/Events.js
import React from 'react';
import { Container, Header, Button } from 'semantic-ui-react';

const Events = () => {
    return (
        <Container>
            <Header as='h2' textAlign='center'>Events Management</Header>
            <p>Here you can manage your fest events. Add, edit, or remove events as needed.</p>
            {/* Placeholder for event management functionality */}
            <Button primary>Add Event</Button>
        </Container>
    );
};

export default Events;
