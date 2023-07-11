import { ErrorMessage, Form, Formik } from "formik";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { Link} from "react-router-dom";
import { observer } from "mobx-react-lite";
import * as Yup from 'yup';
import MyTextInput from "../../app/common/MyTextInput";
import MySelectInput from "../../app/common/MySelectInpurt";
import { roleOptions } from "../../app/common/categoryOptions";

export default observer(function RegisterForm(){
    const {userStore} = useStore();
    return(
        <>
        {(userStore.role=="admin") ? (
        <div style={{display:"flex",justifyContent:"center"}}> 
            <Formik 
                initialValues={{email:"",username:"",password:"",confirmPassword:"",phonenumber:"",bidang:"",role:"",error:null}} 
                onSubmit={(values,{setErrors}) => userStore.register(values)
                .catch(error => setErrors({error: error}))}
                validationSchema={Yup.object({
                    email: Yup.string().required().email(),
                    username: Yup.string().required(),
                    password: Yup.string().required(),
                    confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), undefined], 'Password tidak sama').required(),        
                    phonenumber: Yup.string().required(),
                    bidang: Yup.string().required(),
                    role: Yup.string().required(),
                })}
                >
                {({handleSubmit, isSubmitting, isValid, errors, dirty}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' style={{width:500, marginTop:50}}>
                    <Header as='h2' content='Register' color='teal' textAlign="center"/>
                    <MyTextInput placeholder='email' name='email' ></MyTextInput>
                    <MyTextInput type="password" placeholder='password' name='password' ></MyTextInput>
                    <MyTextInput type="password" placeholder='confirm password' name='confirmPassword' ></MyTextInput>
                    <MyTextInput placeholder='username' name='username' ></MyTextInput>
                    <MyTextInput placeholder='phone number' name='phonenumber' ></MyTextInput>
                    <MyTextInput placeholder='bidang' name='bidang' ></MyTextInput>
                    {(userStore.email !=="paroki.st.theodorus@gmail.com") &&
                    <MySelectInput placeholder='role' name='role' options={roleOptions}></MySelectInput>
                    }
                    <ErrorMessage
                        name='error' render={() => <Label style={{marginBottom: 10}} 
                        basic color='red' content={errors.error}/>}
                    />
                    <Button 
                        disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting} floated='right' 
                        positive type='submit' content='Register'
                    />
                    <Button as={Link} to={'/rooms'} floated='right' type='button' content='Cancel'/>
                </Form>
                )} 
            </Formik>  
        </div>
        ) : (
            <Header as='h1' content='Anda tidak memiliki akses halaman ini' />
        )}
        </>
    )
})