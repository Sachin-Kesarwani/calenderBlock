import logo from './logo.svg';
import './App.css';

import AllRoutes from './AllRoutes/AllRoutes';
import PrivateRoutes from './Components/PrivateRoutes';
import Home from './Components/Home';
// import ImageUploader from './Components/Test';
import Upload from './Components/Test';
import { Test2 } from './Components/Test2';
import Test3 from './Components/Test3';
import Rating from './Components/Rating';
// import SpeakerTest from './Components/Test3';
import Alarm from './Components/Test3';
import { Image } from '@chakra-ui/react';
import UploadImage from './Components/Test4';
import Camera from './Components/Test5';
import SpeechToText from './Components/Test6';





function App() {


  function handlesubmit(e){
    e.preventDefault()
console.log(e.target.value)
  }
  return (
    <div className="App">

     <Home/>
     <AllRoutes/>
    </div>
  );
}

export default App;
