import {BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
}

function App() {
  
  const [get_all_produce, setProduce] = useState([]);
  const [produce_id, setProduceId] = useState([]);
  const [cart] = useState([]);
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
  

  useEffect(() => {
    async function getOrderData() {
      let url = `${process.env.REACT_APP_API_HOST_MONOLITH}/api/orders`;
      let response = await fetch(url);
      let data = await response.json();
      if(response.ok){
        setOrders(data)
      }
    }
    getOrderData();
  }, [])

  const { token } = useAuthContext()
  console.log(token)

        const domain = /https:\/\/[^/]+/;
        const basename = process.env.PUBLIC_URL.replace(domain, '');
        return (
          <BrowserRouter basename={basename}>
            <AuthProvider>
              <GetToken />
              <div>
                  <div className="container">
                    <nav className="tabs is-centered navbar navbar-expand-lg" style={{ display: "flex"}}>
                      <div className="navbar-brand pos-1">VanderWeele Farm</div>
                      <div className="pos-2"><img className="nav-logo" src={require("./images/vander-removebg.png")} alt="logo"/> </div>
                      <ul className="navbar-nav nav nav-pills">
                        <li className="nav-link active" aria-current="page" href="#"><NavLink to="/">Home Page</NavLink></li>
                        <li className="nav-link active" aria-current="page" href="#"><NavLink to="/cart">Shop Produce</NavLink></li>
                        <li className="nav-link active" aria-current="page" href="#"><NavLink to="/produce-admin">Admin Produce</NavLink></li>
                        <li className="nav-link active" aria-current="page" href="#"><NavLink to="/orders">Orders</NavLink></li>
                        <li className="nav-link active" aria-current="page" href="#"><NavLink to="/login">Login</NavLink></li>
                        <li className="nav-link active" aria-current="page" href="#"><NavLink to="/logout">Logout</NavLink></li>
                        <li className="nav-link active" aria-current="page" href="#"><NavLink to="/signup">Signup</NavLink></li>
                        {/* <li><NavLink to="/create-customer">Update User</NavLink></li> */}
                      
                      </ul>
                    </nav>
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