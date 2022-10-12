import { useDeferredValue, useEffect, useState, useTransition } from 'react';
import Construct from './Construct.js'
import ErrorNotification from './ErrorNotification';
import './App.css';
import Header from './components/Header.js';
import Main from './components/Main.js';
import Basket from './components/Basket.js';
import data from './data'

// function App() {
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


function App() {
  const [cartItems, setCartItems] = useState([]);
  const { products } = data;
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      const newCartItems = cartItems.map((x) =>
        x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
      );
      setCartItems(newCartItems);
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      } else {
        const newCartItems = [...cartItems, { ...product,qty: 1}];
        setCartItems(newCartItems);
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      }
    
  }; 
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      const newCartItems = cartItems.filter((x) => x.id !== product.id);
      setCartItems(newCartItems);
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    }else {
      const newCartItems = cartItems.map((x) =>
        x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
      );
      setCartItems(newCartItems);
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    }
  };


  const [isPending, startTransition] = useTransition();
  
  
  
  useEffect(() => {
    startTransition(()=>{setCartItems(
      localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : []
      );})
    
  }, []);

  


  return isPending ? (
    <div>Loading...</div>
  ) : (  
      <div>
        <Header countCartItems={cartItems.reduce((a,v) => a = a + v.qty, 0)} />
        <div className='row'>
          <Main 
            cartItems={cartItems} 
            onAdd={onAdd} 
            onRemove={onRemove} 
            products={products}/>
            
          <Basket  cartItems={cartItems} 
            onAdd={onAdd} 
            onRemove={onRemove}  />
        </div>
      </div>  
    );
}

export default App;