const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    getAllStudents,
    getStudentById,
    getStudentParticipatedEventsById,
    getStudentVolunteeredEventsById,
} = require('../helpers/studentHelpers');

// Get all students (authenticated)
router.get('/', auth, async (req, res) => {
    try {
        const students = await getAllStudents();
        res.json(students);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get student by id (authenticated)
router.get('/:id', auth, async(req, res) => {
    const { id } = req.params;
    try {
        const student = await getStudentById(id);
        if (!student) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.json(student);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/:id/participations', auth, async(req, res) => {
    const { id } = req.params;
    try {
        const student = await getStudentParticipatedEventsById(id);
        res.json(student);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/:id/volunteerings', auth, async(req, res) => {
    const { id } = req.params;
    try {
        const student = await getStudentVolunteeredEventsById(id);
        if (!student) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.json(student);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;