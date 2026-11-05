import { Order } from "../data/portalData.js";
import { useState } from "react";

export default function Orders() {
  




  return (
    <div className="order-page">
        <div className="Order Page-Heading">
            <h3>{Order.heading}</h3>
           <p>{Order.description}</p>
        </div>
          <div className="Order-card">
            <div classnmae="OrderTable">
                <table>
                    <thread>
                        <tr>
                            <th>ORDERS</th>
                            <th>CUSTOMER</th>
                            <th>CHANNEL</th>
                            <th>TRANCATIONS</th>
                            <th>TOTAL</th>
                            <th>STATUS</th>
                            <th>VIEW</th>
                            
                        </tr>
                    </thread>
                    <tbody>
                        <section className="Table-Data">
                            <p>No orders yet — they appear here when the tenant's system calls POST /v1/orders.</p>

                        </section>
                    </tbody>
                </table>
            </div>
          </div>
    </div>
  );
}

