import React, { useState } from "react";
import axios from "axios";

function ImageUploader() {
//   const [image, setImage] = useState(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("image", image);
// console.log(formData,image)
//     axios
//       .post("http://localhost:8080/users/update", formData)
//       .then((res) => console.log(res))
//       .catch((err) => console.log(err));
//   };

  // return (
  //   <form onSubmit={handleSubmit}>
  //     <input
  //       type="file"
  //       accept="image/*"
  //       onChange={(e) => setImage(e.target.files[0])}
  //     />
  //     <button type="submit">Upload</button>
  //   </form>
  // );

async function del(){
  let data={
    "email":"sachin@gmail.com",
    "password":"sachin"
  }
await axios({
  method:"post",
  url:"https://dark-pear-hare-tux.cyclic.app/api/data",
  data:data
}).then((res)=>{
  console.log("yes")
}).catch((er)=>{
  console.log(er)
})
  }
  return (
    <div>
      <button onClick={del}>Delete</button>
    </div>
  )
}

export default ImageUploader;
