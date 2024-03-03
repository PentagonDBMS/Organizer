import React from 'react'
import { useState, useEffect } from 'react';
import { Button, Card, Container, Divider, Icon, Label, ButtonGroup, ButtonOr, Header } from 'semantic-ui-react';
import { useScreenSize } from '../../contexts/ScreenSizeContext';
import { useParams } from 'react-router-dom';
import EventDetailsPlaceholder from '../layout/EventDetailsPlaceholder';
import { Link } from 'react-router-dom';


const EventInfo = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isMobile } = useScreenSize();

    useEffect(() => {
        const fetchEvent = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/org/events/${id}`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const eventData = await response.json();
                setEvent(eventData);
            }
            setLoading(false);
        };

        fetchEvent();
    }, [id]);

    if (loading) {
        return <EventDetailsPlaceholder />;
    }

    return (
        <Container>
            <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>
                Event Details
            </Header>
            <Divider />
            <Card centered raised size='large'>

                <Card.Content>
                    {/* display event size in large font */}
                    <Header as='h2' style={{ margin: '10px 0' }}>
                        <a>{event.name}</a>
                    </Header>
                    <Card.Meta size='small'>
                        Event ID: {event.event_id}
                    </Card.Meta>
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
                        <Icon name='time' />
                        {`Starting at ${new Date(new Date(event.start_time).getTime() + (5 * 60 + 30) * 60 * 1000).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}`}
                        <br />
                        <Icon name='time' />
                        {`Ends at ${new Date(new Date(event.end_time).getTime() + (5 * 60 + 30) * 60 * 1000).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}`}
                    </Card.Description>

                </Card.Content>
                <Card.Content>
                    <Card.Description>
                        <ButtonGroup fluid>
                            <Button color='green' as={Link} to={`/events/${event.event_id}/participants`}>
                                Participants
                            </Button>
                            {/* <ButtonOr /> */}
                            <Button color='blue' as={Link} to={`/events/${event.event_id}/volunteers`}>
                                Volunteers
                            </Button>
                        </ButtonGroup>
                    </Card.Description>
                </Card.Content>
            </Card>
        </Container >
    );
}

export default EventInfo;
