import React, { useEffect, useState } from 'react';

function CSVupload() {
  const [selectedFile,setSelectedFile]=useState(null);
  const [isFileAvailable,setisFileAvailable]=useState(true);

  const handleSubmit= () => {

    if(selectedFile==null)
    {
      setisFileAvailable(false);
    }
    else{
        setisFileAvailable(true);
        const formData=new FormData();
        formData.append('File',selectedFile);
    }
    

  }
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  }
  return (
    <>
    <div className='form-upload-section' style={{ display:'flex',height:'100vh',width:'100vw',justifyContent:'center',alignItems:'center'}}>
    <input type={'file'} className='file-upload-input' onChange={handleFileSelect}/>
    <button type='submit' className='sumbit-button' onClick={handleSubmit}>Submit</button>
    </div>
    <h1 style={{ display:(isFileAvailable?'none':'block'),color:'Black',width:'10vw',height:'10vh'  }}>
         Please Select a File to be uploaded
    </h1>
    </>
  )
    
}

export default CSVupload