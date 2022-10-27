import {BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import Construct from './Construct.js'
// import ErrorNotification from './ErrorNotification';
import './App.css';
import ProduceList from './ProduceList';
import ProduceCreate from './ProduceCreate';
import HomePage from './HomePage.js';
import ProduceItem from './ProduceItem';
import ProduceItemEdit from './ProduceItemEdit';
import Cart from './Cart.js'
import Orders from './Orders.js';
import { AuthProvider, useToken, useAuthContext } from './Auth.js';
import LoginComponent from './UserLogin';
import LogoutComponent from './UserLogout';
import SignupComponent from './UserSignup';
import UserUpdateComponent from './UserEdit'

function GetToken() {
    useToken();
    // return null
}

function App() {
  
  const [get_all_produce, setProduce] = useState([]);
  const [produce_id, setProduceId] = useState([]);
  const [cart] = useState([]);
  // const [cartItems] = useState([]);
  const [get_all_orders, setOrders] = useState([]);

  useEffect(() => {
    async function getProduceData() {
      let url = `${process.env.REACT_APP_API_HOST_MONOLITH}/api/produce/`;
      let response = await fetch(url);
      let data = await response.json();
      if(response.ok){
        setProduce(data)
      }
    }
    getProduceData();
  }, [])
  const { token } = useAuthContext()
  console.log(token)

  useEffect(() => {
    async function getOrderData() {
      let url = `${process.env.REACT_APP_API_HOST_MONOLITH}/api/orders/`;
      let response = await fetch(url);
      let data = await response.json();
      if(response.ok){
        setOrders(data)
      }
    }
    getOrderData();
  }, [])


        const domain = /https:\/\/[^/]+/;
        const basename = process.env.PUBLIC_URL.replace(domain, '');
        return (
          <BrowserRouter basename={basename}>
            <AuthProvider>
              <GetToken />
              <div>
                  <div className="container">
                    <div className="tabs is-centered" style={{ display: "flex"}}>
                    {/* <img className="logo" src="https://scontent-sjc3-1.xx.fbcdn.net/v/t39.30808-6/309061405_469280831892766_4474664018961093891_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=0FFC68GtDTgAX-AlbXs&_nc_ht=scontent-sjc3-1.xx&oh=00_AT9g2FzUrWsYkJFyDtW4gdLwtT5MJPFI9j1_2Ee-bF5Hsg&oe=63537D39" alt="logo" /> */}
                      <ul>
                        <li><NavLink to="/">Home Page</NavLink></li>
                        <li><NavLink to="/cart">Shop Produce</NavLink></li>
                        <li><NavLink to="/produce-admin">Admin Produce</NavLink></li>
                        <li><NavLink to="/orders">Orders</NavLink></li>
                        <li><NavLink to="/login">Login</NavLink></li>
                        <li><NavLink to="/logout">Logout</NavLink></li>
                        <li><NavLink to="/signup">Signup</NavLink></li>
                        {/* <li><NavLink to="/create-customer">Update User</NavLink></li> */}
                      
                      </ul>
                    </div>
                    {/* <ErrorNotification error={error} /> */}
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/produce-admin" element={<ProduceList get_all_produce={get_all_produce} produce_id = {produce_id} setProduceId={setProduceId} />} />
                      <Route path="/cart" element={<Cart get_all_produce={get_all_produce} />} />
                      <Route path="/produce-create" element={<ProduceCreate get_all_produce={get_all_produce} />} />
                      <Route path="/cart" element={<Cart cart={cart}/>} />
                      <Route path= {`/produce-admin/:ID`}
                      element= {<ProduceItem  produce_id={produce_id} /> } />
                      <Route path= {`/produce-admin/:ID/patch`}
                      element= {<ProduceItemEdit  produce_id={produce_id} get_all_produce={get_all_produce}/> } />
                      <Route path="/orders" element={<Orders get_all_orders={get_all_orders} />} />
                      <Route path="/login" element={<LoginComponent LoginComponent={LoginComponent} />} />
                      <Route path="/logout" element={<LogoutComponent LogoutComponent={LogoutComponent} />} />
                      <Route path="/signup" element={<SignupComponent SignupComponent={SignupComponent} />} />
                      <Route path="/create-customer" element={<UserUpdateComponent UserUpdateComponent={UserUpdateComponent} />} />
                    </Routes>
                  </div>
            </div>
            </AuthProvider>
          </BrowserRouter>
        );
}

export default App;
