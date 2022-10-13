import {BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';

import { useEffect, useState } from 'react';
import Construct from './Construct.js'
import ErrorNotification from './ErrorNotification';
import './App.css';
import ProduceList from './ProduceList';
import ProduceCreate from './ProduceCreate.js';

function App() {
  const [launch_info, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);  
  const [get_all_produce, setProduce] = useState([]);
  const [create_produce, setCreateProduce] = useState([])

  useEffect(() => {
    async function getData() {
      // let url = `${process.env.REACT_APP_API_HOST}api/launch-details`;
      // console.log('fastapi url: ', url);
      // let response = await fetch(url);
      // console.log("------- hello? -------");
      // let data = await response.json();

      // if (response.ok) {
      //   console.log("got launch data!");
      //   setLaunchInfo(data.launch_details);
      // } else {
      //   console.log("drat! something happened");
      //   setError(data.message);
      // }

      let url = `${process.env.REACT_APP_API_HOST_MONOLITH}/api/produce/`;
      console.log("url", url)
      let response = await fetch(url);
      let data = await response.json();
      if(response.ok){
        console.log("got produce data")
        setProduce(data)
        // console.log(data)
      }else {
        console.log("drat! something happened");
        setError(data.message);
      }

      

      // url = `${process.env.REACT_APP_API_HOST_MONOLITH}/api/produce/`;


    }
    getData();
  }, [])

  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');
  return (
      <div>
        {/* <ErrorNotification error={error} />
        <Construct info={launch_info} /> */}
        <BrowserRouter basename={basename}>
          <div className="container">
            <div className="tabs is-centered">
              <ul>
                <li><NavLink to="/produce-admin">Produce</NavLink></li>
                {/* <li><NavLink to="/produce-create">Produce</NavLink></li> */}
              </ul>
            </div>
            <ErrorNotification error={error} />
            <Routes>
              <Route path="/produce-admin" element={<ProduceList get_all_produce={get_all_produce} />} />
              <Route path="/produce-create" element={<ProduceCreate get_all_produce={get_all_produce} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
      
  );
}

export default App;
// <ProduceList produce={produce} />