import { useAuthContext } from './Auth';



function Orders(props) {
    
    // const {get_all_orders} = props;
    console.log("orders", props)
    const { token } = useAuthContext();
    if (token) {
        return( <>
            <div style={{textAlign: "center"}}>
            <h1 style={{textAlign: "center", }} >Orders</h1>
            </div>

            <div className="columns is-centered">
            <div className="column is-narrow">
                <table className="table is-striped">
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
                        <td>{order.printed ? 'Yes' : 'No'}</td>
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
            <>
                <h2>You do not have access to this page.</h2>
            </>
        )
    }
    
}
export default Orders;
