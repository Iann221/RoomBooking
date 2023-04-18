import { Form, Formik } from "formik";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReservationFormValues } from "../../app/models/reservationFormValues";
import { observer } from "mobx-react-lite";
import {v4 as uuid} from 'uuid';
import MyTextArea from "../../app/common/MyTextArea";
import MySelectInput from "../../app/common/MySelectInpurt";
import MyDateInput from "../../app/common/MyDateInput";
import MyTimePicker from "../../app/common/MyTimePicker";
import { categoryOption } from "../../app/common/categoryOptions";
import * as Yup from 'yup';

export default observer(function ReservationForm(){
    const {reserveStore} = useStore();
    const {createOrEditReservation, loadSelectedReservation, selectedRoomId} = reserveStore;
    const {id} = useParams();
    const navigate = useNavigate();

    const [reservationfv, setReservationfv] = useState<ReservationFormValues>(new ReservationFormValues());

    const validationSchema = Yup.object({
        purpose: Yup.string().required('purpose is required'),
        reserveTime: Yup.string().required('start reservation time is required').nullable(),
        endReserveTime: Yup.string().required('end reservation is required').nullable(),
    })

    useEffect(() => {
        if(id) {
            console.log("editing datetime" + loadSelectedReservation(id)?.dateTime)
            setReservationfv(new ReservationFormValues(loadSelectedReservation(id)))
        }
    }, [id, setReservationfv, loadSelectedReservation]);

    function handleFormSubmit(submitres: ReservationFormValues){
        // walau activity.id='', tetap dihitung !activity.id
        if (!submitres.id) {
            submitres.id = uuid()
            submitres.roomId = selectedRoomId    
            console.log("submittres: "+ JSON.stringify(submitres))
            createOrEditReservation(submitres, true).then(() => navigate(`/rooms/${submitres.roomId}`))
        } else {
            createOrEditReservation(submitres, false).then(() => navigate(`/rooms/${submitres.roomId}`))
        }
    }

    return(
        <Segment clearing>
            {/* dia include konten yang floated */}
            <Header content='Reservation' sub color='teal' />
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={reservationfv} onSubmit={values => handleFormSubmit(values)}>
                {/* // enableReinitialize, dia ngeload lgi klo ngelakuin setState */}
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextArea placeholder='Purpose' name='purpose' rows={3}></MyTextArea>
                    <MySelectInput placeholder='Start Time' name='reserveTime' options={categoryOption}></MySelectInput>
                    <MySelectInput placeholder='End Time' name='endReserveTime' options={categoryOption}></MySelectInput>
                    {/* <MyTimePicker
                        name='reserveTime'
                        placeholder="Start Time"
                    ></MyTimePicker> */}
                    <Button 
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={isSubmitting} floated='right' 
                        positive type='submit' content='Submit'
                    />
                    <Button as={Link} to={`/rooms/${selectedRoomId}`} floated='right' type='button' content='Cancel'/>
                </Form>
                )} 
            </Formik>  
        </Segment>
    )
})