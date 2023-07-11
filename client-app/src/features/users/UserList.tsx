import { observer } from "mobx-react-lite"
import { Button, Header, Item, Segment } from "semantic-ui-react"
import LoadingComponent from "../../app/layout/LoadingComponent"
import { SyntheticEvent, useEffect, useState } from "react"
import { useStore } from "../../app/stores/store"
import { Link} from "react-router-dom"

export default observer(function Details(){
    const {userStore} = useStore();
    const {getAllUsers, loadingAll, allUsers, loadingDelete, deleteUser, role} = userStore;
    const [target, setTarget] = useState('');

    useEffect(() => {
        getAllUsers()
    },[getAllUsers])

    function handleDeleteReservation(id: string, e: SyntheticEvent<HTMLButtonElement>){
        setTarget(e.currentTarget.name);
        deleteUser(id);
    }
    
    return(
        <>
        {(role==="admin") ? (
        <Segment>
            <Header as='h1' content='Daftar User:' />
            {(!loadingAll) ? (
            <Item.Group divided>
                    {/* divided: ada horizontal line */}
                    {allUsers.map(user => (
                        // pokonya klo mau specify kita bikin elemen unik, hrs pake key 
                        <Item key={user.id}>
                            <Item.Content>
                                {/* <Item.Header as='a'>{`${res.dateTime.toLocaleString().split("T")[1].substring(0,5)} - ${res.endDateTime.toLocaleString().split("T")[1].substring(0,5)}`}</Item.Header> */}
                                <Item.Header as='a'>{`${user.userName}-${user.bidang}-${user.role}`}</Item.Header>
                                <Item.Description>
                                    <div>{`email: ${user.email}`}</div>
                                    {/* <div>{`password: ${user.password}`}</div> */}
                                    <div>{`no. hp: ${user.phoneNumber}`}</div>
                                </Item.Description>
                                <Item.Extra>
                                    {((user.role!=="admin")) && 
                                    <Button 
                                        name={user.id}
                                        loading={loadingDelete && (target === user.id)} 
                                        onClick={e => handleDeleteReservation(user.id,e)} 
                                        color='red' floated='right'>Delete
                                    </Button>
                                    } 
                                    <Button as={Link}
                                        to={`/editProfile/${user.id}`}
                                        color='orange' floated='right'>
                                        Edit
                                    </Button>                            
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    ))}
                </Item.Group>
            ) : (
                <LoadingComponent content="loading users"/>
            )}
        </Segment>
        ) : (
            <Header as='h1' content='Anda tidak memiliki akses halaman ini' />
        )}
        </>
    )
})