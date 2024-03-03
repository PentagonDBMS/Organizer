import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Icon,
    Image,
    Container,
    Header,
    Divider,
    Label,
    Grid,
    ButtonGroup,

} from 'semantic-ui-react';
import CardDetailPlaceHolder from '../layout/CardDetailPlaceHolder';
import studentImage from '../../images/student.png';
import externalImage from '../../images/formalman.png';

import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const StudentDetails = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudentDetails = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/org/students/${id}`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setStudent(data);
            }
            setLoading(false);
        };

        fetchStudentDetails();
    }, [id]);

    if (loading) {
        return (
            <CardDetailPlaceHolder />
        );
    }

    return (
        <Container>
            <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>Student Details</Header>
            <Divider />
            <Card centered>
                <Image src={(student.isstudent) ? studentImage : externalImage} wrapped ui={false} />
                <CardContent>
                    <CardHeader><a>{student ? student.name : 'Student Name'}</a></CardHeader>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <CardDescription>{student ? student.email : 'Student Email'}</CardDescription>
                                <CardDescription>Student ID: {student.students_or_externals_id}</CardDescription>
                                <CardDescription>College: {student.college_name}</CardDescription>
                            </Grid.Column>
                            <Grid.Column>
                                {/* <Label as='a' color='blue' ribbon='right'>
                                    {student.isstudent ? 'Student' : 'External'}
                                </Label> */}
                                {student.isstudent && <Label as='a' color='blue' ribbon='right'>
                                    Student
                                </Label>}
                                {!student.isstudent && <Label as='a' color='blue' ribbon='right'>
                                    External
                                </Label>}


                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </CardContent>
                <CardContent extra>
                    <Icon name='time' />
                    {student.created_at && `Joined in ${new Date(new Date(student.created_at).getTime() + (5 * 60 + 30) * 60 * 1000).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}`}
                </CardContent>
                {student.isstudent && <CardContent extra>
                    <Card.Description>
                        <ButtonGroup fluid>
                            <Button color='green' as={Link} to={`/students/${student.students_or_externals_id}/participations`}>
                                Participations
                            </Button>
                            {/* <ButtonOr /> */}
                            <Button color='blue' as={Link} to={`/students/${student.students_or_externals_id}/volunteerings`}>
                                Volunteerings
                            </Button>
                        </ButtonGroup>
                    </Card.Description>
                </CardContent>}
                {!student.isstudent && <CardContent extra>
                    <ButtonGroup fluid>
                        <Button color='green' as={Link} to={`/students/${student.students_or_externals_id}/participations`}>
                            Participations
                        </Button>
                    </ButtonGroup>
                </CardContent>}
            </Card>
        </Container>
    )
};

export default StudentDetails;
