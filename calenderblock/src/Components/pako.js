import pako from 'pako';

function reduceBase64(base64String) {
  const data = atob(base64String);
  const uint8Array = new Uint8Array(data.length);

  for (let i = 0; i < data.length; i++) {
    uint8Array[i] = data.charCodeAt(i);
  }

  const compressedData = pako.deflate(uint8Array);
  const compressedBase64String = btoa(String.fromCharCode.apply(null, compressedData));
  
  return compressedBase64String;
}

export default reduceBase64;
