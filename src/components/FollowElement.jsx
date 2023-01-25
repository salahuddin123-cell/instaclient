import React,{useState,useEffect} from 'react'
import axios from 'axios'

const FollowElement = ({elem,handleClick}) => {
  
    
    const [isfollow,setisfollow]=useState(false)
  return (
    <>
    <p>{elem.Name} -<button id={elem._id} onClick={(e)=>{handleClick(elem,e) ;setisfollow(!isfollow)}} className='btn btn-sm btn-primary'>{!isfollow?'follow':'following'}</button></p>
    </>
  )
}

export default FollowElement