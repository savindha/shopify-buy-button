import './shopify-product.styles.css'

import React, { useEffect, useState } from 'react';




const Product = ({ product, addVariantToCart }) => {

    const [image, setImage] = useState('')
    const [selectedVariantQuantity, setSelectedVariantQuantity] = useState(0)

    useEffect(() => {
        findImage()
    })


    const findImage = () => {
        setImage(product.images[0].src)


    }

    const handleQuantityChange = ({ target: { value } }) => {
        setSelectedVariantQuantity(value)
    }

    let variant = product.variants[0]
    let variantQuantity = selectedVariantQuantity || 1






    return (
        <div className='Product'>
            <img src={image} alt='product' />
            <h5 className="Product__title">{product.title}</h5>
            <div className='product-info'>

                <span className="Product__price">${variant.price}</span>
                <div className='product-footer'>
                    <label className="Product__option">
                        <input className='qty-input' min="1" type="number" defaultValue={variantQuantity} onChange={handleQuantityChange}></input>
                    </label>

                </div>
                <div className='add-to-cart-button'>
                    <button className="Product__buy" onClick={() => addVariantToCart(variant.id, variantQuantity)}>Add to Cart</button>
                </div>
            </div>


        </div>
    )
}

export default Product;