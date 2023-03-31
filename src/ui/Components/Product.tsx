import { Link } from 'react-router-dom'

type TProduct =  {
  product:{
    id:number,
    thumbnail:string,
    title:string,
    brand:string,
    category:string,
    description: string,
    rating:number,
  }
}

function Product(product:TProduct) {

  return (
    <Link to={`/product/${product?.product.id}`}>
      <article className='product-card'>
          <img src={product?.product.thumbnail} alt={product?.product.title} />
          <div className="product-info">
              <h2>{product?.product.title}</h2>
              <div className="product-labels">
                  <p style={{display:'flex'}}>{/*<ion-icon name="star"></ion-icon>*/}{product?.product.rating}&nbsp;</p>
                  <p>{product?.product.brand}</p>
                  <p>{product?.product.category}</p>
              </div>
              <p className='product-desc'>{product?.product.description || 'No description for this product.'}</p>
          </div>
      </article>
    </Link>
  )
}

export default Product