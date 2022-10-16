import {BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';

import { useEffect, useState } from 'react';
// import Construct from './Construct.js'
// import ErrorNotification from './ErrorNotification';
import './App.css';
import ProduceList from './ProduceList';
import ProduceCreate from './ProduceCreate';
import ProduceItem from './ProduceItem';
import Cart from './Cart.js'

function App() {
  // const [launch_info, setLaunchInfo] = useState([]);
  // const [error, setError] = useState(null);  
  const [get_all_produce, setProduce] = useState([]);
  const [produce_item, setProduceItem] = useState([]);
  const [cart, setCart] = useState([]);
  // const [create_produce, setCreateProduce] = useState([]);
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

        url = `${process.env.REACT_APP_API_HOST_MONOLITH}/api/produce/${produce_item}`;
        console.log("url", url)
        response = await fetch(url)
        data = await response.json();
        if(response.ok){
          setProduceItem(data)
        }
    }
    getProduceData();

    // async function getConstructionData(){
    //   let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
    //   console.log(url)
    //   let response = await fetch(url);
    //   console.log("------- hello? -------");
    //   let data = await response.json();
    //   if (response.ok) {
    //     setLaunchInfo(data.launch_details);
    //   } else {
    //     console.log("drat! something happened");
    //     setError(data.message);
    //   }
    // }
    // getConstructionData();
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
              <Route path="/produce-admin" element={<ProduceList get_all_produce={get_all_produce} />} />
              <Route path="/cart" element={<Cart get_all_produce={get_all_produce} />} />
              <Route path="/produce-create" element={<ProduceCreate get_all_produce={get_all_produce} keys = {keys} />} />
              <Route path="/cart" element={<Cart cart={cart}/>} />
              <Route path= {`/produce-item/${produce_item}`} element= {<ProduceItem produce_item={produce_item} /> } />
              {/* <Route path="/error" element={<ErrorNotification error={error}/>} /> */}
            </Routes>
          </div>
        </BrowserRouter>
      </div>
      
  );
}

export default App;
