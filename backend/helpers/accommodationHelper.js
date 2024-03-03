// const supabase = require('../db');
// const bcrypt = require('bcryptjs');

// // Get all events
// const getAllEvents = async () => {
//     let { data: events, error } = await supabase
//         .from('events')
//         .select('*');
//     if (error) throw error;
//     return events;
// };

// // Get event by ID
// const getEventById = async (id) => {
//     let { data: event, error } = await supabase
//         .from('events')
//         .select('*')
//         .eq('event_id', id)
//         .single();
//     if (error) throw error;
//     return event;
// };

// // Add a new event
// const createEvent = async (name, description, start_time, end_time) => {
//     let { data: newEvent, error } = await supabase
//         .from('events')
//         .insert([{ name, description, start_time, end_time }])
//         .single();
//     if (error) throw error;
//     return newEvent;
// };

// // Update an existing event
// const updateEvent = async (id, name, description, start_time, end_time) => {
//     let { data: updatedEvent, error } = await supabase
//         .from('events')
//         .update({ name, description, start_time, end_time })
//         .eq('event_id', id)
//         .single();
//     if (error) throw error;
//     return updatedEvent;
// };

// // Delete an existing event
// const deleteEvent = async (id) => {
//     let { error } = await supabase
//         .from('events')
//         .delete()
//         .eq('event_id', id);
//     if (error) throw error;
// };

// // get participants of an event, from participants table extract their student_or_external_id and then from students or externals table get their details
// const getParticipants = async (id) => {
//     let { data: participants, error } = await supabase
//         .from('participants_details') // Use the view you created
//         .select('*')
//         .eq('event_id', id);
//     if (error) throw error;

//     // get details of the event whose id has been passed
//     let { data: event, error: eventError } = await supabase
//         .from('events')
//         .select('*')
//         .eq('event_id', id)
//         .single();
//     if (eventError) throw eventError;

//     // return the participants and the event details
//     return { participants, event };
// };

// // get volunteers of an event
// const getVolunteers = async (id) => {
//     let { data: volunteers, error } = await supabase
//         .from('volunteers_details')
//         .select('*')
//         .eq('event_id', id);
//     if (error) throw error;


//     // get details of the event whose id has been passed
//     let { data: event, error: eventError } = await supabase
//         .from('events')
//         .select('*')
//         .eq('event_id', id)
//         .single();
//     if (eventError) throw eventError;

//     // return the volunteers and the event details
//     return { volunteers, event };
// };

// // delete a participant from an event
// const deleteParticipant = async (id, participation_id) => {
//     let { error } = await supabase
//         .from('participants')
//         .delete()
//         .eq('event_id', id)
//         .eq('participation_id', participation_id);
//     if (error) throw error;
// };

// // delete a volunteer from an event
// const deleteVolunteer = async (id, volunteer_id) => {
//     let { error } = await supabase
//         .from('volunteers')
//         .delete()
//         .eq('event_id', id)
//         .eq('volunteer_id', volunteer_id);
//     if (error) throw error;
// };

// module.exports = {
//     getAllEvents,
//     getEventById,
//     createEvent,
//     updateEvent,
//     deleteEvent,
//     getParticipants,
//     getVolunteers,
//     deleteParticipant,
//     deleteVolunteer
// };


// CREATE TABLE accommodation(
//     accommodation_id INT NOT NULL,
//     name  VARCHAR(255) NOT NULL,
//     address text NOT NULL,
//     filled INT NOT NULL,
//     capacity INT NOT NULL,
//     photo_link text
// );
// CREATE TABLE allocation(
//     allocation_id INT NOT NULL,
//     students_or_externals_id INT,
//     accommodation_id INT,
//     allocated_at timestamp  DEFAULT CURRENT_TIMESTAMP
// );


// CREATE VIEW allocation_details AS
//    SELECT a.allocation_id,
//     a.accommodation_id,
//     a.allocated_at,
//     s.students_or_externals_id,
//     s.email,
//     s.password, --Consider removing or hashing for security
//           s.name,
//     s.isstudent,
//     s.created_at
//    FROM allocation a
//    JOIN students_or_externals s ON a.students_or_externals_id = s.students_or_externals_id;


// Path from backend/helpers/accommodationHelper.js

const supabase = require('../db');

const getAccommodations = async () => {
    let { data: accommodations, error } = await supabase
        .from('accommodation')
        .select('*');

    if (error) throw error;
    return accommodations;
}

const getAccommodationById = async (id) => {
    let { data: accommodation, error } = await supabase
        .from('accommodation')
        .select('*')
        .eq('accommodation_id', id)
        .single();

    if (error) throw error;
    return accommodation;
}

// Get all allocations
const getAllocations = async (id) => {
    let { data: allocations, error } = await supabase
        .from('allocation_details')
        .select('*')
        .eq('accommodation_id', id);

    if (error) throw error;
    return allocations;
}


// Delete an existing allocation
const deleteAllocation = async (id, allocation_id) => {
    let { error } = await supabase
        .from('allocation')
        .delete()
        .eq('accommodation_id', id)
        .eq('allocation_id', allocation_id);

    if (error) throw error;
}



module.exports = {
    getAccommodations,
    getAccommodationById,
    getAllocations,
    deleteAllocation
};