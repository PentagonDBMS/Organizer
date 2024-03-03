import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { useAuth } from './contexts/AuthContext';
import OrgHeader from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoadingPage from './components/layout/LoadingPage';

import Login from './components/auth/Login';
// import Register from './components/auth/Register';
// Updated imports for Organizer components
import Dashboard from './components/organizer/Dashboard';
import ParticipantsPage from './components/participants/ParticipantsPage';
import VolunteersPage from './components/volunteers/VolunteersPage';

// Update imports for Event components
import EventList from './components/events/EventList';
import EventForm from './components/events/EventForm'; // Import the EventForm component
import EventInfo from './components/events/EventInfo'; // Import the EventInfo component
import EditEvent from './components/events/EditEvent';
import EventParticipantsList from './components/events/EventParticipantsList';
import EventVolunteerList from './components/events/EventVolunteerList';

// Update imports for Student components
import StudentsList from './components/students/StudentList';
import StudentDetails from './components/students/StudentDetails';
import StudentParticipationList from './components/students/StudentParticipationList';
import StudentVolunteeringList from './components/students/StudentVolunteeringList';
import AccommodationPage from './components/accommodation/AccomodationPage';

const App = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="App">
      <OrgHeader />
      <Container style={{ paddingTop: '20px', paddingBottom: '20px', minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={currentUser ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/dashboard" />} />
          {/* <Route path="/register" element={!currentUser ? <Register /> : <Navigate to="/dashboard" />} /> */}
          <Route path="/events/add" element={currentUser ? <EventForm /> : <Navigate to="/login" />} />
          <Route path="/events" element={currentUser ? <EventList /> : <Navigate to="/login" />} />
          <Route path="/participants" element={currentUser ? <ParticipantsPage /> : <Navigate to="/login" />} />
          <Route path="/volunteers" element={currentUser ? <VolunteersPage /> : <Navigate to="/login" />} />
          <Route path="/events/:id/details" element={currentUser ? <EventInfo /> : <Navigate to="/login" />} />
          <Route path="/events/edit/:id" element={currentUser ? <EditEvent /> : <Navigate to="/login" />} />
          <Route path="/events/:id/participants" element={currentUser ? <EventParticipantsList /> : <Navigate to="/login" />} />
          <Route path="/events/:id/volunteers" element={currentUser ? <EventVolunteerList /> : <Navigate to="/login" />} />
          <Route path="/students" element={currentUser ? <StudentsList /> : <Navigate to="/login" />} />
          <Route path="/students/:id/details" element={currentUser ? <StudentDetails /> : <Navigate to="/login" />} />
          <Route path="/students/:id/participations" element={currentUser ? <StudentParticipationList /> : <Navigate to="/login" />} />
          <Route path="/students/:id/volunteerings" element={currentUser ? <StudentVolunteeringList /> : <Navigate to="/login" />} />
          <Route path="/accommadations" element={currentUser ? <AccommodationPage /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
