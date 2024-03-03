// src/components/layout/Footer.js
import React from 'react';
import { Container, Divider, Segment } from 'semantic-ui-react';

const Footer = () => {
    return (
        <Segment inverted vertical style={{ padding: '2em 0em', marginTop: 'auto' }}>
            <Container textAlign='center'>
                University Fest Organizer Panel © {new Date().getFullYear()}
                <Divider inverted section />
            </Container>
        </Segment>
    );
};

export default Footer;
