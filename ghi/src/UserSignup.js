import { useState } from "react";
import { useToken } from "./Auth";
import { useNavigate } from "react-router-dom";

function SignupComponent() {
  const navigate = useNavigate();
  const [token, login] = useToken();
  console.log(token);
  async function signup(email, username, password) {
    const url = `${process.env.REACT_APP_API_HOST}api/accounts/`;
    const response = await fetch(url, {
      method: "post",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      await login(email, password);
      navigate("/create-customer");
    }
    return false;
  }

  let [username, setUsername] = useState();
  let [password, setPassword] = useState();
  let [email, setEmail] = useState();

  const submitHandler = (e) => {
    signup(email, username, password);

    e.preventDefault();
  };

  return (
    <div>
      <center>
        <h2>Please enter your name, email, and password</h2>
        <form onSubmit={submitHandler}>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              name="username"
              placeholder="Name"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <br />
            <input
              type="email"
              class="form-control"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <br />
            <input
              type="password"
              class="form-control"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <br />
            <input type="submit" class="btn btn-danger" name="submit" />
          </div>
        </form>
      </center>
    </div>
  );
  // Other code, here
}
export default SignupComponent;
