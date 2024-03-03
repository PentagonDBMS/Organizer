// import React, { useEffect, useState } from 'react';
// import { Dropdown, Container, Header, List, Loader } from 'semantic-ui-react';
// import { useNavigate } from 'react-router-dom';
// import { Icon, HeaderContent, Divider } from 'semantic-ui-react';
// import EventParticipantsListItem from '../events/EventParticipantsListItem';
// import { useScreenSize } from '../../contexts/ScreenSizeContext';

// async function fetchEvents() {
//     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/org/events`, {
//         method: 'GET',
//         credentials: 'include',
//     });
//     if (response.ok) {
//         const data = await response.json();
//         return data;
//     }
//     return [];
// }

// async function fetchParticipants(eventId) {
//     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/org/events/${eventId}/participants`, {
//         method: 'GET',
//         credentials: 'include',
//     });
//     if (response.ok) {
//         const data = await response.json();
//         return data.participants;
//     }
//     return [];
// }

// const ParticipantsPage = () => {
//     const [events, setEvents] = useState([]);
//     const [participants, setParticipants] = useState([]);
//     const [selectedEventId, setSelectedEventId] = useState('');
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     const { isMobile } = useScreenSize();

//     useEffect(() => {
//         setLoading(true);
//         fetchEvents().then(setEvents);
//         setLoading(false);
//     }, []);

//     useEffect(() => {
//         if (selectedEventId) {
//             setLoading(true);
//             fetchParticipants(selectedEventId).then(setParticipants).then(() => setLoading(false));
//             // navigate(`/participants?event_id=${selectedEventId}`, { replace: true });
//         }
//     }, [selectedEventId, navigate]);

//     const handleEventChange = (event, data) => {
//         setSelectedEventId(data.value);
//     };

//     const handleDelete = async (participation_id) => {

//         // Set loading to true while we are deleting the participant
//         setLoading(true);

//         const response = await fetch(`${process.env.REACT_APP_API_URL}/api/org/events/${selectedEventId}/participants/${participation_id}`, {
//             method: 'DELETE',
//             credentials: 'include',
//         });

//         if (response.ok) {
//             // Remove the participant from the list
//             setParticipants(participants.filter(participant => participant.participation_id !== participation_id));
//         } else {
//             // Handle errors here, e.g., show a message to the user
//         }

//         setLoading(false);
//     }


//     if (loading) {
//         return <Loader active inline='centered' >Loading Participants...</Loader>
//     }

//     return (
//         <Container>
//             <Header as='h3' textAlign='center' centered>
//                 <Icon name='calendar' />
//                 <HeaderContent centered>
//                     Show me participants of {' '}

//                     <Dropdown
//                         align='right'
//                         inline
//                         search
//                         style={{ color: '#2185d0' }}
//                         searchInput={{ icon: 'search', iconPosition: 'left' }}
//                         // defaultValue={friendOptions[0].value}
//                         placeholder='Select/Search Event'
//                         options={events.map(event => ({
//                             key: event.event_id,
//                             text: event.name,
//                             value: event.event_id,
//                         }))}
//                         onChange={handleEventChange}
//                         value={selectedEventId}
//                     />

//                 </HeaderContent>
//             </Header>
//             <Divider />
//             {participants.length > 0 ? (
//                 <List divided animated size={isMobile ? 'large' : 'massive'}>
//                     {participants.map((participant, index) => (
//                         <EventParticipantsListItem
//                             key={participant.participation_id}
//                             participant={participant}
//                             onDelete={handleDelete}
//                             index={index}
//                         />
//                     ))}
//                 </List>
//             ) : (
//                 <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>
//                     {!selectedEventId && (
//                         "Please select an event to view participants."
//                     )
//                     }
//                     {selectedEventId && (
//                         "No participants found"
//                     )
//                     }

//                 </Header>
//             )}
//         </Container>
//     );
// };

// export default ParticipantsPage;




// Path: frontend/src/components/accommodation/AccomodationPage.js

import React, { useEffect, useState } from 'react';
import { Dropdown, Container, Header, List, Loader } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { Icon, HeaderContent, Divider } from 'semantic-ui-react';
import AccommodationListItem from './AccommodationListItem';
import { useScreenSize } from '../../contexts/ScreenSizeContext';

async function fetchAccommodations() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/org/accommodations`, {
        method: 'GET',
        credentials: 'include',
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    return [];
}


async function fetchAllocations(accommodationId) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/org/accommodations/${accommodationId}/allocations`, {
        method: 'GET',
        credentials: 'include',
    });
    if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        return data;
    }
    return [];
}

const AccommodationPage = () => {
    const [accommodations, setAccommodations] = useState([]);
    const [allocations, setAllocations] = useState([]);
    const [selectedAccommodationId, setSelectedAccommodationId] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const { isMobile } = useScreenSize();

    useEffect(() => {
        setLoading(true);
        fetchAccommodations().then(setAccommodations).then(() => setLoading(false));
        console.log("accommodations", accommodations);
    }, []);

    useEffect(() => {
        if (selectedAccommodationId) {
            setLoading(true);
            fetchAllocations(selectedAccommodationId).then(setAllocations).then(() => setLoading(false));
            // navigate(`/participants?event_id=${selectedEventId}`, { replace: true });
        }
    }, [selectedAccommodationId, navigate]);

    const handleAccommodationChange = (event, data) => {
        setSelectedAccommodationId(data.value);
    };

    const handleDelete = async (allocation_id) => {

        // Set loading to true while we are deleting the participant
        setLoading(true);

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/org/accommodations/${selectedAccommodationId}/allocations/${allocation_id}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (response.ok) {
            // Remove the participant from the list
            setAllocations(allocations.filter(allocation => allocation.allocation_id !== allocation_id));
        } else {
            // Handle errors here, e.g., show a message to the user
        }

        setLoading(false);
    }


    if (loading) {
        return <Loader active inline='centered' >Loading Accommodations...</Loader>
    }

    return (
        <Container>
            <Header as='h3' textAlign='center' centered>
                <Icon name='hotel' />
                <HeaderContent centered>
                    Show me allocations of {' '}

                    <Dropdown
                        align='right'
                        inline
                        search
                        style={{ color: '#2185d0' }}
                        searchInput={{ icon: 'search', iconPosition: 'left' }}
                        // defaultValue={friendOptions[0].value}
                        placeholder='Select/Search Accommodation'
                        options={accommodations.map(accommodation => ({
                            key: accommodation.accommodation_id,
                            text: accommodation.name,
                            value: accommodation.accommodation_id,
                        }))}
                        onChange={handleAccommodationChange}
                        value={selectedAccommodationId}
                    />

                </HeaderContent>
            </Header>
            <Divider />
            {allocations.length > 0 ? (
                <List divided animated size={isMobile ? 'large' : 'massive'}>
                    {allocations.map((allocation, index) => (
                        <AccommodationListItem
                            key={allocation.allocation_id}
                            allocation={allocation}
                            onDelete={handleDelete}
                            index={index}
                        />
                    ))}
                </List>
            ) : (
                <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>
                    {!selectedAccommodationId && (
                        "Please select an accommodation to view allocations."
                    )
                    }
                    {selectedAccommodationId && (
                        "No allocations found"
                    )
                    }

                </Header>
            )}
        </Container>
    );
}

export default AccommodationPage;


