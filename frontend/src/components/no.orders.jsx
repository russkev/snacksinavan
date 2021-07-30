import React from "react";

// Displays text signifying this user has no orders
export default function NoOrders({ orders }) {

    let numOrders = 0;
    for (let i in orders ) {
      let vanOrder = orders[i];
      if (!vanOrder.isCancelled) {
        numOrders++;
      }
    }
  
    return (
        <React.Fragment> 
            {numOrders === 0 ? <h4 className="no-orders">You don't have any orders.</h4> : <></>}
        </React.Fragment>
    )
  }