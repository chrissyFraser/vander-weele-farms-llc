import { useState } from 'react';
import { useToken } from './Auth';
import { useNavigate } from "react-router-dom";


function SignupComponent() {
    const navigate = useNavigate();
    const [token, login] = useToken();
    console.log(token)
    async function signup(email, username, password) {

        const url = `${process.env.REACT_APP_API_HOST}/api/accounts/`;
        const response = await fetch(url, {
            method: "post",
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            await login(email, password);
            navigate("/cart");
        }
        return false;
    }


    let [username, setUsername] = useState()
    let [password, setPassword] = useState()
    let [email, setEmail] = useState()

    const submitHandler = e => {
        signup(email, username, password)
        e.preventDefault();
    }

    return (
        <div>
            <center>
                <form onSubmit={submitHandler}>
                    <input type="text" name="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} /><br />
                    <input type="password" name="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} /><br />
                    <input type="text" name="username" placeholder="Name" value={username} onChange={(event) => setUsername(event.target.value)} /><br />
                    <input type="submit" name="submit" />
                </form>
            </center>
        </div>

    );
    // Other code, here
}
export default SignupComponent