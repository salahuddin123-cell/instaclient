import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FollowElement from "./FollowElement";
import { UserContext } from "../App";
import ChatModal from "./modals/ChatModal";

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const Follow = ({ User, follow }) => {
  const { setaction, actions,onlineusers,setonlineusers } = useContext(UserContext);
  const [users, setusers] = useState([]);
  const [isfollow, setisfollow] = useState(false);
  const [following, setfollowing] = useState([]);
  const [follower, setfollower] = useState([]);
  const [friend, setfriend] = useState([])
  const [filter, setfilter] = useState([]);
  const [modalState, setmodalState] = useState({ open: false });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);

  const handleClick2 = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick3 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose3 = () => {
    setAnchorEl2(null);
  };

  const open2 = Boolean(anchorEl2);
  const id2 = open2 ? 'simple-popover' : undefined;

  
  const handleClick4 = (event) => {
    setAnchorEl3(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl3(null);
  };

  const open3 = Boolean(anchorEl3);
  const id3 = open3 ? 'simple-popover' : undefined;

  useEffect(() => {
    fetch("https://insta-salahuddin123-cell.onrender.com/users/all")
      .then((responce) => responce.json())
      .then((data) => setusers(data))
      .catch((error) => console.log(error));
  }, []);

  const handleClick = (elem) => {
    axios
      .put("https://insta-salahuddin123-cell.onrender.com/register/" + User._id, {
        Name: elem.Name,
        Name2: User.Name,
        Id2: elem._id,
      })
      .then((res) => {
        if (res.status === 200) {
          setisfollow(!isfollow);
          setaction(!actions);
          console.log("successs");
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  useEffect(() => {
    fetch("https://insta-salahuddin123-cell.onrender.com/users/" + User?._id)
      .then((responce) => responce.json())
      .then((data) => {
        setfollowing(data?.msg?.Following);
        setfollower(data?.msg?.Follower);
     
        let friend=(data?.msg?.Following)?.filter(elem=>{
         return (data?.msg?.Follower)?.find(e=>e==elem)
        })
        setfriend(friend)
     
      })
      .catch((error) => {
        console.log(error);
      });
  }, [User, isfollow]);

  useEffect(() => {
    const filter = users?.filter((elem) => {
      return !following?.some((el) => {
        return elem.Name == el;
      });
    });
    const alfilt = filter?.filter((el) => el.Name !== User.Name);
    setfilter(alfilt);
  }, [following]);

  const handleOpen = () => {
    setmodalState({ open: true });
  };
  const handleClose = () => setmodalState({ open: false });


  return (
    <>
      <h5>People You may know</h5>
      <div className="other">
        <div className="alluser">
          {filter !== null
            ? filter.slice().map((elem) => {
                return (
                  <p>
                    {elem.Name} -
                    <button
                      id={elem._id}
                      onClick={() => handleClick(elem)}
                      className="btn small btn-sm btn-primary"
                    >
                      follow
                    </button>
                  </p>
                );
              })
            : "null"}
        </div>
        {/* <div>
          <h6>Following</h6>
          {following?.map((elem) => {
            return (
              <Link
                style={{ textDecoration: "none" }}
                to={`/friends/${elem}`}
                state={{ User: User }}
              >
                <p>{elem}</p>
              </Link>
            );
            //<a onClick={()=>{setmodalState({open:true,data:{user:elem}})}}  ><p>{elem}</p></a>
          })}
          <ChatModal
            handleOpen={handleOpen}
            handleClose={handleClose}
            open={modalState.open}
            User={User}
            {...modalState}
          />

        </div> */}
            <div>
      <a  onClick={handleClick4}>
       Friend({friend?.length})
      </a>
      <Popover
        id={id3}
        open={open3}
        anchorEl={anchorEl3}
        onClose={handleClose4}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
        {friend?.map((elem) => {
            return (
             
                <p className="frnd">{elem+' '}-
                 <small style={{padding:'2px 5px'}}> 
                 <Link
                style={{ textDecoration: "none" }}
                to={`/friends/${elem}`}
                state={{ User: User }}
              >
                message 
              </Link>
                  </small>
                  </p>
              
            );
    
          })}
        </Typography>
      </Popover>
    </div>
        <div>
      <a  onClick={handleClick2}>
       Following({following?.length})
      </a>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose2}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
        {following?.map((elem) => {
            return (
            
                <p className="follow">{elem}</p>
              
            );
    
          })}
        </Typography>
      </Popover>
    </div>
    <div>
      <a  onClick={handleClick3}>
       Follower({follower?.length})
      </a>
      <Popover
        id={id2}
        open={open2}
        anchorEl={anchorEl2}
        onClose={handleClose3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
        {follower?.map((elem) => {
            return (
            
                <p className="follower">{elem}</p>
            
            );
    
          })}
        </Typography>
      </Popover>
    </div>
      </div>
    </>
  );
};

export default Follow;
