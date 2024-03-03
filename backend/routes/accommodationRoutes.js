// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const {
//     getAllEvents,
//     getEventById,
//     createEvent,
//     updateEvent,
//     deleteEvent,
//     getParticipants,
//     getVolunteers,
//     deleteParticipant,
//     deleteVolunteer
// } = require('../helpers/eventHelpers');

// // Get all events (authenticated)
// router.get('/', auth, async (req, res) => {
//     try {
//         const events = await getAllEvents();
//         res.json(events);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // Get event by ID (authenticated)
// router.get('/:id', auth, async (req, res) => {
//     const { id } = req.params;
//     try {
//         const event = await getEventById(id);
//         if (!event) {
//             return res.status(404).json({ msg: 'Event not found' });
//         }
//         res.json(event);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // Add a new event (authenticated)
// router.post('/', auth, async (req, res) => {
//     const { name, description, start_time, end_time } = req.body;
//     try {
//         const newEvent = await createEvent(name, description, start_time, end_time);
//         res.json(newEvent);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // Update an existing event (authenticated)
// router.put('/:id', auth, async (req, res) => {
//     const { id } = req.params;
//     const { name, description, start_time, end_time } = req.body;
//     try {
//         const updatedEvent = await updateEvent(id, name, description, start_time, end_time);
//         res.json(updatedEvent);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // Delete an existing event (authenticated)
// router.delete('/:id', auth, async (req, res) => {
//     const { id } = req.params;
//     try {
//         await deleteEvent(id);
//         res.json({ msg: 'Event deleted successfully' });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // Get participants of an event (authenticated)
// router.get('/:id/participants', auth, async (req, res) => {
//     const { id } = req.params;
//     try {
//         const participants = await getParticipants(id);
//         res.json(participants);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // Get volunteers of an event (authenticated)
// router.get('/:id/volunteers', auth, async (req, res) => {
//     const { id } = req.params;
//     try {
//         const volunteers = await getVolunteers(id);
//         res.json(volunteers);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // Delete a participant from an event (authenticated)
// router.delete('/:id/participants/:participationId', auth, async (req, res) => {
//     const { id, participationId } = req.params;
//     try {
//         await deleteParticipant(id, participationId);
//         res.json({ msg: 'Participant deleted successfully' });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // Delete a volunteer from an event (authenticated)
// router.delete('/:id/volunteers/:volunteerId', auth, async (req, res) => {
//     const { id, volunteerId } = req.params;
//     try {
//         await deleteVolunteer(id, volunteerId);
//         res.json({ msg: 'Volunteer deleted successfully' });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });


// module.exports = router;


// Path: backend/routes/accommodation.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    getAccommodations,
    getAccommodationById,
    getAllocations,
    deleteAllocation
} = require('../helpers/accommodationHelper');


// Get all accommodations (authenticated)
router.get('/', auth, async (req, res) => {
    try {
        const accommodations = await getAccommodations();
        console.log(accommodations);
        res.json(accommodations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get accommodation by ID (authenticated)
router.get('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const accommodation = await getAccommodationById(id);
        if (!accommodation) {
            return res.status(404).json({ msg: 'Accommodation not found' });
        }
        res.json(accommodation);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// Get allocations of an accommodation (authenticated)
router.get('/:id/allocations', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const allocations = await getAllocations(id);
        console.log(allocations);
        res.json(allocations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete an existing allocation (authenticated)
router.delete('/:id/allocations/:allocationId', auth, async (req, res) => {
    const { id, allocationId } = req.params;
    try {
        await deleteAllocation(id, allocationId);
        res.json({ msg: 'Allocation deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;