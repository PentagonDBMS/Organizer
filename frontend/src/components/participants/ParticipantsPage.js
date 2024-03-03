import React, { useEffect, useState } from 'react';
import { Dropdown, Container, Header, List, Loader } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { Icon, HeaderContent, Divider } from 'semantic-ui-react';
import EventParticipantsListItem from '../events/EventParticipantsListItem';
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

async function fetchParticipants(eventId) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/org/events/${eventId}/participants`, {
        method: 'GET',
        credentials: 'include',
    });
    if (response.ok) {
        const data = await response.json();
        return data.participants;
    }
    return [];
}

const ParticipantsPage = () => {
    const [events, setEvents] = useState([]);
    const [participants, setParticipants] = useState([]);
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
            fetchParticipants(selectedEventId).then(setParticipants).then(() => setLoading(false));
            // navigate(`/participants?event_id=${selectedEventId}`, { replace: true });
        }
    }, [selectedEventId, navigate]);

    const handleEventChange = (event, data) => {
        setSelectedEventId(data.value);
    };

    const handleDelete = async (participation_id) => {

        // Set loading to true while we are deleting the participant
        setLoading(true);

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/org/events/${selectedEventId}/participants/${participation_id}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (response.ok) {
            // Remove the participant from the list
            setParticipants(participants.filter(participant => participant.participation_id !== participation_id));
        } else {
            // Handle errors here, e.g., show a message to the user
        }

        setLoading(false);
    }


    if (loading) {
        return <Loader active inline='centered' >Loading Participants...</Loader>
    }

    return (
        <Container>
            <Header as='h3' textAlign='center' centered>
                <Icon name='calendar' />
                <HeaderContent centered>
                    Show me participants of {' '}

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
            {participants.length > 0 ? (
                <List divided animated size={isMobile ? 'large' : 'massive'}>
                    {participants.map((participant, index) => (
                        <EventParticipantsListItem
                            key={participant.participation_id}
                            participant={participant}
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

export default ParticipantsPage;
