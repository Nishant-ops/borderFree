import React, { useEffect, useState } from 'react'
import './Products.css';
function Product(props) {
  const [sell,setSell]=useState(false);
  useEffect(()=>{
    if(props.sellingPrice!==undefined)
    {
      setSell(true);
    }
  },[props.sellingPrice])
  
  return (
    <div className='productCard'>
      <img className='product-image' src={props.productImages}></img>
     <div className='product-description-area'>
     <h3 >{props.productName}</h3>
      {
        props.productDescription===undefined?
        <p className='empty'></p>:
      <p>{props.productDescription}</p>
      }
      {
        sell===false?
      <p>{props.regularPrice}</p>:
      <p>{props.regularPrice}</p>
      }
      {
      props.sellingPrice===undefined?

      <p className='empty'></p>
      :<p>{props.sellingPrice}</p>
      }
      <p>{props.productCategory}</p>
     </div>
    </div>
  )
}

export default Product