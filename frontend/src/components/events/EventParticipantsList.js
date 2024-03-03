import React, { useEffect, useState } from 'react';
import { Loader, Header, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import EventParticipantsListItem from './EventParticipantsListItem';
import { List } from 'semantic-ui-react';
import { useScreenSize } from '../../contexts/ScreenSizeContext';
import { useParams } from 'react-router-dom';

const EventParticipantsList = () => {
    const { id } = useParams();
    const [participants, setParticipants] = useState([]);
    const [thisEvent, setThisEvent] = useState([]);
    const [loading, setLoading] = useState(true);

    // Use mobile screen size context to determine the size of the menu
    const { isMobile } = useScreenSize();

    useEffect(() => {
        const fetchParticipants = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/org/events/${id}/participants`, {
                method: 'GET',
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setParticipants(data.participants);
                setThisEvent(data.event);
            } else {
                // Handle errors here, e.g., showing a message to the user
            }

            setLoading(false);
        };

        fetchParticipants();
    }, [id]); // Include id in the dependency array

    const handleDelete = async (participation_id) => {

        // Set loading to true while we are deleting the participant
        setLoading(true);

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/org/events/${id}/participants/${participation_id}`, {
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
        return <Loader active>Loading Participants...</Loader>;
    }

    return (
        <div>
            <Header as='h1' textAlign='center' style={{ margin: '20px 0' }} >
                Participants of <Link to={`/events/${id}/details`}>{thisEvent.name}</Link>
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
                    No participants found
                </Header>
            )}
        </div>
    );
}

export default EventParticipantsList;
