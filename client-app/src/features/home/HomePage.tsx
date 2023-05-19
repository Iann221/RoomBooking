import { Button, Stack } from "react-bootstrap";
import { useStore } from "../../app/stores/store";
import { useDispatch, useSelector } from "react-redux";
// import { decrement } from "../../app/stores/userStores";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

export default observer(function HomePage() {
    // const token = useSelector((state: RootState) => state.user.value)
    // const dispatch = useDispatch()
    const navigate = useNavigate()
    const {userStore} = useStore();

    return (
        <div className="masthead">
            <Stack style={{justifyContent:"center",alignItems:"center"}}>
                <h1 style={{fontWeight:"bold", fontSize:50, color:'white'}}>
                    Booking Ruangan Gereja Paroki <br/>
                    Santo Theodorus Sukawarna
                </h1>
                {userStore.username ? (
                    <Button variant="outline-light" size='lg' style={{marginTop:25, width:200}}
                        onClick={() => navigate('/rooms')}
                    >
                        Lihat Ruangan
                    </Button>
                ) : (
                    <Stack direction="horizontal" gap={3} style={{justifyContent:"center"}}>
                        <Button variant="outline-light" size='lg' style={{marginTop:25, width:200}}
                            // onClick={() => dispatch(openModal(<LoginForm />))}
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </Button>
                        {/* <Button variant="outline-light" size='lg' style={{marginTop:25, width:200}}
                            // onClick={() => dispatch(decrement())}
                        >
                            Register
                        </Button> */}
                    </Stack>
                )}
            </Stack>
        </div>
    )
})