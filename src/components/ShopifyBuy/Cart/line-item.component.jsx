import React from 'react'
import './line-item.styles.css'

const LineItem = ({ updateQuantityInCart, removeLineItemInCart, line_item }) => {

    const decrementQuantity = (lineItemId) => {
        const updatedQuantity = line_item.quantity - 1
        updateQuantityInCart(lineItemId, updatedQuantity);
    }

    const incrementQuantity = (lineItemId) => {
        const updatedQuantity = line_item.quantity + 1
        updateQuantityInCart(lineItemId, updatedQuantity);
    }
    return (
        <div className="Line-item-wrapper">
            <div className="Line-item__img">
                {line_item.variant.image ? <img src={line_item.variant.image.src} alt={`${line_item.title} product shot`} /> : null}
            </div>
            <div className="Line-item__content">
                <div className="Line-item-title__content-row">
                    <span className="Line-item__title">
                        {line_item.title}
                    </span>
                </div>
                <div className="Line-item__content-row">
                    <div className="Line-item__quantity-container">
                        <button className="Line-item__quantity-update" onClick={() => decrementQuantity(line_item.id)}>-</button>
                        <span className="Line-item__quantity">{line_item.quantity}</span>
                        <button className="Line-item__quantity-update" onClick={() => incrementQuantity(line_item.id)}>+</button>
                    </div>
                    <span className="Line-item__price">
                        $ {(line_item.quantity * line_item.variant.price).toFixed(2)}
                    </span>
                    <button className="Line-item__remove" onClick={() => removeLineItemInCart(line_item.id)}>×</button>
                </div>
            </div>

        </div>
    )
}

export default LineItem;