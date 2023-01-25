import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import Header from './Header'
const UpdateUser = () => {
    const [name,setname]=useState('')
    const [file,setfile]=useState();
    const [data,setdata]=useState('')
    const navigate=useNavigate()
    const {id}=useParams();


    const fileChange=(e)=>{
        setfile(e.target.files[0])
 
     console.log(e.target.files[0])
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        
        var fd=new FormData()
        fd.append("Name",name)
        fd.append("Dp",file);
        axios.put(
            'https://insta-salahuddin123-cell.onrender.com/users/'+id,
                fd)
                .then(res => {
                    if (res.status === 200)
                    console.log('Student successfully updated')
                    else
                    Promise.reject()
                })
                .catch(err => alert('Something went wrong'))
                setname('')
     
        navigate('/home')
    }
    useEffect(() => {
        axios.get("https://insta-salahuddin123-cell.onrender.com/users/"+id)
        .then(( data ) => {
          console.log(data.data.msg)
          const userdata=data.data.msg ;
          setdata(userdata)
         setname(userdata.Name)
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);
  return (
    <div className="main">
    <Header />
    <hr/>
    <div className='form register' style={{width:"50%",margin:"auto",padding:"10px 10px"}}>
            
    <form onSubmit={handleSubmit} encType="multipart/form-data">
    

      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Name</label>
        <input type="text" class="form-control" name='name' onChange={(e)=>setname(e.target.value)} value={name} autoComplete="off" />
     
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Photo</label>
        <input type="file" name="file" id="file" onChange={fileChange} /> 
     
      </div>
   
     
      <button type="submit" class="btn btn-primary">Update user</button>
    </form>
            </div></div>
  )
}

export default UpdateUser