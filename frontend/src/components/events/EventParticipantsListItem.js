import React, { useState } from 'react';
import { Button, Icon, List, Image, Modal } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import studentImage from '../../images/student.png';
import externalImage from '../../images/formalman.png';
import { useEffect } from 'react';

const EventParticipantsListItem = ({ participant, onDelete, index }) => {
    const [open, setOpen] = useState(false);

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

    const handleDelete = () => {
        setOpen(false);
        onDelete(participant.participation_id);
    };

    return (
        <List.Item style={style}>
            <Modal
                size='small'
                open={open}
                onClose={() => setOpen(false)}
                dimmer='blurring'
            >
                <Modal.Header>Delete {participant.name}</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to remove participation of {participant.name} from this event?</p>
                    <p>This action cannot be undone.</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => setOpen(false)}>
                        No
                    </Button>
                    <Button positive onClick={handleDelete}>
                        Yes
                    </Button>
                </Modal.Actions>
            </Modal>
            <List.Content floated='right'>
                <Button icon onClick={() => setOpen(true)} color='red'>
                    <Icon name='trash' />
                </Button>
            </List.Content>
            <Image avatar src={participant.isstudent ? studentImage : externalImage} size='tiny' />
            <List.Content>
                <List.Header as='a' onClick={() => navigate(`/students/${participant.students_or_externals_id}/details`)}>{participant.name}</List.Header>
                <List.Description>{participant.email}</List.Description>
            </List.Content>
        </List.Item>
    );
}

export default EventParticipantsListItem;