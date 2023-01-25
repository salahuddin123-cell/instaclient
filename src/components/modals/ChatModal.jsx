import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
//import Header from "./Header";

// import socket.currentIO from 'socket.current.io-client';
// let socket.current;
import io from "socket.io-client";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { UserContext } from "../../App";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
//   width: 500,
 bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
};

export default function ChatModal({ open, handleClose, handleOpen, data,User }) {
  const socket = useRef(io.connect("https://insta-salahuddin123-cell.onrender.com"));
  const user  = data?.user;
  const location = useLocation();
  console.log(data,User)
//   const { User } = location.state;
let str= (User?.Name + data?.user)
 let me = typeof str==='string'&&str.split("").sort().join(",");
 console.log(str,me)
  // socket.current=socket.currentIO(ENDPOINT,{transports:['websocket.current']});
  const [id, setid] = useState("");
  const [messages, setmessages] = useState([]);
  const [msg, setmsg] = useState("");
  const [msgsent, setmsgsent] = useState(false);
  const messageRef=useRef(null)

  useEffect(() => {
    console.log(me,user)
    //  const socket.current=socket.currentIO(ENDPOINT,{transports:['websocket.current']});
      socket.current.on('connect',()=>{
          //alert('connected');
          setid(socket.current.id);
        
            socket.current.emit('getname',User?.name)
         
         
            socket.current.emit('joined',{room:me,user:User.Name});
         
          
         
      })

      // socket.current.emit('joined',{me:me,name:User.Name});
   

  }, [me,socket.current,user]);

useEffect(() => {

 
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
messageRef.current?.scrollIntoView()
},[messages])

useEffect(() => {
socket.current.on('sendMessage',(data)=>{
  setmessages([...messages,data]);
  console.log(messages);
   })
}, [msgsent,socket.current])


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
  console.log(res)
  const filtered=res.filter(e=>e.room===me&&me)
    
  setmessages(filtered)
})


}, [me])

const send=()=>{
  
socket.current.emit('message',{msg,id,me});
setmsgsent(!msgsent)

console.log(msg)
}
  return (
    <div className="main">
          <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

      {/* <Header /> */}
      <hr />
      <div className="">
        <div className="chatroom">
          <div className="head">
            <h5>
              from {User.Name} to {user}{" "}
            </h5>
          </div>
          <div className="chats">
            {messages.map((item, i) => {
              return (
                <>
                  {" "}
                  {item.user != me ? (
                    <div className="messag left">
                      <p>
                        {item.user} :{item.message}
                      </p>
                    </div>
                  ) : (
                    <div className="messag right">
                      <p>{item.message}</p>
                    </div>
                  )}
                </>
              );
            })}
             <div ref={messageRef}/> 
          </div>
          <div className="input2">
            <input
              id="input"
              type="text"
              value={msg}
              onChange={(e) => setmsg(e.target.value)}
            />
            <button onClick={send} className="send">
              send
            </button>
          </div>
        </div>
      </div>
      </Box>
      </Modal>
    </div>
    
  );
}
