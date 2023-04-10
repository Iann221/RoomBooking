import { Button, Stack } from "react-bootstrap";
import { RootState } from "../../app/stores/store";
import { useDispatch, useSelector } from "react-redux";
// import { decrement } from "../../app/stores/userStores";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { openModal } from "../../app/stores/modalStores";
import LoginForm from "../users/LoginForm";

export default function HomePage() {
    const token = useSelector((state: RootState) => state.user.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div className="masthead">
            <Stack style={{justifyContent:"center",alignItems:"center"}}>
                <h1 style={{fontWeight:"bold", fontSize:50, color:'white'}}>
                    Booking Ruangan Gereja Stasi <br/>
                    Santo Theodorus Sukawarna
                </h1>
                {token ? (
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
                        <Button variant="outline-light" size='lg' style={{marginTop:25, width:200}}
                            // onClick={() => dispatch(decrement())}
                        >
                            Register
                        </Button>
                    </Stack>
                )}
            </Stack>
        </div>
    )
}