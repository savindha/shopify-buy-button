import './shopify-products-array.styles.css'
import Product from '../Product/shopify-product.component'
import React from 'react'

const ProductsArray = ({ products, client, addVariantToCart }) => {

    return (
        <div className='Product-wrapper'>
            {
                products.map((product) => (
                    <Product product={product} client={client} key={product.id} addVariantToCart={addVariantToCart}  />
                ))
            }
        </div>
    )
}

export default ProductsArray;