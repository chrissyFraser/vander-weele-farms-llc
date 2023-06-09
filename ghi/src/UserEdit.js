import { useState } from "react";
import { useToken, useAuthContext } from "./Auth";
import { useNavigate } from "react-router-dom";

console.log(useToken);

function UserUpdateComponent() {
  const navigate = useNavigate();

  async function updateUser(
    customer_name,
    customer_address,
    customer_email,
    driver_id,
    priority_id
  ) {
    const url = `${process.env.REACT_APP_API_HOST_MONOLITH}/api/customers`;
    const response = await fetch(url, {
      method: "post",
      body: JSON.stringify({
        customer_name,
        customer_address,
        customer_email,
        driver_id,
        priority_id,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      response.status_code = 200;
    }

    return false;
  }

  const { token } = useAuthContext();
  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
  const data = parseJwt(token);
  const user = Object.values(data);
  const myUser = user[3];
  const valuesUser = Object.values(myUser);
  const userName = valuesUser[2];
  const userEmail = valuesUser[1];
  console.log(valuesUser);

  let [customer_address, setPassword] = useState("");

  const submitHandler = (e) => {
    updateUser(userName, customer_address, userEmail);
    e.preventDefault();
    console.log(userName, customer_address, userEmail);
    navigate("/cart");
  };

  return (
    <div>
      <center>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            name="customer_name"
            placeholder="Name"
            value={userName}
          />
          <br />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={userEmail}
          />
          <br />
          <input
            type="text"
            name="customer_address"
            placeholder="Address"
            value={customer_address}
            onChange={(event) => setPassword(event.target.value)}
          />
          <br />
          <input type="submit" name="submit" />
        </form>
      </center>
    </div>
  );
  // Other code, here
}
export default UserUpdateComponent;
