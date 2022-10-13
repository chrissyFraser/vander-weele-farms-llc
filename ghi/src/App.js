import { useEffect, useState } from 'react';
import ErrorNotification from './ErrorNotification';
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import './App.css';
import GetProduce from './GetProduce'

function App() {
  const [produce, setProduce] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
      async function getData() {
          let url = `${process.env.REACT_APP_API_HOST_MONOLITH}/api/produce/`;
          let response = await fetch(url);
          let data = await response.json();

          if (response.ok) {
              setProduce(data);
          } else {
              setError(data.message);
          }
      }
      getData();
  }, [])

  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');
  return (
      <BrowserRouter basename={basename}>
          <div className="container">
              <div className="tabs is-centered">
                  <ul>
                      <li><NavLink to="/produce">Produce</NavLink></li>
                  </ul>
              </div>
              <ErrorNotification error={error} />
              <Routes>
                  <Route path="/produce" element={<GetProduce produce={produce} />} />
              </Routes>
          </div>
      </BrowserRouter>
  );
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
