import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CSVupload() {
  const [selectedFile,setSelectedFile]=useState(null);
  const [properFile,setProperFile]=useState(true);
  const [isFileAvailable,setisFileAvailable]=useState(true);
  const [uploaded,setUploaded]=useState(true);
  const [error,setError]=useState(true);

  async function handleSubmit()
{
    if(selectedFile==null)
    {
      setisFileAvailable(false);
    }
    else{
        setisFileAvailable(true);
        const formData=new FormData();
        formData.append('file',selectedFile);
        if(selectedFile.type==='text/csv')
        {
          console.log(selectedFile);
          setProperFile(true);
          const config = {     
            headers: { 'content-type': "multipart/form-data" }
        }
          const res=await axios({method:"post",url:"/file/api/file",data:formData,
          headers: { "Content-Type": "multipart/form-data" },
      }).then(result=>{
         setUploaded(false);
      }).catch(result=>{
         setError(false);
      });
          console.log(res,selectedFile);
        }
        else{
          setProperFile(false);
        }
    }
  }
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  }
  return (
    <>
    <h2 className='form-upload-heading'>Please Select A file to be Uploaded</h2>
    <div className='form-upload-section'>
    <input type={'file'} className='file-upload-input' onChange={handleFileSelect}/>
    <button type='submit' className='sumbit-button' onClick={handleSubmit}>Submit</button>
    </div>
    <h1 style={{ display:(isFileAvailable?'none':'block')}} className="error-check">
         Please Select a File to be uploaded
    </h1>
    <h1 style={{ display:(properFile?'none':'block')}} className="error-check">
      Please upload csv file only
    </h1>
    <h1 style={{ display:(uploaded?'none':'block')}} className="error-check">
      File is SuccessFully loaded Please Click products to view the products of your file
    </h1>
    <h1 style={{ display:(error?'none':'block')}} className="error-check">
      Their is some error while uploading the file please Try Again
    </h1>
<div className='link-to-products-container'>
<Link to="/products" className='link-to-products'>Products</Link>
</div>
  
    </>
  )
    
}

export default CSVupload