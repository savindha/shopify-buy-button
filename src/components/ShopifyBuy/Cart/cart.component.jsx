import React from 'react'
import LineItem from './line-item.component'
import './cart.styles.css'

const Cart = ({ checkout, isCartOpen, handleCartClose, updateQuantityInCart, removeLineItemInCart }) => {




    const openCheckout = async () => {
        let url = checkout.webUrl
        window.open(url, "_self");

    }

    return (
        <div className={`Cart-wrapper ${isCartOpen ? 'Cart--open' : ''}`}>
            <header className="Cart__header">
                <h2>Your cart</h2>
                <button
                    onClick={handleCartClose}
                    className="Cart__close">
                    ×
                </button>
            </header>
            <ul className="Cart__line-items">
                {
                    checkout.lineItems.map((line_item) => (
                        <LineItem
                            updateQuantityInCart={updateQuantityInCart}
                            removeLineItemInCart={removeLineItemInCart}
                            key={line_item.id.toString()}
                            line_item={line_item}
                        />
                    ))
                }
            </ul>
            <footer className="Cart__footer">
                <div className="Cart-info clearfix">
                    <div className="Cart-info__total Cart-info__small">Subtotal</div>
                    <div className="Cart-info__pricing">
                        <span className="pricing">$ {checkout.subtotalPrice}</span>
                    </div>
                </div>
                <div className="Cart-info clearfix">
                    <div className="Cart-info__total Cart-info__small">Taxes</div>
                    <div className="Cart-info__pricing">
                        <span className="pricing">$ {checkout.totalTax}</span>
                    </div>
                </div>
                <div className="Cart-info clearfix">
                    <div className="Cart-info__total Cart-info__small">Total</div>
                    <div className="Cart-info__pricing">
                        <span className="pricing">$ {checkout.totalPrice}</span>
                    </div>
                </div>
                <button className="Cart_checkout" onClick={openCheckout}>Checkout</button>
            </footer>

        </div>
    )
}

export default Cart;

