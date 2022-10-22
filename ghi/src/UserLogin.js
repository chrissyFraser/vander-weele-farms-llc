import { useNavigate } from "react-router-dom"; 
import { useToken } from './Auth';
import { useState } from 'react';


function LoginComponent() {
  const navigate = useNavigate();
  // const [token, login] = useToken();
  const [login] = useToken();

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()



  const submitHandler = e => {
    login(username, password)
    e.preventDefault();
    navigate("/");
  }
  

  return (
    <div>
      <center>
        <h1>Please login using your email</h1>
        <form onSubmit={submitHandler}>
          <input type="text" name="username" placeholder="Email" value={username} onChange={(event) => setUsername(event.target.value)} /><br />
          <input type="password" name="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} /><br />
          <input type="submit" name="submit" />
        </form>
      </center>
    </div>

  );
}
export default LoginComponent