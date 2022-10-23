import { useState } from 'react';
import { useToken, useAuthContext } from './Auth';
import { useNavigate } from "react-router-dom"; 



function UserUpdateComponent() {

    const navigate = useNavigate();
    const { token } = useAuthContext();

    
    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }
    console.log(parseJwt(token))


    async function updateUser(id, email, password, username) {
        const url = `${process.env.REACT_APP_API_HOST}/api/accounts/${id}`;
        const response = await fetch(url, {
          method: "put",
          body: JSON.stringify({
            email,
            password,
            username
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
    let [id, setId] = useState()
    let [username, setUsername] = useState()
    let [password, setPassword] = useState()
    let [email, setEmail] = useState()

    const submitHandler = e => {
        
        updateUser(id, email, password, username)
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
export default UserUpdateComponent