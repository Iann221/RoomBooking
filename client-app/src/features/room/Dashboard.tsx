import { useEffect } from "react"
import { useStore } from "../../app/stores/store";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import CalendarComponent from "./CalendarComponent";

export default observer(function Dashboard() {
    const {roomStore, reserveStore} = useStore();
    const {setDate, rooms, loading, setHasSelectedDate} = roomStore;
    const {loadingAll, calendarReservations, loadAllReservations} = reserveStore;

    useEffect(() => {
        console.log("calres" + calendarReservations)
        loadAllReservations()
    },[loadAllReservations])

    function handleReservations(date: Date) {
        setHasSelectedDate(true)
        setDate(new Date(date.setHours(0,0,0,0)))
    }

    return (
        <Segment>
            {(!loadingAll) && (
                <div style={{display:"flex", justifyContent:"center"}}>
                    <CalendarComponent eventData={calendarReservations} handleChange={handleReservations}/>
                </div>
            )}
            <Button as={Link} to={`/pdf`} color='yellow'>Go To PDF Download</Button>
            {(!loading) ? (
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
                                    <Button as={Link} to={`/rooms/${room.id}`} floated='right' color='blue'>Reserve</Button>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    ))}
                </Item.Group>
            ) : (
                <LoadingComponent content="loading rooms"/>
            )}
        </Segment>
        // <Container>
        //     <Row>
        //         <Col xs={9}>
        //         <Item.Group divided>
        //             {/* divided: ada horizontal line */}
        //             {rooms.map(room => (
        //                 // pokonya klo mau specify kita bikin elemen unik, hrs pake key 
        //                 <Item key={room.id}>
        //                     <Item.Content>
        //                         <Item.Header as='a'>{room.title}</Item.Header>
        //                         <Item.Description>
        //                             <div>{room.description}</div>
        //                         </Item.Description>
        //                         {(room.reservations.length>0) && (
        //                             <Item.Description>
        //                                 <Label basic color='orange'>
        //                                     Sudah ada yang reservasi ruangan ini
        //                                 </Label>
        //                             </Item.Description>
        //                         )}
        //                         <Item.Extra>
        //                             <Button as={Link} to={`/room/${room.id}`} floated='right' color='blue'>Reserve</Button>
        //                         </Item.Extra>
        //                     </Item.Content>
        //                 </Item>
        //             ))}
        //         </Item.Group>
        //         </Col>
        //         <Col xs={3}>
        //         <CalendarComponent eventData={[]} handleChange={handleReservations}/>
        //         </Col>
        //     </Row>
        // </Container>
    )
})