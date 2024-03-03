import React, { useEffect, useState } from 'react';
import { Loader, Header, Divider } from 'semantic-ui-react';
import EventVolunteerListItem from './EventVolunteerListItem';
import { List } from 'semantic-ui-react';
import { useScreenSize } from '../../contexts/ScreenSizeContext';
import { Link, useParams } from 'react-router-dom';

const EventVolunteerList = () => {
    const { id } = useParams();
    const [volunteers, setVolunteers] = useState([]);
    const [thisEvent, setThisEvent] = useState([]);
    const [loading, setLoading] = useState(true);

    // Use mobile screen size context to determine the size of the menu
    const { isMobile } = useScreenSize();

    useEffect(() => {
        const fetchVolunteers = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/org/events/${id}/volunteers`, {
                method: 'GET',
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setVolunteers(data.volunteers);
                setThisEvent(data.event);
            } else {
                // Handle errors here, e.g., showing a message to the user
            }

            setLoading(false);
        };

        fetchVolunteers();
    }, [id]); // Include id in the dependency array

    const handleDelete = async (volunteer_id) => {

        // Set loading to true while we are deleting the volunteer
        setLoading(true);

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/org/events/${id}/volunteers/${volunteer_id}`, {
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
        return <Loader active>Loading Volunteers...</Loader>;
    }

    return (
        <div>
            <Header as='h1' textAlign='center' style={{ margin: '20px 0' }} >
                Volunteers for <Link to={`/events/${id}/details`}>{thisEvent.name}</Link>
            </Header>
            <Divider />
            {volunteers.length > 0 ? (
                <List divided animated size={isMobile ? 'large' : 'massive'}>
                    {volunteers.map(volunteer => (
                        <EventVolunteerListItem
                            key={volunteer.volunteer_id}
                            volunteer={volunteer}
                            onDelete={handleDelete}
                        />
                    ))}
                </List>
            ) : (
                <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>
                    No volunteers found
                </Header>
            )}
        </div>
    );
}

export default EventVolunteerList;