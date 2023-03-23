import React from 'react'
import { useParams } from 'react-router'
import Product from '../Components/Product'
import useFetch from '../hooks/useFetch'

export default function Search() {
    const { searchValue } = useParams()

    const { data } = useFetch('searchedProducts', `https://dummyjson.com/auth/products/search?q=${searchValue}`)

    return (
        <section className='page'>
            <div className="product-filters">
                <div className="search-filter" style={{margin:'.5rem 0'}}>
                    <p style={{fontSize:'1rem', marginTop:'1rem', textTransform:'lowercase', fontWeight:'300'}}>results for</p>
                    <h2 style={{fontSize:'1.5rem', textTransform:'uppercase'}}>{searchValue}</h2>
                </div>
            </div>

            <div className="products">
                {data?.data.products.map(product => <Product key={product.id} id={product.id} props={product} />)}
            </div>    
        </section>
    )
}

