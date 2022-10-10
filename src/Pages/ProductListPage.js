import axios from 'axios';
import React, { useState,useEffect, useRef, useCallback } from 'react'
import Product from '../Components/Product'

function ProductListPage() {
  const [products,setProducts]=useState([]);
  const [hasMore,sethasMore]=useState(false)
  const [pageNumber,setPageNumber]=useState(1);
  const observer=useRef();
  const lastProductRef=useCallback(node=>{
     if(observer.current)
     observer.current.disconnect();
     observer.current=new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting && hasMore===true){
      setPageNumber(pageNumber=>pageNumber+1);
      }
     })
     if(node)
     observer.current.observe(node);
  },[hasMore])

    useEffect(()=>{
      getProducts();
      async function getProducts()
      {
       // sethasMore(false);
        const res=await axios.get(`http://localhost:8000/user/api/products/${pageNumber}`)
        console.log(res.data.data);
        if(res.status===200)
        {
          sethasMore(res.data.data.length>0);
          
          setProducts([...products,...res.data.data]);
          console.log(hasMore)
        }
        return;
      }
      
     console.log('hello');
    },[pageNumber,hasMore])
    return (
     <>
     <div className='product-list' style={{ display:'flex',flexDirection:'column' }}>
     {
      products.length>0?
      products.map((obj,index)=>{
        if(products.length===index+1)
        {
          return <div ref={lastProductRef}><Product  sellingPrice={obj.sellingPrice} productName={obj.productName}></Product></div>
        }else{
         return <Product sellingPrice={obj.sellingPrice} productName={obj.productName} regularPrice={obj.regularPrice} productDescription={obj.productDescription} productCategory={obj.productCategory} productImages={obj.productImages}></Product>
        }}
    ):<p></p>
     }
     </div>
    </>
  )
}

export default ProductListPage