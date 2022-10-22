import { useNavigate } from "react-router-dom"; 
import {  useAuthContext } from './Auth';
// let internalToken = null;


function LogoutComponent() {
    const navigate = useNavigate();
    const { token, setToken } = useAuthContext();
    async function logout() {
        if (token) {
            console.log("token found")
            const url = `${process.env.REACT_APP_API_HOST}/token`;
            await fetch(url, { method: "delete", credentials: "include" });
            // let internalToken = null;
            setToken(null);
            navigate("/");
        } else {
            console.log("No token")
            navigate("/login")
        }
    }

    const submitHandler = e => {
        logout()
        e.preventDefault();

    }

    return (
        <div>
            <center>
                <form onSubmit={submitHandler}>
                    <button>Logout</button>
                </form>
            </center>
        </div>

    );
}
export default LogoutComponent
