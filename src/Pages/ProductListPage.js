import axios from 'axios';
import React, { useState,useEffect, useRef, useCallback } from 'react'
import Product from '../Components/Product'

function ProductListPage() {
  const [products,setProducts]=useState([]);
  const [hasMore,sethasMore]=useState(false)
  const [pageNumber,setPageNumber]=useState(1);
  const [loading,setLoading]=useState(false);
  const [noProducts,setNoProducts]=useState(true);
  const observer=useRef();
  const lastProductRef=useCallback(node=>{
     if(observer.current)
     observer.current.disconnect();
     observer.current=new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting && hasMore){
      setPageNumber(pageNumber=>pageNumber+1);
       }
     });
     if(node)
     {
     observer.current.observe(node);
     }
  },[hasMore])

    useEffect(()=>{
      getProducts();
      async function getProducts()
      {
        const result=await axios.get(`/user/api/products/${pageNumber}`).then(function(res){
          sethasMore(true);
           setLoading(true)
           setProducts([...products,...res.data.data]);
           console.log(hasMore)
        }).catch(err=>{
          console.log('came here')
          sethasMore(false);
          setLoading(false);
          setNoProducts(false);
        });
       
      
        return;
      }
      
    // console.log('hello');
    },[pageNumber])
    return (
     <>
     <div className='product-list' style={{ display:'flex',flexDirection:'column' ,marginBottom:'1rem'}}>
     {
      products.length>0?
      products.map((obj,index)=>{
        if(products.length===index+1)
        {
          return <div ref={lastProductRef}><Product sellingPrice={obj.sellingPrice} productName={obj.productName} regularPrice={obj.regularPrice} productDescription={obj.productDescription} productCategory={obj.productCategory} productImages={obj.productImages}></Product></div>
        }else{
         return <Product sellingPrice={obj.sellingPrice} productName={obj.productName} regularPrice={obj.regularPrice} productDescription={obj.productDescription} productCategory={obj.productCategory} productImages={obj.productImages}></Product>
        }}
    ):<div className='loader'></div>
     }
     </div>
    {
      loading===true?
     <div className='loader-new'></div>:
     <div></div>
    }
    {
      products.length===0 && noProducts===false?
      <div>No More products are available</div>:
      <div></div>
    }
    </>
  )
}

export default ProductListPage