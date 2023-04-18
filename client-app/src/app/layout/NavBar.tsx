import { NavLink } from 'react-router-dom';
import { Button, Container, Label, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

// interface Props {
//     openForm: ()=>(void);
// }
export default observer(function NavBar() {
    const {userStore: {logout, username}} = useStore();
    return (
        <Menu inverted fixed='top'>  
            <Container> 
            <Menu.Item as={NavLink} to='/rooms' header>
                    Back to Home
                </Menu.Item>
                <Menu.Item position='right'>
                    <h4 style={{marginRight:20}}>logged in as {username}</h4>
                    <Button onClick={logout} negative content='Logout' /> 
                </Menu.Item>
            </Container>
        </Menu>
    )
})