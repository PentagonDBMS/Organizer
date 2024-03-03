import React, { useEffect, useState } from 'react';
import { Loader, Header, Divider, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useScreenSize } from '../../contexts/ScreenSizeContext';
import { useParams } from 'react-router-dom';
import EventListItem from '../events/EventListItem';


const StudentVolunteeringList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [thisStudent, setThisStudent] = useState([]);
    const { id } = useParams();
    const { isMobile } = useScreenSize();

    useEffect(() => {
        const fetchStudentVolunteerings = async () => {
            console.log(id);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/org/students/${id}/volunteerings`, {
                method: 'GET',
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setEvents(data.events);
                setThisStudent(data.student);
            }
            else {
                // Handle errors here
            }
            setLoading(false);
        };
        fetchStudentVolunteerings();
    }, [id]);

    const handleDelete = async (event_id, volunteer_id) => {
        setLoading(true);
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/org/events/${event_id}/volunteers/${volunteer_id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        if (res.ok) {
            setEvents(events.filter(event => event.event_id !== event_id));
        } else {
            // Handle errors here
        }
        setLoading(false);
    };

    if (loading) {
        return <Loader active>Loading Volunteerings...</Loader>;
    }

    return (
        <div>
            <Header as='h1' textAlign='center' style={{ margin: '20px 0' }} >
                Volunteerings of <Link to={`/students/${id}/details`}>{thisStudent.name}</Link>
            </Header>
            <Divider />
            {events.length > 0 ? (
                <>
                    <Card.Group className="custom-card-group" stackable itemsPerRow={3} >
                        {events.map((event, index) => (
                            <EventListItem
                                key={event.event_id}
                                event={event}
                                index={index}
                                onDelete={handleDelete}
                            />
                        ))}
                    </Card.Group>
                </>
            ) : (
                <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>
                    No events found
                </Header>
            )}
        </div>
    );
}

export default StudentVolunteeringList;

