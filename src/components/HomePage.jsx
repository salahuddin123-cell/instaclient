import React,{useState,useEffect,useContext} from 'react'

import { Link,useLocation } from 'react-router-dom'
import Follow from './Follow'
import Header from './Header'

import SinglePost from './SinglePost'
import axios from 'axios'
import { UserContext } from '../App'
const HomePage = ({allFollow}) => {
const location=useLocation()
const {actions,User,searchval,data,follows,setfollows}=useContext(UserContext)

const [follow,setfollow]=useState([]);
//const [follows,setfollows]=useState([]);
//const [data,setdata]=useState([]);
const [filtered,setFiltered]=useState(null)
const [buttonclick,setbuttonclick]=useState(1)
// const [allFollow,setAllfollow]=useState([]);
const [posts,setposts]=useState([])
  
useEffect(() => {
const data1=User.Following
const data2=data1?.concat(User.Name)
  setfollows(data2)
}, [User,actions])


 useEffect(()=>{
  const fetchdata=()=>{
  
          let arr=[]
          if(searchval!==null||''){
           
            data?.forEach((elem)=>{
              console.log(elem.User,searchval)
             if(elem.User.toLowerCase().search(searchval.toLowerCase())> -1) {
              arr.push(elem)
            
             }
            }
              )
            //  setposts(arr)
              const res =  arr?.filter(el => {
                return follows?.find((elem) => el?.User == elem)
             
               
              });
              if(res){
                setFiltered( res)
              }
            
          }else{
            setFiltered(data)
          }
          console.log(arr)
         
       
  }
  fetchdata()  
 },[actions,User,searchval,data])





  
  return (
    <>
 <div className="main">
     <Header />
     <hr/>
<div className="body">
<div className="body_left">
<div className="story">
<h3>Welcome to Instacity</h3>
</div>
<div className="content">
{data.length>0?filtered?.slice().reverse().map(elem=>{
    return <SinglePost User={User} elem={elem}/>
}):'loading...'}
</div>
</div>
<div className="body_right">
<div className="self">

</div>
<div>
<Follow setbuttonclick={setbuttonclick}  follow={follow} User={User}/>
</div>
 </div>
</div></div>
</>
  )
}

export default HomePage