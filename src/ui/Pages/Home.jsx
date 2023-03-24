import React, { useEffect, useState } from 'react'
// HOOKS
import { useFetchCategories } from '../../infrastructure/API/queries/useFetchCategories'
import { useFetchProducts } from '../../infrastructure/API/queries/useFetchProducts'
// UI
import Product from '../../ui/Components/Product'

function Home() {

  // STATES
  const [searchValue, setSearchValue] = useState('')
  const [categoryName, setCategoryName] = useState('all')
  const [temp, setTemp] = useState([])

  // FETCHING DATA
  // fetch all products
  let path = categoryName === 'all' ? 'products' : `products/category/${categoryName}`

  const { data:allData, isFetching, refetch } = useFetchProducts('allProducts', path)
  const { data:categories } = useFetchCategories('categories')

  // FUNCTIONS
  const handleCategory = (e) => {
    setCategoryName(e.target.value)
  }

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  // USEEFFECT
  useEffect(() => {
    if(searchValue) {
      const filteredArray = allData.data.products.filter((item => item.title.toLowerCase().includes(searchValue)))
      return setTemp(filteredArray);
    } else {
      setTemp([]);
    }
  }, [searchValue])
  
  useEffect(() => {
    refetch()
  }, [categoryName])
  
  // IF DATA IS FETCHING
  if(isFetching){
    return(
      <section style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100vh'}}>
        <h2 style={{display:'flex', alignItems:'center'}}>Loading. <ion-icon name="hourglass-outline"></ion-icon></h2>
      </section>
    )
  }

  const returnData = () => {
    if(searchValue.length > 2) {
      return temp.map(product => <Product key={product.id} id={product.id} props={product} />)
    } else {
      return allData?.data.products.map(product => <Product key={product.id} id={product.id} props={product} />)
    }
  }
  
  return ( 
    <section className='page'>
      <div className="product-filters">
        <div className="search-filter">
          <p style={{fontSize:'1.5rem', marginTop:'1rem', display:'flex', alignItems:"center", gap:'.5rem'}}><ion-icon name="search"></ion-icon> Search</p>
          <input onChange={handleSearch} value={searchValue} placeholder='Eg. iPhone 14...' type="text" />
        </div>

        <div className="category-filter">
          <p style={{fontSize:'1.5rem', marginTop:'1rem', display:'flex', alignItems:"center", gap:'.5rem'}}><ion-icon name="filter"></ion-icon> Categories</p>
          
          <select value={categoryName} onChange={handleCategory} name="category" id="category-filter">
            <option value="all">All</option>
            {categories?.data.map((category,id) => {
              return <option key={category} value={category}>{category}</option>
            })}
          </select>
        </div>
      </div>

      <div className="products">
       {returnData()}
      </div>
    </section>
  )
}

export default Home