import { ErrorMessage, Form, Formik } from "formik";
import { Button, Header, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import MySelectInput from "../../app/common/MySelectInpurt";
import { roleOptions } from "../../app/common/categoryOptions";
import MyTextInput from "../../app/common/MyTextInput";
import { useEffect, useState } from "react";
import { UserInfo } from "../../app/models/userInfo";
import * as Yup from 'yup';

export default observer(function EditProfileForm(){
    const {userStore} = useStore();
    const {role, editUser, allUsers} = userStore;
    const {id} = useParams();

    const [currentUser, setCurrentUser] = useState<UserInfo>(new UserInfo());

    const validationSchema = Yup.object({
        email: Yup.string().required().email(),
        username: Yup.string().required(),
        password: Yup.string().required(),
        phonenumber: Yup.string().required(),
        bidang: Yup.string().required(),
        role: Yup.string().required(),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), undefined], 'Password tidak sama').required()
    })

    useEffect(() => {
        if(id) {
            let sUser = allUsers.find(o => o.id === id);
            if(sUser){
                console.log(sUser.userName)
                setCurrentUser(sUser)
            }
        }
    }, [id, setCurrentUser, allUsers]);

    return(
        // {(userStore.role=="admin") ? (
        <Segment clearing>
            {/* dia include konten yang floated */}
            <Header content='Edit data user' sub color='teal' />
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={{email:currentUser.email,username:currentUser.userName,password:currentUser.password, confirmPassword:currentUser.password
                    ,phonenumber:currentUser.phoneNumber,bidang:currentUser.bidang,role:currentUser.role,error:null}} 
                onSubmit={(values,{setErrors}) => editUser(values, id!)
                .catch(error => setErrors({error: error}))}>
                {/* // enableReinitialize, dia ngeload lgi klo ngelakuin setState */}
                {({handleSubmit, isSubmitting, isValid, errors, dirty}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput placeholder='email' name='email' ></MyTextInput>
                    <MyTextInput type="password" placeholder='password' name='password' ></MyTextInput>
                    <MyTextInput type="password" placeholder='confirm password' name='confirmPassword' ></MyTextInput>
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