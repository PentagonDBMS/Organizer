import React, { useState } from 'react';
import { Button, Icon, List, Image, Modal } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const StudentVolunteeringListItem = ({ event, onDelete }) => {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const handleDelete = () => {
        setOpen(false);
        onDelete(event.event_id, event.volunteer_id);
    };

    return (
        <List.Item>
            <Modal
                size='small'
                open={open}
                onClose={() => setOpen(false)}
                dimmer='blurring'
            >
                <Modal.Header>Delete {event.name} Event</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete this event?</p>
                    <p>This action cannot be undone.</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => setOpen(false)}>
                        No
                    </Button>
                    <Button positive onClick={handleDelete}>
                        Yes
                    </Button>
                </Modal.Actions>
            </Modal>
            <List.Content floated='right'>
                <Button icon onClick={() => setOpen(true)} color='red'>
                    <Icon name='trash' />
                </Button>
            </List.Content>
            <Image avatar src='https://react.semantic-ui.com/images/avatar/large/elliot.jpg' size='tiny' />
            <List.Content>
                <List.Header as='a' onClick={() => navigate(`/events/${event.event_id}/details`)}>{event.name}</List.Header>
                <List.Description>{event.description}</List.Description>
            </List.Content>
        </List.Item>
    );
}

export default StudentVolunteeringListItem;