import React, { useState } from 'react'
import { useParams } from 'react-router'
// HOOKS
import { useFetchProduct } from '../../infrastructure/API/queries/useFetchProduct'

function ProductPage() {
    let { productId:id } = useParams()

    // INITIAL PARAMS
    const [activeGallery, setActiveGallery] = useState(false)
    const [activeImage, setActiveImage] = useState<string | undefined>()
    const [activeIndex, setActiveIndex] = useState(0)

    // ON ESC CLOSE MODAL
    window.addEventListener('keydown', (e) => {
        if(e.keyCode === 27){
            setActiveGallery(false)
        }
    })

    const { data, isFetching, isLoading } = useFetchProduct('product',`${id}`)

    if(isFetching || isLoading){
        return <section style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100vh'}}><h1 style={{display:'flex', alignItems:'center'}}>Loading product! {/*<ion-icon name="hourglass-outline"></ion-icon>*/}</h1></section>
    }

    const product = data?.data
    const slides = product?.images

    
    // --
    const handleGallery = () => {
        setActiveGallery(false)
    }

    const handleImage = (e:any, id:number) => {
        setActiveIndex(slides.indexOf(slides[id]))
        setActiveGallery(true)
        setActiveImage(slides[activeIndex])
    }

    const handleImageNav = (e:any) => {
        let type = e.currentTarget.dataset.nav
        
        if(type === 'next'){
            if(activeIndex === slides.length - 1){
                setActiveIndex(0)
                return setActiveImage(slides[0])
            }

            setActiveIndex(prevIndex => prevIndex + 1)
            setActiveImage(slides[activeIndex + 1])
        }
        
        if(type === 'prev'){
            if(activeIndex <= 0){
                setActiveIndex(slides.length - 1)
                return setActiveImage(slides[slides.length - 1])
            }

            setActiveIndex(prevIndex => prevIndex - 1)
            setActiveImage(slides[activeIndex - 1])
        }
    }

    // COMPONENT
    return (
        <section className='product-page'>
            {activeGallery && 
                <div className='product-images'>
                    <div className="modal" onClick={handleGallery}></div>
                    <div className="images">
                        <div className="image-close" onClick={handleGallery}>
                            {/*<ion-icon name="close-circle"></ion-icon>*/}
                            {/* <span>{'x'}</span> */}
                            <p style={{fontSize:'1.5rem', padding:'.5rem', display:'flex', alignItems:'center'}}>✖</p>
                        </div>
                        <div data-nav='prev' onClick={handleImageNav} className="image-button image-prev">
                            {/*<ion-icon name="chevron-back-outline"></ion-icon>*/}
                            <p>◀</p>
                        </div>
                        <img src={activeImage} alt="" />
                        <div data-nav='next' onClick={handleImageNav} className="image-button image-next">
                            <p> ▶ </p>
                            {/*<ion-icon name="chevron-forward-outline"></ion-icon>*/}
                        </div>
                    </div>
                </div>
            }

            <div className="product-main">
                <div className="product-info">
                    <p>{product?.brand}</p>
                    <h2>{product?.title}</h2>
                    <div style={{marginTop:'.5rem'}} className="product-labels">
                        <p style={{display:'flex'}}>{/*<ion-icon name="star"></ion-icon>*/}{product?.rating}&nbsp;</p>
                        <p>{product?.category}</p>
                    </div>
                </div>
                <img src={product?.thumbnail} alt={product?.title} />
                <div className="product-price">
                    <div className="product-price-num">
                        <p>Price</p>
                        <h2>${product?.price}</h2>
                    </div>
                    <p className='discount'>-{product?.discountPercentage} %</p>
                </div>
            </div>

            <div className="product-desc">
                <h3 style={{display:'flex', alignItems:'center', fontSize:'1.4rem', fontWeight:'800'}}>About this product {/*<ion-icon name="arrow-forward-outline"></ion-icon>*/}</h3>
                <p style={{fontWeight:'400',fontSize:'.85rem' ,width:'100%'}}>{product?.description}</p>
            </div>

            {/* <p>Gallery</p> */}
            <div className="product-gallery">
                {product?.images.map((image:string, id:number) => {
                    return <img onClick={(e) => handleImage(e, id)} key={id} className='product-gallery-image' src={image} alt={image} />
                })}
            </div>
        </section>
    )
}

export default ProductPage