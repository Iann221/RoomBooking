import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";
import { UserFormValues } from "../../app/models/user";
import agent from "../../app/api/agent";
import { useDispatch } from "react-redux";
import { setToken } from "../../app/stores/userStores";
import { router } from "../../app/router/Routes";
import MyTextInput from "../../app/common/MyTextInput";
import { closeModal } from "../../app/stores/modalStores";
import { useEffect } from "react";

export default function LoginForm() {
    const dispatch = useDispatch()

    async function handleFormSubmit(value: UserFormValues){
        console.log(value)
        const user = await agent.Account.login(value)
        // try {
        //     const user = await agent.Account.login(value)
        //     dispatch(setToken(user.token))
        //     localStorage.setItem('jwt', user.token) // shared preference
        //     router.navigate('/rooms');
        // } catch (error) {
        //     throw error;
        // }

    }

    return (
        <div style={{display:"flex",justifyContent:"center"}}>
            <Formik     
                initialValues={{email: '', password: '', error: null}}
                onSubmit={(values, {setErrors})  => handleFormSubmit(values)
                .catch(error => setErrors({error: error}))}
            >
                {({handleSubmit, isSubmitting, errors}) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off' style={{width:500, marginTop:50}}>
                        <Header as='h2' content='Login' color='teal' textAlign="center"></Header>
                        <MyTextInput placeholder="Email" name="email"/>
                        <MyTextInput placeholder="Password" name="password" type='password'/>
                        <ErrorMessage
                            name='error' render={() => <Label style={{marginBottom: 10}} 
                            basic color='red' content={errors.error}/>}
                        />
                        <Button loading={isSubmitting} positive content='Login' type="submit" fluid/>
                    </Form>
                )}
            </Formik> 
        </div>
    )
}