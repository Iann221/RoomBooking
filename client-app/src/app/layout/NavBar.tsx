import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

// interface Props {
//     openForm: ()=>(void);
// }
export default function NavBar() {
    const {userStore: {logout}} = useStore();
    return (
        <Menu inverted fixed='top'>  
            <Container> 
                <Menu.Item position='right'>
                    <Button onClick={logout} negative content='Logout' /> 
                </Menu.Item>
            </Container>
        </Menu>
    )
}