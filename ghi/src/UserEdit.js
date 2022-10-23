import { useState } from 'react';
import { useToken } from './Auth';
import { useNavigate } from "react-router-dom"; 


function UserEditComponent() {
    const navigate = useNavigate();
    const [token, update] = useToken();
    async function update(email, password, username) {
        const url = `${process.env.REACT_APP_API_HOST}/api/accounts/`;
        const response = await fetch(url, {
          method: "post",
          body: JSON.stringify({
            username,
            password,
            email,
            first_name: firstName,
            last_name: lastName,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          response.status_code = 200
          // await login(username, password);
        }
        return false;
    }


    let [username, setUsername] = useState()
    let [password, setPassword] = useState()
    let [email, setEmail] = useState()

    const submitHandler = e => {
        signup(email, password, username)
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