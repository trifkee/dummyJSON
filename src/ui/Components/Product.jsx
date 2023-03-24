import React from 'react'
import { Link } from 'react-router-dom'

function Product(props) {

  return (
    <Link to={`/product/${props?.props.id}`}>
      <article className='product-card'>
          <img src={props?.props.thumbnail} alt={props?.props.title} />
          <div className="product-info">
              <h2>{props?.props.title}</h2>
              <div className="product-labels">
                  <p style={{display:'flex'}}><ion-icon name="star"></ion-icon>{props?.props.rating}&nbsp;</p>
                  <p>{props?.props.brand}</p>
                  <p>{props?.props.category}</p>
              </div>
              <p className='product-desc'>{props?.props.description || 'No description for this product.'}</p>
          </div>
      </article>
    </Link>
  )
}

export default Product