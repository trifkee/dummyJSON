import React from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { useQuery } from 'react-query'
import Product from '../Components/Product'

export default function Search() {
    const { searchValue } = useParams()

    const {data, isFetching, isLoading } = useQuery('searchedProducts', () => {
        return axios.get(`https://dummyjson.com/products/search?q=${searchValue}`)
    })

    return (
        <section className='page'>
            <div className="product-filters">
                <div className="search-filter" style={{margin:'.5rem 0'}}>
                    <p style={{fontSize:'1rem', marginTop:'1rem', textTransform:'lowercase', fontWeight:'300'}}>results for</p>
                    <h2 style={{fontSize:'1.5rem', textTransform:'uppercase'}}>{searchValue}</h2>
                    {/* <input onKeyDown={searchProduct} onChange={handleSearch} value={searchValue} placeholder='Eg. iPhone 14...' type="text" /> */}
                </div>
            </div>

            <div className="products">
                {data?.data.products.map(product => <Product key={product.id} id={product.id} props={product} />)}
            </div>    
        </section>
    )
}

