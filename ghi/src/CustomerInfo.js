import { useState } from 'react';
import { useToken, useAuthContext } from './Auth';

console.log(useToken)


function UserInfoComponent() {
    const { token } = useAuthContext();




    async function createCustomer(customer_name, customer_address, customer_email, driver_id, priority_id) {
        



        const url = `${process.env.REACT_APP_API_HOST_MONOLITH}/api/customers`;
        const response = await fetch(url, {
            method: "post",
            body: JSON.stringify({
                customer_name,
                customer_address,
                customer_email,
                driver_id,
                priority_id

            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            response.status_code = 200;
        }


        return false;
    }

   
    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

      const data = parseJwt(token)
      console.log("DATA", Object.entries(data))
      console.log("specific", Object.values(data))
      const user = Object.values(data)
      console.log(user[3])
      const myUser = user[3]
      const valuesUser = Object.values(myUser)
      console.log(valuesUser[0])
      const userId = valuesUser[0]
      const id = userId






    let [customer_name, setName] = useState()
    let [customer_address, setAddress] = useState()
    let [customer_email, setEmail] = useState()
    let [driver_id, setDID] = useState()
    let [priority_id, setPID] = useState()

    const submitHandler = e => {

        createCustomer(customer_name, customer_address, customer_email, driver_id, priority_id)
        e.preventDefault();

    }




    if (token) {
        return (
            <div>
                <center>
                    <form onSubmit={submitHandler}>
                        <input type="text" name="customer_email" placeholder="Email" value={customer_email} onChange={(event) => setEmail(event.target.value)} /><br />
                        <input type="text" name="customer_address" placeholder="Address" value={customer_address} onChange={(event) => setAddress(event.target.value)} /><br />
                        <input type="text" name="customer_name" placeholder="Name" value={customer_name} onChange={(event) => setName(event.target.value)} /><br />
                        <input type="text" name="driver_id" placeholder="Driver ID" value={driver_id} onChange={(event) => setDID(event.target.value)} /><br />
                        <input type="text" name="priority_id" placeholder="Priority ID" value={priority_id} onChange={(event) => setPID(event.target.value)} /><br />
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

export default UserInfoComponent
