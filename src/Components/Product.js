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
      <div className='image-container'>
      {
        props.productImages?
      <img className='product-image' src={props.productImages}></img>:
      <h3>No Image Found</h3>
      }
      </div>
     <div className='product-description-area'>
     <h3 >Name: {props.productName}</h3>
      {
        props.productDescription===undefined?
        <p>description: No description Available</p>:
      <p>description: {props.productDescription}</p>
      }
     
      {
      props.sellingPrice===undefined || props.sellingPrice===props.regularPrice?

      <p className='empty'></p>
      :<p>Selling Price: {props.sellingPrice}</p>
      }
      {
        props.regularPrice===undefined?
        <p className='empty'></p>:
       <p>Regular Price: {props.regularPrice}</p>
      }
      {
      props.productCategory===undefined?
      <p className='empty'></p>:
      <p>Category: {props.productCategory}</p>
      }
     </div>
    </div>
  )
}

export default Product