import axios from 'axios'
import React from 'react'

const Test3 = () => {


  function  handl(e){
    axios.post("http://localhost:8080/upload/image",{
      
    })
  }
  return (
    <div>
        <form action="/profile" method="post" enctype="multipart/form-data">
        <input type="file" name="avatar" />
        <button onClick={handl}>Upload</button>
        
      </form>

    </div>
  )
}

export default Test3
