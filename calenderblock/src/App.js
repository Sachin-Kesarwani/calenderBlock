import logo from './logo.svg';
import './App.css';
import { Button } from '@chakra-ui/react';
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
import Test7 from './Components/Test7';
import HomePage from './Components/Test8';
import axios from 'axios';
import Chat from './Components/TestChat';
import Google from './Components/TestChat';
// import Test7 from './Components/Test8';





function App() {


  function handlesubmit(e){
    e.preventDefault()
   console.log(e.target.value)
  }
  
  return (
    <div className="App">

     <Home/>
     <AllRoutes/>
   <Google/>
    </div>
  );
}

export default App;
