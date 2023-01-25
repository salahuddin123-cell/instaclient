import React, { useState, useEffect, useContext } from "react";
import { LikeOutlined, DeleteOutlined, LikeFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";

import { styled } from "@mui/material/styles";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import toast, { Toaster } from "react-hot-toast";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { UserContext } from "../../App";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SinglePostModal({
  open,
  handleClose,
  handleOpen,
  data,
}) {
  const elem = data?.elem;

  const [allliker, setalllikers] = useState([...new Set(data?.elem?.Likers)]);
  const { User, actions, setaction } = useContext(UserContext);
  const [comment, setcomment] = useState("");
  const [id, setid] = useState("");
  const [commented,setcommented]=useState(false)
  const [liker, setliker] = useState(null);
  const [count, setcount] = useState([...new Set(allliker)].length);
  const [data2, setdata2] = useState([]);
  const [postuser, setpostuser] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open2 = Boolean(anchorEl);

  useEffect(() => {
    const allikers = JSON.parse(localStorage.getItem(elem?._id));
    const likers = [...new Set(allikers)];
    setliker(likers);
  }, [count]);

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
    setid(elem?._id);
    setalllikers([...new Set(data?.elem?.Likers)]);
  }, [open]);



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
        if (res.status === 200) {
          setcommented(true)
          console.info("comment created");
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
    setcomment("");

    // window.location.reload()
  };


  useEffect(() => {

    axios.post('https://insta-salahuddin123-cell.onrender.com/comment/all',{PostId:id})
    .then((res)=>{
      let jsondata=res?.data
      let updated =  jsondata?.filter((el) => {
        return el.PostId == id;
      });
      setdata2(jsondata);
     
    }) .catch((error) => {
      console.warn(error);
    });

    // fetchdata();
  }, [id,commented]);

  useEffect(() => {
    axios
      .get("https://insta-salahuddin123-cell.onrender.com/users/" + User._id)
      .then((data2) => {
        console.log(data2.data.msg);
        const userdata2 = data2.data.msg;
        setpostuser(userdata2);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, []);

  const LikedorNot = () => {
    if (allliker.includes(User.Name)) {
      return true;
    }
  };
  const likecheck = LikedorNot();

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="post">
            <div className="img-box" style={{ height: "50%" }}>
              <img src={`/images/${elem?.Profile}`} alt={elem?.Profile} />
            </div>
            <div className="like">
              <a
                style={{ cursor: "pointer" }}
                onClick={() => handleClick(elem)}
              >
                {likecheck ? <LikeFilled /> : <LikeOutlined className="like" />}
              </a>
              <a
                className="count"
                aria-owns={open2 ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
              >
                {allliker?.length}
              </a>
            </div>
            <div>
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: "none",
                }}
                open={open2}
                anchorEl={anchorEl}
                anchorPosition={{ top: 200, center: 200 }}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Typography sx={{ p: 1 }}>
                  {allliker?.map((e, i) => {
                    return (
                      <p className="likers" key={i}>
                        {e}
                      </p>
                    );
                  })}
                </Typography>
              </Popover>
            </div>
            <p className="desc">
              <span className="author">{elem?.User || "  "}</span>{" "}
              <span className="postdesc">{"- " + elem?.Description}</span>
            </p>
            <div className="comments">
              {data2
                ? data2.map((elem) => {
                    return (
                      <>
                       
                        <small>
                        <small className="U">{elem?.User}</small>:<small className="C">{elem?.Comment}</small> 
                        </small>
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
                <button
                  type="submit"
                  style={{ marginLeft: "35%" }}
                  className="btn add  btn-primary"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
