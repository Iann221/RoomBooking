import { useEffect } from "react"
import { useStore } from "../../app/stores/store";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Calendar from "color-calendar";
import CalendarComponent from "./CalendarComponent";

export default observer(function Dashboard() {
    const {roomStore} = useStore();
    const {loadRooms, rooms, loading} = roomStore;

    useEffect(() => {
        if(rooms.length <=1) loadRooms()
    },[loadRooms] )

    if(loading) return <LoadingComponent content="loading app"/>

    return (
        <Segment>
            <CalendarComponent
            <Item.Group divided>
                {/* divided: ada horizontal line */}
                {rooms.map(room => (
                    // pokonya klo mau specify kita bikin elemen unik, hrs pake key 
                    <Item key={room.id}>
                        <Item.Content>
                            <Item.Header as='a'>{room.title}</Item.Header>
                            <Item.Description>
                                <div>{room.description}</div>
                            </Item.Description>
                            {(room.reservations.length>0) && (
                                <Item.Description>
                                    <Label basic color='orange'>
                                        Sudah ada yang reservasi ruangan ini
                                    </Label>
                                </Item.Description>
                            )}
                            <Item.Extra>
                                <Button as={Link} to={`/room/${room.id}`} floated='right' color='blue'>Reserve</Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})