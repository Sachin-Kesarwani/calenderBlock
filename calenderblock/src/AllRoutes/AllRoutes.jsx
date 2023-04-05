import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Components/Home'
import Login from '../Signup_login/Login'
import Signup from '../Signup_login/Signup'
import TaskForm from '../Components/TaskForm'
import Dashboard from '../Components/dashboard'
import About from '../Pages/About'
import PrivateRoutes from '../Components/PrivateRoutes'

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/taskform' element={
        <PrivateRoutes>
 <TaskForm/>
        </PrivateRoutes>
       }/>
        <Route path='/about' element={<About/>} />
      </Routes>
    </div>
  )
}

export default AllRoutes
