import { useNavigate } from "react-router-dom"; 
import { useToken } from './Auth';
import { useState } from 'react';


function LoginComponent() {
  let navigate = useNavigate();
  let [token, login] = useToken();
  console.log(token)


  let [username, setUsername] = useState()
  let [password, setPassword] = useState()



  const submitHandler = e => {
    login(username, password)
    e.preventDefault();
    navigate("/cart");
  }
  

  return (
    <div>
      <center>
        <h1>Please login using your email</h1>
        <form onSubmit={submitHandler}>
        <div class="form-group">
          <input type="email" class="form-control" name="username" placeholder="Email" value={username} onChange={(event) => setUsername(event.target.value)} /><br />
          <input type="password" class="form-control" name="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} /><br />
          <input type="submit" class="btn btn-danger" name="submit" />
          </div>
        </form>
      </center>
    </div>

  );
}
export default LoginComponent