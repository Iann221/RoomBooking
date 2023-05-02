import { Form, Formik } from "formik"
import { observer } from "mobx-react-lite"
import { Button, Header, Item, Segment } from "semantic-ui-react"
import LoadingComponent from "../../app/layout/LoadingComponent"
import { SyntheticEvent, useEffect, useState } from "react"
import { useStore } from "../../app/stores/store"
import { Link, useParams } from "react-router-dom"
import { router } from "../../app/router/Routes"

export default observer(function Details(){
    const {reserveStore, userStore, roomStore} = useStore();
    const {loadRoomReservation, loadingRoomRevs, reservations, loadingDelete, deleteReservation} = reserveStore;
    const {id} = useParams();
    const [target, setTarget] = useState('');

    useEffect(() => {
        if(!roomStore.hasSelectedDate) router.navigate('/rooms')
        if(id) loadRoomReservation(id)
    },[id, loadRoomReservation, roomStore])

    function handleDeleteReservation(id: string, e: SyntheticEvent<HTMLButtonElement>){
        setTarget(e.currentTarget.name);
        deleteReservation(id);
    }
    
    return(
        <Segment>
        <Header as='h1' content='Daftar Reservasi:' />
        {(!loadingRoomRevs) ? (
        <Item.Group divided>
                {/* divided: ada horizontal line */}
                {reservations.map(res => (
                    // pokonya klo mau specify kita bikin elemen unik, hrs pake key 
                    <Item key={res.id}>
                        <Item.Content>
                            {/* <Item.Header as='a'>{`${res.dateTime.toLocaleString().split("T")[1].substring(0,5)} - ${res.endDateTime.toLocaleString().split("T")[1].substring(0,5)}`}</Item.Header> */}
                            <Item.Header as='a'>{`${new String(res.dateTime.toLocaleString().split("T")[1]).substring(0,5)} - ${new String(res.endDateTime.toLocaleString().split("T")[1]).substring(0,5)}`}</Item.Header>
                            <Item.Description>
                                <div>{res.username}</div>
                                <div>{res.purpose}</div>
                            </Item.Description>
                            {(res.username == userStore.username) &&
                            <Item.Extra>
                                <Button as={Link}
                                    to={`/manage/${res.id}`}
                                    color='orange' floated='right'>
                                    Edit
                                </Button>
                                <Button 
                                    name={res.id}
                                    loading={loadingDelete && (target === res.id)} 
                                    onClick={e => handleDeleteReservation(res.id,e)} 
                                    color='red' floated='right'>Delete
                                </Button>                            
                            </Item.Extra>
                            }
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        ) : (
            <LoadingComponent content="loading reservations"/>
        )}
        <Button as={Link} 
            to={`/createReservation`}
            color='green'>
            Create Reservation
        </Button>  
        </Segment>
    )
})