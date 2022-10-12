// import { useEffect, useState } from 'react';

// import Construct from './Construct.js'
// import ErrorNotification from './ErrorNotification';
import Header from './components/Header';
import Main from './components/Main.js';
import Basket from './components/Basket.js';
import './App.css';

// function App() {

//   const [cartItems, setCartItems] = useState([]);
//   const [produceList, setProduceList] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function getData() {
//       let url = `${process.env.REACT_APP_API_HOST}/api/produce/`;
//       let response = await fetch(url);
//       let data = await response.json();

//       if (response.ok) {
//         setProduceList(data.produce);
//       } else {
//         setError(data.message);
//       }
//     }
//     getData();
//   }, [])


  

// export default App;













//   const [launch_info, setLaunchInfo] = useState([]);
//   const [error, setError] = useState(null);  

//   useEffect(() => {
//     async function getData() {
//       let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
//       console.log('fastapi url: ', url);
//       let response = await fetch(url);
//       console.log("------- hello? -------");
//       let data = await response.json();

//       if (response.ok) {
//         console.log("got launch data!");
//         setLaunchInfo(data.launch_details);
//       } else {
//         console.log("drat! something happened");
//         setError(data.message);
//       }
//     }
//     getData();
//   }, [])


//   return (
//     <div>
//       <ErrorNotification error={error} />
//       <Construct info={launch_info} />
//     </div>
//   );
// }

// export default App;
import {BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Construct from './Construct.js'
import ErrorNotification from './ErrorNotification';
import './App.css';
import ProduceList from './ProduceList';

function App() {
  //const [launch_info, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);  
  const [get_all_produce, setProduce] = useState([]);

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_API_HOST_MONOLITH}/api/produce/`;
      console.log("url", url)
      let response = await fetch(url);
      let data = await response.json();
      if(response.ok){
        console.log("got produce data")
        setProduce(data)
      }else {
        console.log("Hm. Something happened");
        setError(data.message);
      }


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
              </ul>
            </div>
            <ErrorNotification error={error} />
            <Routes>
              <Route path="/produce-admin" element={<ProduceList get_all_produce={get_all_produce} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
      
  );
  }
  const onAdd = (produce) => {
    const exist = cartItems.find((x) => x.id === produce.id);
    if(exist) {
      setCartItems(
        cartItems.map((x) => 
          x.id === produce.id ? {...exist, qty: exist.qty + 1} : x
          )
        );
    } else {
        setCartItems([...cartItems, {...produce, qty: 1}]);

    }
  };  
  const onRemove = (produce) => {
    const exist = cartItems.find((x) => x.id === produce.id);
    if(exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== produce.id))
    } else {
      setCartItems(
        cartItems.map((x) => 
          x.id === produce.id ? {...exist, qty: exist.qty - 1} : x
          )
      )
    }
  
  return <>
    <div>
      <Header countCartItems={cartItems.reduce((a,v) => a = a + v.qty, 0)}></Header>
      <div className="row">
        <Main onAdd={onAdd} produce={data.produce}/>
        <Basket
        onAdd={onAdd} 
        onRemove={onRemove}  
        cartItems={cartItems}>
        </Basket>
      </div>
    </div>
  </>
}

export default App;