import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { UserFormValues } from "../models/user";
import { router } from "../router/Routes";
import { UserInfo } from "../models/userInfo";
// declare const window: any;

export default class UserStore {
    token: string | null = localStorage.getItem('jwt');
    userId: string | null = null;
    username: string | null = null;
    role: string | null = null;
    email: string | null = null;
    appLoaded = false;

    // for admin
    loadingAll = false;
    loadingSubmit = false;
    loadingDelete = false;
    allUsers: UserInfo[] = []
    selectedUser: UserInfo | undefined = undefined

    constructor() {
        makeAutoObservable(this)
        reaction( // dia hanya jalan kalo value token changes, tapi ga pas lagi initiate. cth pas user login/logout
            () => this.token, // we tell it we want to react to the token
            token =>{
                if(token){
                    localStorage.setItem('jwt', token) // shared preference
                } else {
                    localStorage.removeItem('jwt')
                }
            }
        )
    }

    get isLoggedIn(){
        return !!this.username
    }

    // sendEmail = (from: string, to: string, subject: string, body: string) => {
    //     const config = {
    //         Host : "smtp.elasticemail.com",
    //         Username : "booking.ruangan@yopmail.com",
    //         Password : "A2DBC8D7D6E251A8C6C7C1625D6E2B884BD1",
    //         Port: "2525",
    //         To : to,
    //         From : from,
    //         Subject : subject,
    //         Body : body
    //     }
    //     if(window.Email){
    //         window.Email.send(config).then(() => alert("email sent"));
    //         // .then(() => alert("email sent"));
    //     }
    // }

    // sendEmailOri = () => {
        // dengan smtpjs:
        // const config = {
        //     Host : "smtp.elasticemail.com",
        //     Username : "vincentiannugroho@gmail.com",
        //     Password : "84A1FDF851ACEDF6F89245D7AE40F61ED6F7",
        //     Port: "2525",
        //     To : "seanardi4@gmail.com",
        //     From : "vincentiannugroho@gmail.com",
        //     Subject : "subject ori",
        //     Body : "body ori"
        // }
        // if(window.Email){
        //     window.Email.send(config).then(() => alert("email sent"));
        //     // .then(() => alert("email sent"));
        // }

        //dengan email.js:
        // emailjs.send("service_ak6rsik","template_1h5lnzg",{
        //     subject: "tes subjek",
        //     message: "halo ini tes",
        //     }, "7AXN-y1K3I1UEtGO4")
        //     .then(function(response) {
        //         console.log('SUCCESS!', response.status, response.text);
        //      }, function(error) {
        //         console.log('FAILED...', error);
        //      });
        // }

    login = async (creds: UserFormValues) => {
        // this.sendEmailOri()
        try {
            const user = await agent.Account.login(creds);
            runInAction(() => {
            this.token = user.token;
            this.userId = user.id;
            this.username = user.username;
            this.role = user.role;
            this.email = user.email;
            })
            router.navigate('/rooms');
        } catch (error) {
            throw error; // dilempar ke onSubmitnya LoginForm.tsx
        }
    }

    register = async (creds: UserFormValues) => {
        this.setLoadingSubmit(true)
        try {
            await agent.Account.register(creds);
            router.navigate(`/users`)
        } catch (error) {
            throw error
        } finally {
            this.setLoadingSubmit(false)
        }
    }

    getAllUsers = async () => {
        this.setLoadingAll(true);
        try {
            const all = await agent.Account.getAllUsers();
            this.setUsers(all);
        } catch(error) {
            console.log(error);
        } finally {
            this.setLoadingAll(false);
        }
    }

    editUser = async (user: UserFormValues, id: string) => {
        this.setLoadingSubmit(true)
        try {
            await agent.Account.edit(user,id);
            if(this.role === "admin"){
                router.navigate('/users')
            } else {
                router.navigate('/rooms')
            }
        } catch(error) {
            console.log("error saat create res" + error);
            throw error;
        } finally {
            this.setLoadingSubmit(false)
        }
    }

    deleteUser = async (id: string) => {
        this.setLoadingDelete(true)
        try {
            await agent.Account.delete(id);
            this.setUsers([...this.allUsers.filter(a => a.id !== id)])
        } catch (error) {
            console.log(error)
        } finally {
            this.setLoadingDelete(false)
        }
    }

    logout = () => {
        runInAction(() => {
        this.token = null;
        this.userId = null;
        this.username = null;
        this.role = null;
        })
        router.navigate('/');
    }

    getUser = async () => {
        try{
            const user = await agent.Account.getUser();
            runInAction(() => {
                this.userId = user.id;
                this.username = user.username;
                this.role = user.role;
                this.email = user.email;
            })
        } catch(error) {
            console.log(error);
        }
    }

    setApploaded(){
        this.appLoaded = true;
    }

    setLoadingAll = (state: boolean) => {
        this.loadingAll = state
    }

    setLoadingSubmit = (state: boolean) => {
        this.loadingSubmit = state
    }

    setLoadingDelete = (state: boolean) => {
        this.loadingDelete = state
    }

    setUsers = (state: UserInfo[]) => {
        this.allUsers = state
    }
}