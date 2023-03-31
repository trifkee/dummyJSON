import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { IProduct } from '../../domain/interfaces/products/products'
// HOOKS
import { useFetchCategories } from '../../infrastructure/API/queries/useFetchCategories'
import { useFetchProducts } from '../../infrastructure/API/queries/useFetchProducts'
// UI
import Product from '../Components/Product'

// type TProduct =  {
//   product:{
//     id:number,
//     thumbnail:string,
//     title:string,
//     brand:string,
//     category:string,
//     description: string,
//     rating:number,
//   }
// }

function Home() {
  const navigate = useNavigate()

  // STATES
  const [searchValue, setSearchValue] = useState<string>('')
  const [categoryName, setCategoryName] = useState<string>('all')
  const [temp, setTemp] = useState([])

  // FETCHING DATA
    // fetch all products
  let path = categoryName === 'all' ? 'products' : `products/category/${categoryName}`

  const { data:allData, isFetching, refetch, isError } = useFetchProducts('allProducts', path)
  const { data:categories } = useFetchCategories('categories')

  // FUNCTIONS
  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategoryName(e.target.value)
  }

  const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  // USEEFFECT
  useEffect(() => {
    if(searchValue) {
      const filteredArray = allData?.data.products.filter(((item:IProduct) => item.title.toLowerCase().includes(searchValue)))
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
        <h2 style={{display:'flex', alignItems:'center'}}>Loading. {/*<ion-icon name="hourglass-outline"></ion-icon>*/}</h2>
      </section>
    )
  }

  if(isError || !localStorage.getItem('user')){
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/login')
  }

  const returnData = () => {
    if(searchValue.length > 2) {
      return temp.map((product:IProduct) => <Product key={product.id} product={product} />)
    } else {
      return allData?.data?.products.map((product : IProduct) => <Product key={product.id} product={product}/>)
    }
  }
  
  return ( 
    <section className='page'>
      <div className="product-filters">
        <div className="search-filter">
          <p style={{fontSize:'1.5rem', marginTop:'1rem', display:'flex', alignItems:"center", gap:'.5rem'}}>{/*<ion-icon name="search"></ion-icon>*/} Search</p>
          <input onChange={handleSearch} value={searchValue} placeholder='Eg. iPhone 14...' type="text" />
        </div>

        <div className="category-filter">
          <p style={{fontSize:'1.5rem', marginTop:'1rem', display:'flex', alignItems:"center", gap:'.5rem'}}>{/*<ion-icon name="filter"></ion-icon>*/} Categories</p>
          
          <select value={categoryName} onChange={(e) => handleCategory(e)} name="category" id="category-filter">
            <option value="all">All</option>
            {categories?.data?.map((category:string,id:number) => {
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