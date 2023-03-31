import React from 'react'
import { useParams } from 'react-router'
import { IProduct } from '../../domain/interfaces/products/products'
// HOOKS
import { useFetchProducts } from '../../infrastructure/API/queries/useFetchProducts'
// UI
import Product from '../Components/Product'

export default function Search() {
    const { searchValue } = useParams()

    const { data } = useFetchProducts('searchedProducts', `https://dummyjson.com/auth/products/search?q=${searchValue}`)

    return (
        <section className='page'>
            <div className="product-filters">
                <div className="search-filter" style={{margin:'.5rem 0'}}>
                    <p style={{fontSize:'1rem', marginTop:'1rem', textTransform:'lowercase', fontWeight:'300'}}>results for</p>
                    <h2 style={{fontSize:'1.5rem', textTransform:'uppercase'}}>{searchValue}</h2>
                </div>
            </div>

            <div className="products">
                {data?.data.products.map((product:IProduct) => <Product key={product.id} product={product} />)}
            </div>    
        </section>
    )
}

