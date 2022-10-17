import {BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';

import { useEffect, useState } from 'react';
import Construct from './Construct.js'
import ErrorNotification from './ErrorNotification';
import './App.css';
import ProduceList from './ProduceList';
import ProduceCreate from './ProduceCreate';
import HomePage from './HomePage.js';
import Cart from './Cart.js'
import Orders from './Orders.js';
import GetOne from './GetOne.js';


function App() {
  const [launch_info, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);  
  const [get_all_produce, setProduce] = useState([]);
  const [create_produce, setCreateProduce] = useState([]);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    async function getData() {
      // let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
      // console.log(url)
      // let response = await fetch(url);
      // console.log("------- hello? -------");
      // let data = await response.json();
      // if (response.ok) {
      //   setLaunchInfo(data.launch_details);
      // } else {
      //   console.log("drat! something happened");
      //   setError(data.message);
      // }

      let url = `${process.env.REACT_APP_API_HOST_MONOLITH}/api/produce/`;
      let response = await fetch(url);
      let data = await response.json();
      if(response.ok){
        setProduce(data)
        console.log(data)
      }else {
        console.log("drat! something happened");
        setError(data.message);
      }


        url = `${process.env.REACT_APP_API_HOST_MONOLITH}/keys`;
        response = await fetch(url)
        data = await response.json();
        if(response.ok){
        setKeys(data);
        }
    }
    getData();
  }, [])

  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');
  return (
      <div>
        <BrowserRouter basename={basename}>
          <div className="container">
            <div className="tabs is-centered" style={{ display: "flex"}}>
            <img className="logo" src="https://scontent-sjc3-1.xx.fbcdn.net/v/t39.30808-6/309061405_469280831892766_4474664018961093891_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=0FFC68GtDTgAX-AlbXs&_nc_ht=scontent-sjc3-1.xx&oh=00_AT9g2FzUrWsYkJFyDtW4gdLwtT5MJPFI9j1_2Ee-bF5Hsg&oe=63537D39" alt="logo" />
              <ul>
                <li><NavLink to="/">Home Page</NavLink></li>
                <li><NavLink to="/cart">Shop Produce</NavLink></li>
                <li><NavLink to="/produce-admin">Admin Produce</NavLink></li>
                <li><NavLink to="/orders">Orders</NavLink></li>
              </ul>
            </div>
            <ErrorNotification error={error} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/produce-admin" element={<ProduceList get_all_produce={get_all_produce} />} />
              <Route path="/cart" element={<Cart get_all_produce={get_all_produce} />} />
              <Route path="/produce-create" element={<ProduceCreate get_all_produce={get_all_produce} keys = {keys} />} />
              {/* <Route path="/" element={<Construct info={launch_info}/>} />
              <Route path="/error" element={<ErrorNotification error={error}/>} /> */}
              <Route path="/orders" element={<Orders get_all_produce={get_all_produce} />} />
              {/* <Route path="/get-one" element={<GetOne oneProduct={oneProduct} />} /> */}
            </Routes>
          </div>
        </BrowserRouter>
      </div>
      
  );
}

export default App;
