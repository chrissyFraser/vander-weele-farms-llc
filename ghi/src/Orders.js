import { useAuthContext } from './Auth';
import { useState } from 'react';
function Orders(props) {
    const [printed, setPrint] = useState(false);
    // const {get_all_orders} = props;
    console.log("orders", props)
    const { token } = useAuthContext();
    if (token) {
        function parseJwt(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        }

        const data = parseJwt(token)
        const user = Object.values(data)
        const myUser = user[3]
        const valuesUser = Object.values(myUser)
        const user_status = valuesUser[2]
        console.log(user_status)

        if (user_status.includes("admin")) {
            return (
                <>
                    <div style={{ textAlign: "center" }}>
                        <h1 style={{ textAlign: "center", }} >Orders</h1>
                    </div>

                    <div className="columns is-centered">
                        <div className="column is-narrow">
                            <table className="table" style={{ textAlign: "center" }}>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Driver</th>
                                        <th>Order Date</th>
                                        <th>Printed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.get_all_orders.map((order) => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.customer_name}</td>
                                            <td>{order.product_name}</td>
                                            <td>{order.qty}</td>
                                            <td>{order.driver_name}</td>
                                            <td>{order.order_date}</td>
                                            <td><button onClick={() => setPrint(!printed)} type="button" className="btn btn-warning" id="printbtn">{printed ? 'Yes' : 'No'}</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>


            )
        } else {
            return (
                <h2>You are not authorizaed to view this page</h2>
            )
        }
    } else {
        return (
            <>
                <h2>You do not have access to this page.</h2>
            </>
        )
    }


}
export default Orders
