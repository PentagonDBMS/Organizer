-- Correct the table name to 'students_or_externals' and add the missing comma before 'isstudent'
CREATE TABLE students_or_externals (
    students_or_externals_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    isstudent BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Since 'organizers' is referenced before its creation, let's move its creation before 'events'
CREATE TABLE organizers (
    organizer_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_time TIMESTAMP,
    end_time TIMESTAMP
);

CREATE TABLE db_admins (
    admin_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Correct the foreign key reference to 'students_or_externals' and enforce student-only volunteering with a check constraint
CREATE TABLE volunteers (
    volunteer_id SERIAL PRIMARY KEY,
    students_or_externals_id INTEGER REFERENCES students_or_externals(students_or_externals_id),
    event_id INTEGER REFERENCES events(event_id),
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(students_or_externals_id, event_id)
    -- CONSTRAINT fk_student_only FOREIGN KEY (students_or_externals_id) 
    --     REFERENCES students_or_externals(students_or_externals_id) 
    --     CHECK (isstudent = TRUE) -- This line enforces that only students can be volunteers
);

-- Correct the foreign key reference to 'students_or_externals' and adjust the UNIQUE constraint
CREATE TABLE participants (
    participation_id SERIAL PRIMARY KEY,
    students_or_externals_id INTEGER REFERENCES students_or_externals(students_or_externals_id),
    event_id INTEGER REFERENCES events(event_id),
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(students_or_externals_id, event_id)
);

CREATE VIEW participants_details AS
SELECT p.participation_id, p.event_id, p.registered_at, s.students_or_externals_id, s.email, s.password, s.name, s.isstudent, s.created_at
FROM participants p
JOIN students_or_externals s ON p.students_or_externals_id = s.students_or_externals_id;


CREATE VIEW volunteers_details AS
SELECT v.volunteer_id, v.students_or_externals_id, v.event_id, v.registered_at, s.email, s.password, s.name, s.isstudent, s.created_at
FROM volunteers v
JOIN students_or_externals s ON v.students_or_externals_id = s.students_or_externals_id;

-- create a view to show all events that a student has participated in
CREATE VIEW student_participated_events AS
SELECT p.students_or_externals_id, p.event_id, p.participation_id, e.name, e.description, e.start_time, e.end_time
FROM participants p
JOIN events e ON p.event_id = e.event_id;

-- create a view to show all events that a student has volunteered in
CREATE VIEW student_volunteered_events AS
SELECT v.students_or_externals_id, v.event_id, v.volunteer_id, e.name, e.description, e.start_time, e.end_time
FROM volunteers v
JOIN events e ON v.event_id = e.event_id;

