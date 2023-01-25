import axios from 'axios'
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {EyeInvisibleFilled,EyeFilled} from '@ant-design/icons'
const Register = () => {
    
    const [file,setfile]=useState();
   const [name,setname]=useState('')
   const [email,setemail]=useState('')
   const [password,setpassword]=useState('')
   const [visible,setvisible]=useState(false)
       const navigate=useNavigate()
       const fileChange=(e)=>{
           setfile(e.target.files[0])
    
        console.log(e.target.files[0])
       }
       const handleSubmit=(e)=>{
        e.preventDefault();
        var fd=new FormData()
    
       
       fd.append("Name",name||'anynomous')
        fd.append("Email",email);
        fd.append("Password",password);
       
        fd.append("Dp",file);
       console.log(fd.values);
  

       axios.post(
        'https://insta-salahuddin123-cell.onrender.com/register/new',
            fd)
            .then(res => {
                if (res.status === 200)
               console.log('blog created')
                else
                Promise.reject()
            })
            .catch(err => alert('Something went wrong'))
        //     setFormValues('')
        navigate('/login')
       
    }

  return (
    <div className='form register' >
            <h4>Instacity</h4>
    <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete='off'>
    

      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Name</label>
        <input type="text" class="form-control" name='name' onChange={(e)=>setname(e.target.value)} value={name||''} required />
     
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email</label>
        <input type="text" class="form-control" name='email' onChange={(e)=>setemail(e.target.value)} value={email||''} required />
     
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Password</label>
        <input type={visible?'text':'password'} class="form-control" name='npasswordame' onChange={(e)=>setpassword(e.target.value)} value={password||''}  required/>
       {visible?<EyeFilled className='eye'onClick={()=>setvisible(!visible)}/>:<EyeInvisibleFilled className='eye'onClick={()=>setvisible(!visible)}/>} 
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Photo</label>
        <input type="file" name="file" id="file" onChange={fileChange} required/>
     
      </div>
     
      <button type="submit" class="btn btn-primary">Register</button><button onClick={()=>navigate('/login')} className="btn btn-warning">Login</button>
    </form>
            </div>
  )
}

export default Register