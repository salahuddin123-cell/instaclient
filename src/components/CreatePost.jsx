import axios from 'axios'
import React,{useState} from 'react'
import {useLocation, useNavigate ,useParams} from 'react-router-dom'
import Header from './Header'
const CreatePost = () => {
    const [description,setdescription]=useState('');
    const [file,setfile]=useState();
    // const [name,setname]=useState('');
    const location=useLocation()
    const {dp}=location.state;
    const {UserId}=location.state;
  
    const {user}=useParams();
  
       const navigate=useNavigate()
       const fileChange=(e)=>{
           setfile(e.target.files[0])
    
        console.log(e.target.files[0])
       }
       const handleSubmit=(e)=>{
        e.preventDefault();
        var fd=new FormData()
    
       
       fd.append("User",user||'anynomous')
       fd.append("UserId",UserId||'')
        fd.append("Description",description);
        fd.append("UserProfile",dp)
        fd.append("Dp",file);
       console.log(fd.values);
  

       axios.post(
        'https://insta-salahuddin123-cell.onrender.com/post/new',
            fd)
            .then(res => {
                if (res.status === 200)
               console.log('post created')
                else
                Promise.reject()
                console.log('not created')
            })
            .catch(err => alert('Something went wrong'))
        //     setFormValues('')
        navigate('/home')
       //  window.location.reload()
    }

  return (
    <div className="main">
     <Header />
     <hr/>
    <div className='form register' style={{width:"50%",margin:"auto",padding:"10px 10px"}}>
            
    <form onSubmit={handleSubmit} encType="multipart/form-data">
    

      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Description</label>
        <textarea type="text" class="form-control" name='Description' onChange={(e)=>setdescription(e.target.value)} value={description||''} id="exampleInputEmail1" aria-describedby="emailHelp" />
     
      </div>
  
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Photo</label>
        <input type="file" name="file" id="file" onChange={fileChange} />
     
      </div>
     
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
            </div></div>
  )
}

export default CreatePost