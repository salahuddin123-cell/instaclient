import React, { useState, useEffect ,useContext} from "react";
import { LikeOutlined, DeleteOutlined,LikeFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";

import { styled } from '@mui/material/styles';
import { UserContext } from '../App'
import Tooltip,{ tooltipClasses }  from '@mui/material/Tooltip';
import toast, { Toaster } from 'react-hot-toast';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const SinglePost = ({ elem, User }) => {

  const {setaction,actions}=useContext(UserContext)
  const [comment, setcomment] = useState('');
  const [id, setid] = useState("");
  const [allliker, setalllikers] = useState(
   [...new Set(elem.Likers)]
  );
  const [liker, setliker] = useState(null)
  const [count, setcount] = useState([...new Set(allliker)].length);
  const [data, setdata] = useState([]);
  const [postuser, setpostuser] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [commented,setcommented]=useState(false)
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

 useEffect(()=>{
  const allikers= JSON.parse(localStorage.getItem(elem._id));
 const likers=[...new Set(allikers)]
 setliker(likers)
 
 },[count])

  const handleClick = (id) => {
    axios
    .put("https://insta-salahuddin123-cell.onrender.com/like/" + User._id, {
      
      Name2: User.Name,
      Id2: elem._id,
    })
    .then((res) => {
      if (res.status === 200) {
    
       console.log(res)
       setalllikers([...new Set(res.data)])
      } else Promise.reject();
    })
    .catch((err) => console.log(err));
   /*  
    setalllikers([...allliker, User.Name]);
    localStorage.setItem(id, JSON.stringify(allliker));
 
    let newarr = [...new Set([...allliker, User.Name])];
    setcount(newarr.length); */
  };

  useEffect(() => {
    setid(elem._id);
  }, []);

  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 50,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newarr = {
      User: User.Name || "anynomous",
      PostId: id,
      Comment: comment,
    };
    axios
      .post("https://insta-salahuddin123-cell.onrender.com/comment/new", newarr)
      .then((res) => {
        if (res.status === 200){
          setcommented(!commented) 
          console.info("comment created");
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
    setcomment("");
   

    // window.location.reload()
  };
  const deleteStudent = (id) => {
    axios
      .delete("https://insta-salahuddin123-cell.onrender.com/post/" + id)
      .then((res) => {
        if (res.status === 200) {
          toast.success('Post deleted successfully')
         setaction(!actions)
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  useEffect(() => {

    axios.post('https://insta-salahuddin123-cell.onrender.com/comment/all',{PostId:id})
    .then((res)=>{
      let jsondata=res?.data
      let updated =  jsondata?.filter((el) => {
        return el.PostId == id;
      });
      setdata(jsondata);
     
    }) .catch((error) => {
      console.warn(error);
    });

    // fetchdata();
  }, [id,commented]);

  useEffect(() => {
    axios
      .get("https://insta-salahuddin123-cell.onrender.com/users/" + User._id)
      .then((data) => {
        console.log(data.data.msg);
        const userdata = data.data.msg;
        setpostuser(userdata);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, []);

const LikedorNot=()=>{
  if(allliker.includes(User.Name)){
    return true
  }
}
 const likecheck=LikedorNot()

  return (
    <div className="post">
      <div className="upperPost">
        <Link to={`/userdetails/${elem.UserId}`}>
          <img
            style={{ width: "30px", height: "30px", borderRadius: "50%" }}
            src={`img/${elem.UserProfile}`}
            alt="nooo"
          />
          
        </Link>
        {elem.User === User.Name ? (
          <a style={{ border: "none" ,cursor:'pointer'}} onClick={() => deleteStudent(elem._id)}>
            <DeleteOutlined  />
          </a>
        ) : (
          ""
        )}
      </div>

      <div className="img-box">
        <img src={`images/${elem.Profile}`} alt="" />
      </div>
<div className="like">
<a style={{cursor:'pointer'}} onClick={() => handleClick(elem)}>
        {likecheck ?<LikeFilled />:<LikeOutlined className="like" />}
        
    </a>
    <a
         className="count"
         aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        >{allliker?.length}</a>  
</div>
  
      <div>
 
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorPosition={{ top: 200, center: 200 }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>
          {allliker?.map((e,i)=>{
           return <p className="likers" key={i}>{e}</p>
          })}
        </Typography>
      </Popover>
    </div>
      <p className="desc">
        <span className="author">{elem.User || "  "}</span>  <span className="postdesc">{"- "+elem.Description}</span>
      </p>
      <div className="comments">
        <p>Comments</p>
        {data
          ? data.map((elem) => {
              return (
                <>
                  <small className="U">{elem.User}</small>:<small className="C">{elem.Comment}</small> 
                 <br />
                </>
              );
            })
          : "no comments yet"}
      </div>
      <div className="comm">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="comment.."
            type="text"
            className="form-control cform "
            name="comment"
            onChange={(e) => setcomment(e.target.value)}
            value={comment || ""}
            required
          />
          <button type="submit" className="btn add  btn-primary">
            Add
          </button>
       
        </form>
      </div>
    </div>
  );
};

export default SinglePost;
