import { useToken } from './Auth';
import { signup } from './Auth';
import { useState } from 'react';


function SignupComponent() {
    async function signup(email, password, username, roles) {
        const url = `${process.env.REACT_APP_API_HOST}/api/accounts/`;
        const response = await fetch(url, {
            method: "post",
            body: JSON.stringify({
                email,
                password,
                username,
                roles
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            // await login(username, password);
            console.log(username, password, email, roles)
        }
        return false;
    }

    const [isSubmitted, setIsSubmitted] = useState(false);

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()
    const [roles, setRoles] = useState()



    const submitHandler = e => {
        signup(email, password, username, roles)
        e.preventDefault();

    }

    return (
        <div>
            <center>
                <form onSubmit={submitHandler}>
                    <input type="text" name="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} /><br />
                    <input type="password" name="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} /><br />
                    <input type="text" name="username" placeholder="Name" value={username} onChange={(event) => setUsername(event.target.value)} /><br />
                    <input type="text" name="roles" placeholder="*Temp Solution* Admin" value={roles} onChange={(event) => setRoles(event.target.value)} /><br />
                    <input type="submit" name="submit" />
                </form>
            </center>
        </div>

    );
    // Other code, here
}
export default SignupComponent