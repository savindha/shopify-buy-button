import React, { useEffect, useState } from "react";
import Client from 'shopify-buy';
import ProductsArray from "./ShopifyProducts/ProductsArray/shopify-products-array.component";
import Cart from "./Cart/cart.component";
import './AddOn.styles.css'
import { ReactComponent as Loader } from '../../assets/loader.svg'




const client = Client.buildClient({

    storefrontAccessToken: process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    domain: process.env.REACT_APP_SHOPIFY_DOMAIN

});

const AddOn = () => {


    const [products, setProducts] = useState([])
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [checkout, setCheckout] = useState({
        lineItems: []
    })
    const [isProductsLoaded, setIsProductsLoaded] = useState(false)




    useEffect(() => {
        checkoutInfo()
        productsInfo()

    }, [])

    useEffect(() => {
        if (products.length !== 0) {
            setIsProductsLoaded(true)
        } else {
            setIsProductsLoaded(false)
        }
    }, [products])





    const productsInfo = async () => {
        let productData = await client.product.fetchAll(100)
        setProducts(productData)

    }



    const checkoutInfo = async () => {
        let checkoutData = await client.checkout.create()
        setCheckout(checkoutData)
    }


    const addVariantToCart = async (variantId, quantity) => {

        setIsCartOpen(true)
        const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }]
        const checkoutId = checkout.id
        const res = await client.checkout.addLineItems(checkoutId, lineItemsToAdd)
        setCheckout(res)
    }

    const updateQuantityInCart = async (lineItemId, quantity) => {
        const checkoutId = checkout.id
        const lineItemsToUpdate = [{ id: lineItemId, quantity: parseInt(quantity, 10) }]

        const res = await client.checkout.updateLineItems(checkoutId, lineItemsToUpdate)
        setCheckout(res)

    }

    const removeLineItemInCart = async (lineItemId) => {
        const checkoutId = checkout.id

        const res = await client.checkout.removeLineItems(checkoutId, [lineItemId])
        setCheckout(res)

    }

    const handleCartClose = () => {
        setIsCartOpen(false)

    }

    return (
        <div className='add-on layout--centered'>
            {!isProductsLoaded ?
                <div className='loader-container'>
                    <Loader className="loader" />
                </div> :
                <>
                    <div className='addon-topic'>
                        <h1>Shopify-Buy-Button </h1>
                    </div>
                    {isCartOpen ?
                        <div className="buybutton-wrapper">
                            <ProductsArray
                                products={products}
                                client={client}
                                addVariantToCart={addVariantToCart}

                            />
                            <Cart className='cart-wrapper-component'
                                checkout={checkout}
                                isCartOpen={isCartOpen}
                                handleCartClose={handleCartClose}
                                updateQuantityInCart={updateQuantityInCart}
                                removeLineItemInCart={removeLineItemInCart}
                            />
                        </div> :
                        <div className="buybutton-wrapper">
                            <ProductsArray
                                products={products}
                                client={client}
                                addVariantToCart={addVariantToCart}

                            />
                        </div>
                    }

                </>
            }


        </div>


    )
}

export default AddOn;