import React, { useEffect, useState } from 'react';
import { Dropdown, Container, Header, List, Loader } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { Icon, HeaderContent, Divider } from 'semantic-ui-react';
import EventVolunteerListItem from '../events/EventVolunteerListItem';
import { useScreenSize } from '../../contexts/ScreenSizeContext';

async function fetchEvents() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/org/events`, {
        method: 'GET',
        credentials: 'include',
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    return [];
}

async function fetchVolunteers(eventId) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/org/events/${eventId}/volunteers`, {
        method: 'GET',
        credentials: 'include',
    });
    if (response.ok) {
        const data = await response.json();
        return data.volunteers;
    }
    return [];
}

const VolunteersPage = () => {
    const [events, setEvents] = useState([]);
    const [volunteers, setVolunteers] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const { isMobile } = useScreenSize();

    useEffect(() => {
        setLoading(true);
        fetchEvents().then(setEvents);
        setLoading(false);
    }, []);

    useEffect(() => {
        if (selectedEventId) {
            setLoading(true);
            fetchVolunteers(selectedEventId).then(setVolunteers).then(() => setLoading(false));
        }
    }, [selectedEventId, navigate]);

    const handleEventChange = (event, data) => {
        setSelectedEventId(data.value);
    };

    const handleDelete = async (volunteer_id) => {

        // Set loading to true while we are deleting the volunteer
        setLoading(true);

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/org/events/${selectedEventId}/volunteers/${volunteer_id}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (response.ok) {
            // Remove the volunteer from the list
            setVolunteers(volunteers.filter(volunteer => volunteer.volunteer_id !== volunteer_id));
        } else {
            // Handle errors here, e.g., show a message to the user
        }

        setLoading(false);
    }


    if (loading) {
        return <Loader active inline='centered' >Loading Volunteers...</Loader>
    }

    return (
        <Container>
            <Header as='h3' textAlign='center' centered>
                <Icon name='calendar' />
                <HeaderContent centered>
                    Show me volunteers of {' '}

                    <Dropdown
                        align='right'
                        inline
                        search
                        style={{ color: '#2185d0' }}
                        searchInput={{ icon: 'search', iconPosition: 'left' }}
                        // defaultValue={friendOptions[0].value}
                        placeholder='Select/Search Event'
                        options={events.map(event => ({
                            key: event.event_id,
                            text: event.name,
                            value: event.event_id,
                        }))}
                        onChange={handleEventChange}
                        value={selectedEventId}
                    />

                </HeaderContent>
            </Header>
            <Divider />
                {volunteers.length > 0 ? (
                    <List divided animated size={isMobile ? 'large' : 'massive'}>
                        {volunteers.map((volunteer, index) => (
                            <EventVolunteerListItem
                                key={volunteer.volunteer_id}
                                volunteer={volunteer}
                                onDelete={handleDelete}
                                index={index}
                            />
                        ))}
                    </List>
                ) : (
                    <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>
                        {!selectedEventId && (
                            "Please select an event to view participants."
                        )
                        }
                        {selectedEventId && (
                            "No participants found"
                        )
                        }
                    </Header>
                )}
        </Container>
    );
};

export default VolunteersPage;
