// src/components/admin/Participants.js
import React from 'react';
import { Container, Header, List } from 'semantic-ui-react';

const Participants = () => {
    return (
        <Container>
            <Header as='h2' textAlign='center'>Participants Management</Header>
            <p>View and manage participants registered for the fest.</p>
            {/* Placeholder for participants list */}
            <List>
                <List.Item>Participant 1</List.Item>
                <List.Item>Participant 2</List.Item>
                {/* Add more participants dynamically */}
            </List>
        </Container>
    );
};

export default Participants;
