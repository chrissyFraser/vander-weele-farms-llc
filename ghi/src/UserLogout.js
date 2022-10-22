import {  useAuthContext } from './Auth';



function LogoutComponent() {
    // let internalToken = null;
    const { token, setToken } = useAuthContext();
    async function logout() {
        if (token) {
            console.log("token found")
            const url = `${process.env.REACT_APP_API_HOST}/token`;
            await fetch(url, { method: "delete", credentials: "include" });
            // internalToken = null;
            // let internalToken = null;
            setToken(null);
            //   navigate("/");
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