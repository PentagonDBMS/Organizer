import React, { useState, useEffect } from 'react';
import { Container, Menu, Icon, Dropdown, Image } from 'semantic-ui-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useScreenSize } from '../../contexts/ScreenSizeContext'; // Assuming this is implemented
import avatar from '../../images/tom.jpg';
import logo from "../../images/logo.png";

const OrgHeader = () => {
    const location = useLocation();
    const { currentUser, logout } = useAuth();

    const trigger = (
        <span>
            <Image avatar src={avatar} />
        </span>
    );



    const navigate = useNavigate();
    const { isMobile } = useScreenSize(); // Utilizing the screen size context
    const [activeItem, setActiveItem] = useState('');

    useEffect(() => {
        // Update the active item based on the URL path
        const path = location.pathname.split('/')[1];
        setActiveItem(path || 'dashboard');
    }, [location]);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <Container textAlign='center' style={{ margin: '20px 0' }}>
            <Menu size={!isMobile && 'massive'}>
                {currentUser && isMobile && (
                    <Dropdown item icon='bars'>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to="/dashboard" active={activeItem === 'dashboard'}>
                                <Icon name='dashboard' /> Dashboard
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to="/events" active={activeItem === 'events'}>
                                <Icon name='calendar' /> Events
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to="/participants" active={activeItem === 'participants'}>
                                <Icon name='users' /> Participants
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to="/volunteers" active={activeItem === 'volunteers'}>
                                <Icon name='handshake' /> Volunteers
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to="/accommadations" active={activeItem === 'accommadations'}>
                                <Icon name='hotel' /> Accommodations
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to="/students" active={activeItem === 'students'}>
                                <Icon name='student' /> Students
                            </Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>
                )}
                <Menu.Item as={Link} to="https://pentagondbms.github.io/UniveristyFest/">
                   <Image
                    src={logo}
                    alt="logo"
                    size="mini"
                    style={{ marginRight: "1.5em" }}
                  />
                </Menu.Item>
                {currentUser && !isMobile && (
                    <>
                        <Menu.Item as={Link} to="/dashboard" name='dashboard' active={activeItem === 'dashboard'}>
                            <Icon name='dashboard' /> Dashboard
                        </Menu.Item>
                        <Menu.Item as={Link} to="/events" name='events' active={activeItem === 'events'}>
                            <Icon name='calendar' /> Events
                        </Menu.Item>
                        <Menu.Item as={Link} to="/participants" name='participants' active={activeItem === 'participants'}>
                            <Icon name='users' /> Participants
                        </Menu.Item>
                        <Menu.Item as={Link} to="/volunteers" name='volunteers' active={activeItem === 'volunteers'}>
                            <Icon name='handshake' /> Volunteers
                        </Menu.Item>
                        <Menu.Item as={Link} to="/accommadations" name='accommadations' active={activeItem === 'accommadations'}>
                            <Icon name='hotel' /> Accommodations
                        </Menu.Item>
                        <Menu.Item as={Link} to="/students" name='students' active={activeItem === 'students'}>
                            <Icon name='student' /> Students
                        </Menu.Item>


                    </>
                )}
                {!currentUser && (
                    <Menu.Menu position='right'>
                        <Menu.Item as={Link} to="/login" name='login' active={activeItem === 'login'}>
                            <Icon name='sign in' /> Login
                        </Menu.Item>
                        {/* <Menu.Item as={Link} to="/register" name='register' active={activeItem === 'register'}>
                            <Icon name='signup' /> Register
                        </Menu.Item> */}
                    </Menu.Menu>
                )}
                {/* {currentUser && (
                    <Menu.Item position='right' onClick={handleLogout}>
                        <Icon name='sign out' /> Logout
                    </Menu.Item>
                )} */}
                {currentUser && (
                    <Dropdown item pointing="top right" trigger={trigger}>
                        <Dropdown.Menu>
                            <Dropdown.Item
                                as={Link}
                                to="/profile"
                                text={currentUser.name}
                                icon="user"
                            />
                            <Dropdown.Item
                                onClick={handleLogout}
                                text="Logout"
                                icon="sign out"
                            />
                        </Dropdown.Menu>
                    </Dropdown>
                )}
            </Menu>
        </Container>
    );
};

export default OrgHeader;
