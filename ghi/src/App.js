import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

// import Construct from './Construct.js'
// import ErrorNotification from './ErrorNotification';
import ProduceList from "./ProduceList";
import ProduceCreate from "./ProduceCreate";
import HomePage from "./HomePage.js";
import ProduceItem from "./ProduceItem";
import ProduceItemEdit from "./ProduceItemEdit";
import Cart from "./Cart.js";
import Orders from "./Orders.js";
import { AuthProvider, useToken } from "./Auth.js";
import LoginComponent from "./UserLogin";
import LogoutComponent from "./UserLogout";
import SignupComponent from "./UserSignup";

function GetToken() {
  useToken();
  return null;
}

function App() {
  const [get_all_produce, setProduce] = useState([]);
  const [produce_id, setProduceId] = useState([]);
  const [cart] = useState([]);
  // const [keys, setKeys] = useState([]);

  const getProduceData = async () => {
    let url = `${process.env.REACT_APP_REACT_HOST}/api/produce/`;
    // let url = `http://localhost:3000/api/produce/`;
    let response = await fetch(url);
    // console.log("response", response)
    let data = await response.json();
    console.log("data", data);
    if (response.ok) {
      setProduce(data);
    }
  };

  useEffect(() => {
    // async function getProduceData() {
    //   let url = `${process.env.REACT_APP_API_HOST_MONOLITH}/api/produce/`;
    //   let response = await fetch(url);
    //   console.log("response", response)
    //   let data = await response.json();
    //   if (response.ok) {
    //     setProduce(data);
    //   }

    //     // url = `${process.env.REACT_APP_API_HOST_MONOLITH}/keys`;
    //     // response = await fetch(url)
    //     // data = await response.json();
    //     // if(response.ok){
    //     // setKeys(data);
    //     // }
    // }
    getProduceData();
  }, []);

  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  return (
    <div>
      <BrowserRouter basename={basename}>
        <AuthProvider>
          <GetToken />
          <Navbar expand="lg">
            <Navbar.Brand href="/">
              <img
                className="logo"
                src="https://scontent-sjc3-1.xx.fbcdn.net/v/t39.30808-6/309061405_469280831892766_4474664018961093891_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=0FFC68GtDTgAX-AlbXs&_nc_ht=scontent-sjc3-1.xx&oh=00_AT9g2FzUrWsYkJFyDtW4gdLwtT5MJPFI9j1_2Ee-bF5Hsg&oe=63537D39"
                alt="logo"
              />
            </Navbar.Brand>
            <Container className="navbarNav-container">
              <Nav activeKey="/" className="navbarNav">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/cart">Shop Produce</Nav.Link>
                <Nav.Link href="/produce-admin">Admin Produce</Nav.Link>
                <Nav.Link href="/orders">Orders</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/logout">Logout</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <div className="container">
            {/* <ErrorNotification error={error} /> */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/produce-admin"
                element={
                  <ProduceList
                    get_all_produce={get_all_produce}
                    produce_id={produce_id}
                    setProduceId={setProduceId}
                  />
                }
              />
              <Route
                path="/cart"
                element={<Cart get_all_produce={get_all_produce} />}
              />
              <Route
                path="/produce-create"
                element={<ProduceCreate get_all_produce={get_all_produce} />}
              />
              <Route path="/cart" element={<Cart cart={cart} />} />
              <Route
                path={`/produce-admin/:ID`}
                element={<ProduceItem produce_id={produce_id} />}
              />
              <Route
                path={`/produce-admin/:ID/patch`}
                element={
                  <ProduceItemEdit
                    produce_id={produce_id}
                    get_all_produce={get_all_produce}
                  />
                }
              />
              <Route
                path="/orders"
                element={<Orders get_all_produce={get_all_produce} />}
              />
              <Route
                path="/login"
                element={<LoginComponent LoginComponent={LoginComponent} />}
              />
              <Route
                path="/logout"
                element={<LogoutComponent LogoutComponent={LogoutComponent} />}
              />
              <Route
                path="/signup"
                element={<SignupComponent SignupComponent={SignupComponent} />}
              />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
