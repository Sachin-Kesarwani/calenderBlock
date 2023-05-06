import axios from 'axios';

function uploadImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      const binaryData = atob(dataUrl.split(',')[1]); // decode base64 data
      const arrayBuffer = new ArrayBuffer(binaryData.length);
      const view = new Uint8Array(arrayBuffer);
      for (let i = 0; i < binaryData.length; i++) {
        view[i] = binaryData.charCodeAt(i);
      }
      const blob = new Blob([arrayBuffer], { type: file.type }); // create binary blob
      const formData = new FormData();
      formData.append('image', blob);
      axios.post('/api/upload-image', formData)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    };
    reader.readAsDataURL(file);
  });
}

export function Test2() {
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const result = await uploadImage(file);
    console.log('Image uploaded:', result);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
}
