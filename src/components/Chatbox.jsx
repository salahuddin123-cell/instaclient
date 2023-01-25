import React,{useState,useEffect,useContext,useRef} from 'react'
import { useParams,useLocation } from 'react-router-dom'
import Header from './Header';
import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';
import { UserContext } from '../App';
// import socket.currentIO from 'socket.current.io-client';
// let socket.current;
import io from "socket.io-client";
import moment  from 'moment'

// const ENDPOINT="http://localhost:8000"
const Chatbox = () => {
 const {onlineusers,setonlineusers} =useContext(UserContext)
 const socket = useRef();
    const {user}=useParams()
    const location=useLocation()
    const {User}=location.state
    let me=(User.Name+user).split('').sort().join(',')
    // socket.current=socket.currentIO(ENDPOINT,{transports:['websocket.current']});
    const [id, setid] = useState('');
    const [messages,setmessages]=useState([])
    const [msg,setmsg]=useState('')
    const [msgsent, setmsgsent] = useState(false)
    const [active,setactive]=useState(false)
    const scrollToBottom = useScrollToBottom();
    const [sticky] = useSticky();
    const messageRef=useRef(null)

    useEffect(()=>{
      socket.current=io.connect("https://insta-salahuddin123-cell.onrender.com/")
    },[])

    useEffect(() => {
      console.log(me,user)
      //  const socket.current=socket.currentIO(ENDPOINT,{transports:['websocket.current']});
        socket.current.on('connect',()=>{
            //alert('connected');
            setid(socket.current.id);
          
              socket.current.emit('getname',{User})
           
           
              socket.current.emit('joined',{room:me,user:User.Name});
           
             
           
        })

        // socket.current.emit('joined',{me:me,name:User.Name});
     

    }, [me,socket.current,user]);

useEffect(() => {
 
  socket.current.on('member',(data)=>{
    setonlineusers(data)
    console.log(data)
   })
      //    socket.current.on('welcome',(data)=>{
      //     // setmessages([...messages,data]);
      //     console.log('ss'+data.user,data.message)
      //     console.log('welcome bro')
          
      // })
      // socket.current.on('alldata',(data)=>{

      //   console.log(data)
      // })
      // socket.current.on('userjoined',(data)=>{
      // // setmessages([...messages,data]);
      //     console.log(data.user,data.message)
      // })
      // socket.current.on('leave',(data)=>{
      // // setmessages([...messages,data]);
      //     console.log(data.user,data.message)
      // })
}, [socket.current,user])

useEffect(()=>{
messageRef.current.scrollIntoView()
},[messages])

useEffect(() => {
  socket.current.on('sendMessage',(data)=>{
    
     setmessages([...messages,data]);
      setmsgsent(!msgsent)
    
    console.log(messages);
     })
}, [msgsent,messages,msg])


useEffect(() => {
  fetch('https://insta-salahuddin123-cell.onrender.com/chat/all',{

   method:'get',
   headers:{
     'accept': 'application/json',
     'Access-Control-Allow-Origin': "*",
     'content-type': 'application/x-www-form-urlencoded',
     'Access-Control-Allow-Credentials': 'true',
 }
  } )
  .then(data=>data.json())
  .then(res=>{
  
    let filtered=res.filter(e=>e.room===me)
      
    setmessages(filtered)
  })
 

}, [me])

const send=()=>{
    let time=new Date().getTime()
  socket.current.emit('message',{msg,id,me,time});
 console.log(time)
  scrollToBottom()
  setmsg('')
  }

  const onlinestat=(elem)=>{
     
    if(onlineusers?.users2?.some(e=>e.user==elem)){
    
      return <span style={{color:'green'}}>●</span>
    }
}

  return (
    <div className="main">
    <Header />
    <hr/>
      <div className="chat">
    <div className='chatroom'>
    <div className="head"><h5>from {User.Name} to {user} {onlinestat(user)} </h5></div>
    <div className="chats">

    
    {messages?.map((item,i)=>{
        return <> {item.user!=User?.Name?  
         <div className='messag left'>
        <p>{item.user} :{item.message} <br />
        <span className='time'>{moment(item.time).format('MMMM-DD hh:mm a')}</span>
        </p> 
       
      </div>:<div className='messag right'>
      <p>{item.user} :{item.message} <br />
        <span className='time'>{moment(item.time).format('MMMM-DD hh:mm a')}</span>
        </p> 
        </div>}</>
    }
    
    
    )}
    <div ref={messageRef}/>    

    </div>
    <div className="input2">
        <form >
        <input id='input'  type="text" value={msg} onChange={(e)=>setmsg(e.target.value)} /><button className={`btn btn-primary`} onClick={(e)=>{e.preventDefault();send()}}  >send</button>
        </form>
       
    </div>
</div>
</div></div>
  )
}

export default Chatbox