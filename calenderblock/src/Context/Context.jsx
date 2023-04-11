import {createContext, useState } from "react";



export const context=createContext()

export const ContextProvider=({children})=>{
    let [light,setLight]=useState(true)
    function changecolor(){
        setLight(!light)
    }
return <context.Provider value={{light,changecolor,setLight}}>
{
    children
}

</context.Provider>
}