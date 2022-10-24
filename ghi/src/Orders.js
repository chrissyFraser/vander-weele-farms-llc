
// import { useEffect, useState } from 'react';

// function Orders(props) {
//     console.log(props)

//     const [get_all_orders, setOrders] = useState([]);

//     useEffect(() => {
//         async function getOrdersData() {
//             let url = `${process.env.REACT_APP_API_HOST_MONOLITH}/api/orders/`;
//             let response = await fetch(url);
//             let data = await response.json();
//             if (response.ok) {
//                 setOrders(data)
//             }
//         }
//         getOrdersData();
//     }, [])

//     return (
//         <>
//             <div style={{ textAlign: "center" }}>
//                 <h1 style={{ textAlign: "center", }} >Orders</h1>
//             </div>



//             <div className="columns is-centered">
//                 <div className="column is-narrow">
//                     <table className="table is-striped">
//                         <thead>
//                             <tr>
//                                 <th>Order ID</th>
//                                 <th>Customer Name</th>
//                                 <th>Products</th>
//                                 <th>Quantity</th>
//                                 <th>Driver Name</th>
//                                 <th>Order Date</th>
//                                 <th>Printed</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {props.get_all_orders.map(orders => (
//                                 <tr key={orders.id}>
//                                     <td>{orders.product_name}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </>


//     )
// }
// export default Orders;