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
import { categoryOption, roleOptions } from "../../app/common/categoryOptions";
import * as Yup from 'yup';
import MyTextInput from "../../app/common/MyTextInput";

export default observer(function EditProfileForm(){
    const {userStore} = useStore();
    const {role, editUser} = userStore;
    const {id} = useParams();

    return(
        // {(userStore.role=="admin") ? (
        <Segment clearing>
            {/* dia include konten yang floated */}
            <Header content='Edit data user' sub color='teal' />
            <Formik 
                initialValues={{email:"",username:"",password:"",phonenumber:"",bidang:"",role:"",error:null}} 
                onSubmit={(values,{setErrors}) => editUser(values, id!)
                .catch(error => setErrors({error: error}))}>
                {/* // enableReinitialize, dia ngeload lgi klo ngelakuin setState */}
                {({handleSubmit, isSubmitting, isValid, errors, dirty}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput placeholder='email' name='email' ></MyTextInput>
                    <MyTextInput placeholder='password' name='password' ></MyTextInput>
                    <MyTextInput placeholder='phone number' name='phonenumber' ></MyTextInput>
                    {(role=="admin") && (
                    <>
                    <MyTextInput placeholder='username' name='username' ></MyTextInput>
                    <MyTextInput placeholder='bidang' name='bidang' ></MyTextInput>
                    <MySelectInput placeholder='role' name='role' options={roleOptions}></MySelectInput>
                    </>
                    )}
                    <ErrorMessage
                        name='error' render={() => <Label style={{marginBottom: 10}} 
                        basic color='red' content={errors.error}/>}
                    />
                    <Button 
                        disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting} floated='right' 
                        positive type='submit' content='Edit'
                    />
                </Form>
                )} 
            </Formik>  
        </Segment>
    )
})