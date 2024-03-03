const supabase = require('../db');
const bcrypt = require('bcryptjs');

// Get all students
const getAllStudents = async () => {
    let { data: students, error } = await supabase
        .from('students_or_externals')
        .select('*');
    if (error) throw error;
    return students;
};

// Get student by ID
const getStudentById = async (id) => {
    let { data: student, error } = await supabase
        .from('students_or_externals')
        .select('*')
        .eq('students_or_externals_id', id)
        .single();
    if (error) throw error;
    return student;
};

// get all events that a student has participated in by student id
const getStudentParticipatedEventsById = async (id) => {
    let { data: events, error } = await supabase
        .from('student_participated_events')
        .select('*')
        .eq('students_or_externals_id', id)
    if (error) throw error;
    
    // also get the details of the student from students_or_externals table
    let { data: student, error2 } = await supabase
        .from('students_or_externals')
        .select('*')
        .eq('students_or_externals_id', id)
        .single();
    if (error2) throw error2;
    return { student, events };
};

// get all events that a student has volunteered in by student id
const getStudentVolunteeredEventsById = async (id) => {
    let { data: events, error } = await supabase
        .from('student_volunteered_events')
        .select('*')
        .eq('students_or_externals_id', id)
    if (error) throw error;

    // also get the details of the student from students_or_externals table
    let { data: student, error2 } = await supabase
        .from('students_or_externals')
        .select('*')
        .eq('students_or_externals_id', id)
        .single();
    if (error2) throw error2;
    return { student, events };
};


module.exports = {
    getAllStudents,
    getStudentById,
    getStudentParticipatedEventsById,
    getStudentVolunteeredEventsById,
};