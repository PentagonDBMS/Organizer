// src/components/admin/StudentListItem.js
import React, { useEffect, useState } from 'react';
import { List, Image, Label } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import studentImage from '../../images/student.png';
import externalImage from '../../images/formalman.png';


const StudentListItem = ({ student, index }) => {

    const navigate = useNavigate();
    const [style, setStyle] = useState({
        opacity: 0,
        transform: 'translateY(20px)',
    });

    useEffect(() => {
        // Start the animation after a delay based on the index
        const delay = (index + 1) * 100; // Delay in milliseconds
        const animationDuration = 500; // Duration in milliseconds
        const timer = setTimeout(() => {
            setStyle({
                opacity: 1,
                transform: 'translateY(0)',
                transition: `opacity ${animationDuration}ms ease-out, transform ${animationDuration}ms ease-out`,
            });
        }, delay);

        // Clear styles after the animation completes
        const clearStyleTimer = setTimeout(() => {
            setStyle({});
        }, delay + animationDuration);

        return () => {
            clearTimeout(timer);
            clearTimeout(clearStyleTimer);
        };
    }, [index]);


    return (
        <List.Item style={style} >
            <Image avatar src={(student.isstudent) ? studentImage : externalImage} size='tiny' />
            <List.Content>
                <List.Header as='a' onClick={() => navigate(`/students/${student.students_or_externals_id}/details`)}>{student.name}</List.Header>
                <List.Description>{student.email}</List.Description>
                {student.isstudent ? <Label as='a' color='orange' tag>College</Label> : <Label as='a' color='green' tag>External</Label>}
            </List.Content>
        </List.Item>
    );
};

export default StudentListItem;
