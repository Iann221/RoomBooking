import { ErrorMessage, Form, Formik, FormikErrors } from "formik";
import { Button, Header, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReservationFormValues } from "../../app/models/reservationFormValues";
import { observer } from "mobx-react-lite";
import {v4 as uuid} from 'uuid';
import MyTextArea from "../../app/common/MyTextArea";
import MySelectInput from "../../app/common/MySelectInpurt";
import { categoryOption } from "../../app/common/categoryOptions";
import * as Yup from 'yup';

export default observer(function ReservationForm(){
    const {reserveStore, roomStore} = useStore();
    const {createOrEditReservation, loadSelectedReservation, selectedRoomId, loadingSubmit} = reserveStore;
    const {id} = useParams();
    const navigate = useNavigate();

    const [reservationfv, setReservationfv] = useState<ReservationFormValues>(new ReservationFormValues());

    const validationSchema = Yup.object({
        purpose: Yup.string().required('purpose is required'),
        reserveTime: Yup.string().required('start reservation time is required').nullable(),
        endReserveTime: Yup.string().required('end reservation is required').nullable(),
    })

    useEffect(() => {
        if(!roomStore.hasSelectedDate) navigate('/rooms')
        if(id) {
            console.log("editing datetime" + loadSelectedReservation(id)?.dateTime)
            setReservationfv(new ReservationFormValues(loadSelectedReservation(id)))
        }
    }, [id, setReservationfv, loadSelectedReservation, roomStore]);

    function handleFormSubmit(submitres: ReservationFormValues, setErrors: (error: any) => void){
        // walau activity.id='', tetap dihitung !activity.id
        
        if (!submitres.id) {
            console.log("create reservation")
            let newSubmitres: ReservationFormValues = {    
                ...submitres,
                id : uuid(),
                roomId : selectedRoomId
            }
            console.log("submittres: "+ JSON.stringify(submitres))
            createOrEditReservation(newSubmitres, true).catch(error => setErrors({error: error}))
        } else {
            createOrEditReservation(submitres, false).catch(error => setErrors({error: error}))
        }
    }

    return(
        <Segment clearing>
            <Header content='Reservation' sub color='teal' />
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={{id:reservationfv.id,roomId:reservationfv.roomId,reserveTime:reservationfv.reserveTime,
                    endReserveTime:reservationfv.endReserveTime,purpose:reservationfv.purpose,error:null}} 
                onSubmit={(values,{setErrors}) => handleFormSubmit(values, setErrors)}>
                {({handleSubmit, isValid, errors, dirty}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextArea placeholder='Purpose' name='purpose' rows={3}></MyTextArea>
                    <MySelectInput placeholder='Start Time' name='reserveTime' options={categoryOption}></MySelectInput>
                    <MySelectInput placeholder='End Time' name='endReserveTime' options={categoryOption}></MySelectInput>
                    <ErrorMessage
                        name='error' render={() => <Label style={{marginBottom: 10}} 
                        basic color='red' content={errors.error}/>}
                    />
                    <Button 
                        disabled={loadingSubmit || !dirty || !isValid}
                        loading={loadingSubmit} floated='right' 
                        positive type='submit' content='Submit'
                    />
                    <Button as={Link} to={`/rooms/${selectedRoomId}`} floated='right' type='button' content='Cancel'/>
                </Form>
                )} 
            </Formik>  
        </Segment>
    )
})