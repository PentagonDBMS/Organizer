import React, { useEffect, useState } from 'react';
import { Loader, Header, List, Divider, Input } from 'semantic-ui-react';
import StudentListItem from './StudentListItem';
import { useScreenSize } from '../../contexts/ScreenSizeContext';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { isMobile } = useScreenSize();

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/org/students`, {
                method: 'GET',
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setStudents(data);
            } else {
                // Handle errors
            }
            setLoading(false);
        };

        fetchStudents();
    }, []);

    const filteredStudents = students.filter(student => {
        return student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.email.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (loading) {
        return <Loader active>Loading Students...</Loader>;
    }

    return (
        <div>
            <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>Students</Header>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Input
                    icon='search'
                    placeholder='Search students...'
                    style={{ marginBottom: '20px' }}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            <Divider />
            {filteredStudents.length > 0 ? (
                <List divided animated size={isMobile ? 'large' : 'massive'}>
                    {filteredStudents.map((student, index) => (
                        <StudentListItem
                            key={student.students_or_externals_id}
                            student={student}
                            index={index}
                        />
                    ))}
                </List>
            ) : (
                <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>
                    No students found
                </Header>
            )}
        </div>
    );
};

export default StudentList;
