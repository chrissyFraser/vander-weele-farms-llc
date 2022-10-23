import { useState } from 'react';
import { useAuthContext } from './Auth';


function Orders() {
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
                    <th></th>
                    <th></th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        </td>
                        <td>
                        </td>
                    </tr>
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