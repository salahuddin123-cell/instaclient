import React,{useState,useEffect,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
import axios from 'axios'
import Cookies from 'universal-cookie'
const Login = () => {
  const [data,setdata]=useState([])
  const [input,setInput]=useState([])
  //const [login, setlogin]=useState(false)
  const {actions,setaction}=useContext(UserContext)
  const cookies=new Cookies()

  let navigate = useNavigate();
  const changleHnadler=(e)=>{
      const name=e.target.name;
      const value=e.target.value;
      setInput(values =>({
          ...values, [name]:value
      }))
  }
  useEffect(() => {
    fetch('https://insta-salahuddin123-cell.onrender.com/users/all')
    .then(responce=>responce.json())
    .then(data=>setdata(data))
    .catch(error=>console.log(error))

   }, [])
  const HandleSubmit=async(e)=>{
    e.preventDefault();
    try {
      if(input.Email && input.Eassword){
       const res= await axios.post('https://insta-salahuddin123-cell.onrender.com/login',input)
       
       if (res.status===200){
        cookies.set('token',res.data.token||'')
          navigate('/home')
          setaction(!actions)
       }else{
        console.log(res)
       }
      }else{
        alert('Please fill the input')
       }
    } catch (error) {
      console.log(error)
    }
        

}
   



   
  return (
    <div className='login' >
    <form autoComplete='off'> 
<div class="mb-3">
<label  class="form-label">Email address</label>
<input type="email" onChange={changleHnadler} value={input.email} name="Email"  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

</div>
<div class="mb-3">
<label  class="form-label">Password</label>
<input type="password" onChange={changleHnadler} value={input.password} name="Eassword"   className="form-control" />
</div>

<button type="submit" onClick={HandleSubmit} class="btn btn-primary">Login</button><button onClick={()=>navigate('/')} className="btn btn-warning">Back</button>
</form>
</div>
  )
}

export default Login