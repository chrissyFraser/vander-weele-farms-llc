import { useState } from 'react';
import { useToken, useAuthContext } from './Auth';

console.log(useToken)


function UserUpdateComponent() {

    const { token } = useAuthContext();
    // function parseJwt(token) {
    //     var base64Url = token.split('.')[1];
    //     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    //     var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    //     }).join(''));

    //     return JSON.parse(jsonPayload);
    // }



    async function updateUser(name, email, address) {


        //   const data = parseJwt(token)
        //   console.log("DATA", Object.entries(data))
        //   console.log("specific", Object.values(data))
        //   const user = Object.values(data)
        //   console.log(user[3])
        //   const myUser = user[3]
        //   const valuesUser = Object.values(myUser)
        //   console.log(valuesUser[0])
        //   const userId = valuesUser[0]
        //   const id = userId



        const url = `${process.env.REACT_APP_API_HOST_MONOLITH}/api/customers`;
        const response = await fetch(url, {
            method: "post",
            body: JSON.stringify({
                name,
                email,
                address,

            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            response.status_code = 200
        }


        return false;
    }
    let [name, setName] = useState()
    let [address, setAddress] = useState()
    let [email, setEmail] = useState()

    const submitHandler = e => {

        updateUser(email, address, name)
        e.preventDefault();

    }
    if (token) {
        return (
            <div>
                <center>
                    <form onSubmit={submitHandler}>
                        <input type="text" name="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} /><br />
                        <input type="test" name="address" placeholder="Address" value={address} onChange={(event) => setAddress(event.target.value)} /><br />
                        <input type="text" name="name" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} /><br />
                        <input type="submit" name="submit" />
                    </form>
                </center>
            </div>

        );
    } else {
        return (
            <h2>Please login</h2>
        )
    }


}
export default UserUpdateComponent