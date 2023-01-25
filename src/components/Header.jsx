import React,{useState,useEffect,useContext} from 'react'
import {HomeOutlined,PlusSquareOutlined,LikeOutlined} from '@ant-design/icons'
import { Link,useLocation ,useNavigate} from 'react-router-dom'
import { UserContext } from '../App'
import Cookies from 'universal-cookie'
const Header = () => {
 
  const navigate=useNavigate()
  const {User,setsearchval,searchval}=useContext(UserContext)
  const cookies=new Cookies()
  const handleLogout=()=>{
   
    cookies.remove('token')
     navigate('/login')
  }
  const token=cookies.get('token')
  useEffect(() => {
    if(!token){
      navigate('/login')
    }
  }, [token])
  

  return (
    <div className="header"  style={{color:"black"}}>
<nav className="navbar navbar-light  navbar-expand-lg ">
  <div className="container-fluid insta">
    <b className="navbar-brand" >Instacity</b>

    <form className="d-flex search " role="search">
        <input className="form-control " value={searchval} onChange={(e)=>setsearchval(e.target.value)} placeholder="Search" aria-label="Search"/>
      
      </form>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to='/home' className="nav-link active" aria-current="page" >
          <HomeOutlined style={{ fontSize: '32px', color: '#black' }} />
          </Link>
        </li>
        <li className="nav-item">
          <Link to={`/addpost/${User?.Name||''}`} state={{dp:User?.Profile,UserId:User?._id}} className="nav-link active" aria-current="page">
          <PlusSquareOutlined  style={{ fontSize: '32px', color: '#black' ,marginLeft:'60px'}} />
          </Link>
        </li>
        <li className="nav-item">
        <Link to={`/userdetails/${User._id}`}>
          <a className="nav-link active" style={{marginLeft:"60px"}} aria-current="page" >{User.Name||''}</a>
          </Link>
        </li>
        <li className="nav-item">
       <Link to={`/useredit/${User?._id}`}> <img style={{width:'30px',borderRadius:'50%',marginLeft:'20px'}} src={`/img/${User?.Profile}`} /></Link> 
        </li>
        <li className="nav-item">
        <a style={{cursor:'pointer',margin:"0 10px"}} onClick={handleLogout}>Logout</a>
        </li>
      </ul>

    </div>
  </div>
</nav>
</div>
  )
}

export default Header