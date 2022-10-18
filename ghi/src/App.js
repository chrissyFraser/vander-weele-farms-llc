import {BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';

import { useEffect, useState } from 'react';
// import Construct from './Construct.js'
// import ErrorNotification from './ErrorNotification';
import './App.css';
import ProduceList from './ProduceList';
import ProduceCreate from './ProduceCreate';
import ProduceItem from './ProduceItem';
import ProduceItemEdit from './ProduceItemEdit';
import Cart from './Cart.js'

function App() {
  
  const [get_all_produce, setProduce] = useState([]);
  const [produce_id, setProduceId] = useState([]);
  const [cart, setCart] = useState([]);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    async function getProduceData() {
      let url = `${process.env.REACT_APP_API_HOST_MONOLITH}/api/produce/`;
      let response = await fetch(url);
      let data = await response.json();
      if(response.ok){
        setProduce(data)
      }
      
        url = `${process.env.REACT_APP_API_HOST_MONOLITH}/keys`;
        response = await fetch(url)
        data = await response.json();
        if(response.ok){
        setKeys(data);
        }
    }
    getProduceData();
  }, [])



  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');
  return (
      <div>
        <BrowserRouter basename={basename}>
          <div className="container">
            <div className="tabs is-centered">
              <ul>
                <li><NavLink to="/produce-admin">Produce</NavLink></li>
                <li><NavLink to="/cart">cart</NavLink></li>
              </ul>
            </div>
            {/* <ErrorNotification error={error} /> */}
            <Routes>
              <Route path="/produce-admin" element={<ProduceList get_all_produce={get_all_produce} produce_id = {produce_id} setProduceId={setProduceId}/>} />
              <Route path="/cart" element={<Cart get_all_produce={get_all_produce} />} />
              <Route path="/produce-create" element={<ProduceCreate get_all_produce={get_all_produce} keys = {keys}  />} />
              <Route path="/cart" element={<Cart cart={cart}/>} />
              <Route path= {`/produce-admin/:ID`}
              element= {<ProduceItem  produce_id={produce_id} /> } />
              <Route path= {`/produce-admin/:ID/patch`}
              element= {<ProduceItemEdit  produce_id={produce_id} get_all_produce={get_all_produce} keys = {keys} /> } />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
      
  );
}

export default App;
