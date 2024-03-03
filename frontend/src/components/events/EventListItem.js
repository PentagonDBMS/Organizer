import React, { useState } from 'react';
import { Card, Modal, Button, Label, ButtonGroup, Header, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const EventListItem = ({ event, onDelete, index }) => {
    const [style, setStyle] = useState({
        opacity: 0,
        transform: 'translateY(20px)',
    });

    useEffect(() => {
        // Start the animation after a delay based on the index
        const delay = (index + 1) * 100; // Delay in milliseconds
        const animationDuration = 500; // Duration in milliseconds
        const timer = setTimeout(() => {
            setStyle({
                opacity: 1,
                transform: 'translateY(0)',
                transition: `opacity ${animationDuration}ms ease-out, transform ${animationDuration}ms ease-out`,
            });
        }, delay);

        // Clear styles after the animation completes
        const clearStyleTimer = setTimeout(() => {
            setStyle({});
        }, delay + animationDuration);

        return () => {
            clearTimeout(timer);
            clearTimeout(clearStyleTimer);
        };
    }, [index]);

    const [open, setOpen] = useState(false);

    // Determine the event status based on current time
    const handleDelete = () => {
        setOpen(false);
        onDelete(event.event_id);
    };

    return (
        <Card centered style={style} className="event-item-animation">
            <Modal
                size='small'
                open={open}
                onClose={() => setOpen(false)}
                dimmer='blurring'
            >
                <Modal.Header>Delete {event.name}</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete {event.name}?</p>
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
            <Card.Content as={Link} to={`/events/${event.event_id}/details`}>
                <Header as='h2' style={{ margin: '10px 0' }}>
                    <a >{event.name}</a>
                </Header>
            </Card.Content>
            <Card.Content>
                <Card.Description>
                    {event.description}
                </Card.Description>
                {new Date().getTime() > new Date(event.start_time).getTime() && new Date().getTime() < new Date(event.end_time).getTime() ? (
                    <Label color='green' ribbon='right' as='a'>
                        Live
                    </Label>
                ) : new Date().getTime() < new Date(event.start_time).getTime() ? (
                    <Label color='teal' ribbon='right' as='a'>
                        Upcoming
                    </Label>
                ) : (
                    <Label color='red' ribbon='right' as='a'>
                        Completed
                    </Label>
                )}
            </Card.Content>
            <Card.Content>
                <Card.Description>
                    <ButtonGroup fluid>
                        <Button as={Link} to={`/events/edit/${event.event_id}`}>
                            Edit
                        </Button>
                        {/* <ButtonOr /> */}
                        <Button negative onClick={() => setOpen(true)}>
                            Delete
                        </Button>
                    </ButtonGroup>
                </Card.Description>

            </Card.Content>
        </Card>
    );
};

export default EventListItem;
