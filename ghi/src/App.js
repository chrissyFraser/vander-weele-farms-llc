import { useEffect, useState } from 'react';
import Construct from './Construct.js'
import ErrorNotification from './ErrorNotification';
import Header from './components/Header';
import Main from './components/Main.js';
import Basket from './components/Basket.js';
import './App.css';
import data from './produce_data_test.js'

function App() {
  const {produce} = data;

  const [cartItems, setCartItems] = useState([]);
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
  }
  return <>
    <div>
      <Header countCartItems={cartItems.reduce((a,v) => a = a + v.qty, 0)}></Header>
      <div className="row">
        <Main onAdd={onAdd} produce={produce}/>
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
