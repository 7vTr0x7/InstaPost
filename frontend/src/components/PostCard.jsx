import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { FaRegBookmark } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { removePost } from "../redux/slices/postSlice";

const PostCard = ({ post }) => {
  const [isFullText, setIsFullText] = useState(false);
  const [isOptionOpen, setIsOptionOpen] = useState(false);

  const dispatch = useDispatch();

  const deleteHandler = async (postId) => {
    try {
      const res = await fetch(`http://localhost:4000/api/post/${postId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        console.log("Failed to get posts");
      }

      const data = await res.json();
      console.log(data);
      if (data) {
        dispatch(removePost(postId));
        toast.success("Post Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-light  rounded-3 shadow-lg p-4">
      <div className="relative d-flex justify-content-between align-items-center">
        <div className="d-flex  align-items-center">
          <img
            alt={post.user.name}
            src={post.user.imageURL}
            className="img-fluid rounded-3"
            style={{ height: "40px" }}
          />
          <p className="m-0 px-3 fw-semibold">{post.user.name}</p>
        </div>
        {isOptionOpen && (
          <div
            className="absolute px-3 py-2 w-25 shadow-lg rounded-3 fw-semibold"
            style={{ right: "0px", top: "20px", cursor: "pointer" }}>
            <p className="m-0">Edit</p>
            <p className="m-0" onClick={() => deleteHandler(post._id)}>
              Delete
            </p>
          </div>
        )}
        <div onClick={() => setIsOptionOpen((prev) => !prev)}>
          {isOptionOpen ? (
            <p className="m-0" style={{ height: "30px", cursor: "pointer" }}>
              <RxCross2 />
            </p>
          ) : (
            <p className="m-0" style={{ height: "30px", cursor: "pointer" }}>
              <BsThreeDotsVertical />
            </p>
          )}
        </div>
      </div>

      <div>
        <p className="my-2 fw-semibold">{post.title}</p>
        <p className="my-2 ">
          <span>
            {isFullText ? post.description : post.description.slice(0, 30)}
          </span>
          <span
            className="px-2"
            style={{ fontSize: "12px", cursor: "pointer" }}
            onClick={() => setIsFullText((prev) => !prev)}>
            {!isFullText ? "show more" : "show less"}
          </span>
        </p>
      </div>
      <div>
        <img
          src={post.image}
          alt={post.title}
          className="img-fluid rounded-3 my-2"
          style={{ height: "200px", width: "100%", objectFit: "cover" }} // Adjust the height as needed
        />
      </div>
      <div
        className="d-flex justify-content-between align-content-center mt-2 "
        style={{ fontSize: "20px" }}>
        <div className="d-flex gap-3">
          <FaRegHeart />
          <FaRegComment />
          <RiShareForwardLine style={{ fontSize: "22px" }} />
        </div>
        <FaRegBookmark />
      </div>
      <Toaster />
    </div>
  );
};

export default PostCard;
