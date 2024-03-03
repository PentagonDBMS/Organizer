import React, { useEffect, useState } from 'react';
import { Card, Container, Header, Segment, Loader, Button, Icon, Divider, Input, Search } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import EventListItem from './EventListItem';
import { useScreenSize } from '../../contexts/ScreenSizeContext';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Use mobile screen size context to determine the size of the menu
    const { isMobile } = useScreenSize();

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/org/events`, {
                method: 'GET',
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setEvents(data);
            } else {
                // Handle errors here, e.g., showing a message to the user
            }
            setLoading(false);
        };

        fetchEvents();
    }, []);

    const handleDelete = async (id) => {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/org/events/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (response.ok) {
            setEvents(events.filter(event => event.event_id !== id));
        } else {
            // Handle errors here, e.g., show a message to the user
        }

        setLoading(false);
    }

    const filteredEvents = events.filter(event => {
        return event.name.toLowerCase().includes(searchTerm.toLowerCase()) || event.description.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (loading) {
        return <Loader active>Loading Events...</Loader>;
    }

    return (
        <Container>
            <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>
                Events
            </Header>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button primary icon labelPosition='left' as={Link} to='/events/add'>
                    <Icon name='calendar plus' />
                    Create Event
                </Button>
                {!isMobile && (
                    <Input
                        icon='search'
                        placeholder='Search events...'
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                )}
            </div>
            <Divider hidden />
            <div>
                {filteredEvents.length > 0 ? (
                    <Card.Group className="custom-card-group" stackable itemsPerRow={3} >
                        {filteredEvents.map((event, index) => (
                            <EventListItem
                                key={event.event_id}
                                event={event}
                                index={index}
                                onDelete={handleDelete}
                            />
                        ))}
                    </Card.Group>
                ) : (
                    <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>
                        No events found
                    </Header>
                )}
            </div>
        </Container>
    );
}

export default EventList;
