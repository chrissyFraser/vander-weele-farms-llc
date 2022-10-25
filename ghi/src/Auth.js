import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
let internalToken = null;


export function getToken() {
  return internalToken;
}

export async function getTokenInternal() {
  const url = `${process.env.REACT_APP_API_HOST}token/get`;
  try {
    const response = await fetch(url, {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      internalToken = data.access_token;
      console.log(internalToken)
      return internalToken;
    }
  } catch (e) {}
  return false;
}

export async function getTokenData() {
  const url = `${process.env.REACT_APP_API_HOST}token/get`;
  try {
    const response = await fetch(url, {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      let internalToken = data.token_type;
      return internalToken;
    }
  } catch (e) {}
  return false;
}

function handleErrorMessage(error) {
  if ("error" in error) {
    error = error.error;
    try {
      error = JSON.parse(error);
      if ("__all__" in error) {
        error = error.__all__;
      }
    } catch {}
  }
  if (Array.isArray(error)) {
    error = error.join("<br>");
  } else if (typeof error === "object") {
    error = Object.entries(error).reduce(
      (acc, x) => `${acc}<br>${x[0]}: ${x[1]}`,
      ""
    );
  }
  return error;
}

export const AuthContext = createContext({
  token: null,
  setToken: () => null,
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);


export function useToken() {
  const { token, setToken } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchToken() {
      const token = await getTokenInternal();
      setToken(token);
    }
    if (!token) {
      fetchToken();
    }
  }, [setToken, token]);

  async function logout() {
    if (token) {
      console.log("token found")
      const url = `${process.env.REACT_APP_API_HOST}token`;
      await fetch(url, { method: "delete", credentials: "include" });
      internalToken = null;
      setToken(null);
      navigate("/");
    } else {
      console.log("ERROR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    }
  }

  async function login(username, password) {
    const url = `${process.env.REACT_APP_API_HOST}token`;
    const form = new FormData();
    form.append("username", username);
    form.append("password", password);
    const response = await fetch(url, {
      method: "post",
      credentials: "include",
      body: form,
    });
    if (response.ok) {
  
      const token = await getTokenInternal();
      setToken(token);
      return;
    }
    let error = await response.json();
    return handleErrorMessage(error);
  }

  // async function signup(email, password, username) {
  //   const url = `${process.env.REACT_APP_API_HOST}/api/accounts/`;
  //   const response = await fetch(url, {
  //     method: "post",
  //     body: JSON.stringify({
  //       email,
  //       password,
  //       username
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   if (response.ok) {
  //     // await login(username, password);
  //     console.log(username, password, email)
  //   }
  //   return false;
  // }

  // async function updateUser(username, password, email) {
  //   const { token } = useAuthContext();
  //   function parseJwt (token) {
  //       var base64Url = token.split('.')[1];
  //       var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //       var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
  //           return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //       }).join(''));
    
  //       return JSON.parse(jsonPayload);
  //   }
  //   const data = parseJwt(token)
  //     console.log("DATA", Object.entries(data))
  //     console.log("specific", Object.values(data))
  //     const user = Object.values(data)
  //     console.log(user[3])
  //     const myUser = user[3]
  //     const valuesUser = Object.values(myUser)
  //     console.log(valuesUser[0])
  //     const userId = valuesUser[0]
  //     const id = userId
  //   const url = `${process.env.REACT_APP_API_HOST}/api/accounts/{id}`;
  //   const response = await fetch(url, {
  //     method: "put",
  //     body: JSON.stringify({
  //       username,
  //       password,
  //       email
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   if (response.ok) {
  //     response.status_code = 200
  //   }
  //   return false;
  // }

  return [token, login, logout];
}