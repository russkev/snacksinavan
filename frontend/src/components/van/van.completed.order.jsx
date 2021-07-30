import React from "react";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import chevron from "../../media/chevron.svg";
import useVanOrder from "../../hooks/useVanOrder";

// Displays a single completed order and its details
export default function CompletedOrder({ order }) {
    const { toggleExpand, orderTotals,} = useVanOrder(order);
    
    // Dealing with the date and time
    let dateTime = new Date(order.updatedAt);
    let timeStamp = dateTime.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
    let date = dateTime.toLocaleDateString();

    return (
    <div className="van-order-container">
        <div className="van-order-container-first history-first" onClick={(event) => toggleExpand(event)}>
            <div className="van-order-title-container">
                <h4 className="van-order-title">{order.customer.firstName} {order.customer.lastName}</h4>
            </div>
            <ul className="van-order-snack-list van-order-items">
                {order.snacks.map((snack)=>(
                    <li colspan="2">{snack.length} x {snack[0].name}</li>
                ))}
            </ul>
            <div className="van-order-details" id={`detailsID${order._id}`}>
            <div className="review">
            {order.rating ?
            <div className="van-order-rating-container">
                <h4>Rating:</h4>
                <Box component="fieldset" borderColor="transparent">
                        <Rating
                            precision={0.5}
                            size="large"  
                            value={order.rating}
                            readOnly
                        />
                </Box>
            </div> : <> </>}
            {order.feedback ?
            <div className="van-order-comment-container">
                <h4>Comment:</h4>
                <p>{order.feedback}</p>                
            </div> : <> </>}   
            </div>
            <div className="order-info-grid">
            <div className="van-order-price-item">Subtotal:</div>
            <div className="van-order-pad-right">{`$${orderTotals.subtotal.toFixed(2)}`}</div>
            <div className="van-order-price-item">Discount:</div>
            <div className="van-order-pad-right">{`$${orderTotals.discount.toFixed(2)}`}</div>
            <div className="van-order-price-item van-order-price-bold">Total:</div>
            <div className="van-order-price-bold van-order-pad-right">
                {`$${orderTotals.total.toFixed(2)}`}
            </div>
            <div className="van-order-price-item">Order Time:</div>
            <div className="van-order-details-left">{order.updatedAt.slice(11, 19)}</div>
            <div className="van-order-price-item">ID:</div>
            <div className="van-order-details-left">{order._id.slice(-6)}</div>
            <div className="van-order-details-end" />
            <div />
            </div>
            </div>
            
            <div className="chevron">
                <img src={chevron} alt="expand order details"></img>
            </div>    

        </div>
        <div className="van-order-countdown-container history-second">
            <div className="van-order-title-container time">
                <h4 className="van-order-title">
                    {timeStamp}
                </h4>
                <span className="date">
                    {date}
                </span>
            </div>
        </div>
        <hr className="van-order-separator" />
    </div>
    );
}

// Displays text signifying no currently completed orders if applicable
export function NoOrders({ vanOrders }) {
    
    let numCompleted = 0;
    for (let i in vanOrders) {
        let vanOrder = vanOrders[i];
        if (vanOrder.isCompleted && !vanOrder.isCancelled) {
        numCompleted++;
        }
    }

    return (
        <React.Fragment> 
            {numCompleted === 0 ? <h4 className="no-orders">You haven't completed any orders yet.</h4> : <></>}
        </React.Fragment>
    )
}