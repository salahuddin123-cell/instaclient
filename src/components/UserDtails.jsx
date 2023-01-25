import React, { useState, useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import SinglePostModal from "./modals/Singlepostmodal";
import { UserContext } from "../App";

const UserDtails = () => {
  const { id } = useParams();
  //const [data, setdata] = useState([]);
  const [filtered, setfiltered] = useState([]);
  const [modalState, setmodalState] = useState({open:false});
  const { data } = useContext(UserContext);

  const [Users, setUser] = useState(null);
  useEffect(() => {
    const fetchdata1 = () => {
      fetch("https://insta-salahuddin123-cell.onrender.com/users/" + id)
        .then((responce) => responce.json())
        .then((data) => setUser(data.msg));
    };

    fetchdata1();
   // fetchdata();
  }, [id]);
  useEffect(() => {
    const filtered = data?.filter((elem) => {
      return elem.UserId === id;
    });
    setfiltered(filtered);
  }, [data,id]);

  const handleOpen = () =>{
    setmodalState({open:true});
  } 
  const handleClose = () => setmodalState({open:false});

  return (
    <div className="main">
      <Header />
      <hr />
      <p >{Users?.Name}</p>
      <SinglePostModal handleOpen={handleOpen} handleClose={handleClose} open={modalState.open} {...modalState}/>

      <img className="userprofile" src={`/img/${Users?.Profile}`} alt="sss" />
      <p>
        Following : {"  " + Users?.Following?.length + " "} Follower:
        {"  " + Users?.Follower?.length + " "} Post :
        {"  " + filtered?.length + "  "}
      </p>
      <h3>Posts</h3>
      <div className="imgs">
        {filtered?.map((elem) => {
          return <img  onClick={()=>{setmodalState({open:true,data:{elem}})}} src={`/images/${elem.Profile}`} alt="" />;
        })}
      </div>
    </div>
  );
};

export default UserDtails;
