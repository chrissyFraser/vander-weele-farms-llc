import { useToken } from './Auth';
import { useState } from 'react';


function LoginComponent() {

  const [token, login] = useToken();

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()



  const submitHandler = e => {
    login(username, password)
    e.preventDefault();

  }
  

  return (
    <div>
      <center>
        <form onSubmit={submitHandler}>
          <input type="text" name="username" placeholder="Email" value={username} onChange={(event) => setUsername(event.target.value)} /><br />
          <input type="password" name="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} /><br />
          <input type="submit" name="submit" />
        </form>
      </center>
    </div>

  );
  // Other code, here
}
export default LoginComponent