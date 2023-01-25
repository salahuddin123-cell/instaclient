import "./App.css";
import React, { useState, useEffect, createContext, useContext } from "react";
import UpdateUser from "./components/UpdateUser";
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import Login from "./components/Login";
import CreatePost from "./components/CreatePost";
import UserDtails from "./components/UserDtails";
import Header from "./components/Header";
import Chatbox from "./components/Chatbox";
import jwt_decode from 'jwt-decode'
import Cookies from 'universal-cookie'
// let socket;
import io from "socket.io-client";


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
const socket = io.connect("https://insta-salahuddin123-cell.onrender.com/");

export const UserContext = createContext();
function App() {
  const [allFollow, setAllfollow] = useState([]);

  const [data, setdata] = useState([]);
  const [allPost, setAllPost] = useState([]);
  const [actions, setaction] = useState(false)
  const [User, setUser] = useState('');
  const [searchval,setsearchval]=useState(null)
  const [follows,setfollows]=useState(null);
  const [onlineusers,setonlineusers]=useState(null)
  const cookies = new Cookies()
  const tokens = cookies.get("token")



  useEffect(() => {
    try {

      const user = jwt_decode(tokens)
      const fetchData = async () => {
        if (user?.id) {
          await fetch('https://insta-salahuddin123-cell.onrender.com/users/' + user.id)
            .then(responce => responce.json())
            .then(data => setUser(data.msg))
        }
      }
      fetchData()

    } catch (error) {
      console.log(error)
    }

  }, [actions, tokens])

  useEffect(() => {
    if(tokens){
      const fetchdata1 = () => {
        fetch("https://insta-salahuddin123-cell.onrender.com/follow/all")
          .then((responce) => responce.json())
          .then((data) => setAllfollow(data));
      };
      fetchdata1();
    }
    

  }, [tokens]);

  useEffect(() => {
    const fetchdata = async() => {
      axios.post("https://insta-salahuddin123-cell.onrender.com/post/all",{following:follows})
    .then((res)=>{
      let jsondata=res?.data
 
      setdata(jsondata);
     
    }) .catch((error) => {
      console.warn(error);
    });

    };
    fetchdata();
    
  }, [actions, tokens,searchval,follows])


  useEffect(() => {
    console.log(allFollow.length > 0 ? allFollow : "nill");
  }, []);
  return (
    <div className="App">
      <UserContext.Provider value={{ data,searchval,setsearchval,setfollows,follows, setaction, actions, User, socket,onlineusers,setonlineusers }}>
        <Router>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/Home"
              element={
                <HomePage
                  data={data}
                  allFollow={allFollow.length > 0 ? allFollow : []}
                />
              }
            />
            <Route path="/useredit/:id" element={<UpdateUser />} />
            <Route path="/userdetails/:id" element={<UserDtails />} />
            <Route path="/friends/:user" element={<Chatbox />} />
            <Route path="/addpost/:user" element={<CreatePost />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
