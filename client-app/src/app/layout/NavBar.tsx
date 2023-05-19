import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Dropdown, Label, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

// interface Props {
//     openForm: ()=>(void);
// }
export default observer(function NavBar() {
    const {userStore: {logout, username, role, userId}} = useStore();
    return (
        <Menu inverted fixed='top'>  
            <Container> 
                <Menu.Item as={NavLink} to='/rooms' header>
                    Back to Home
                </Menu.Item>
                <Menu.Item position='right'>
                    <h4 style={{marginRight:20}}>logged in as {username}</h4>
                    <Dropdown pointing='top left'>
                        <Dropdown.Menu>
                        {(role == "admin") ? (
                            <>
                            <Dropdown.Item as={Link} to='/register' text='Register User'></Dropdown.Item>
                            <Dropdown.Item as={Link} to={`/users`} text='User List'></Dropdown.Item>
                            </>
                        ) : (
                            <Dropdown.Item as={Link} to={`/editProfile/${userId}`} text='Edit Profile'></Dropdown.Item>
                        )}
                            <Dropdown.Item onClick={logout} text='Logout' icon='power'/>
                        </Dropdown.Menu>
                    </Dropdown>
                    {/* <Button onClick={logout} negative content='Logout' />  */}
                </Menu.Item>
            </Container>
        </Menu>
    )
})