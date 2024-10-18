import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { FaRegBookmark } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { removePost } from "../redux/slices/postSlice";
import EditPost from "./EditPost";

const PostCard = ({ post }) => {
  const [isFullText, setIsFullText] = useState(false);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const dispatch = useDispatch();

  const deleteHandler = async (postId) => {
    try {
      const res = await fetch(
        `https://insta-post-backend.vercel.app/api/post/${postId}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Failed to delete post");

      const data = await res.json();
      if (data) {
        dispatch(removePost(postId));
        toast.success("Post Deleted");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleEdit = () => {
    setIsOptionOpen(false);
    setIsEditOpen((prev) => !prev);
  };

  return (
    <>
      {isEditOpen ? (
        <EditPost editHandler={toggleEdit} post={post} />
      ) : (
        <div className="bg-light rounded-3 shadow-lg p-4">
          <div className="position-relative d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img
                alt={post.user.name}
                src={post.user.imageURL}
                className="img-fluid rounded-3"
                style={{ height: "40px" }}
              />
              <p className="m-0 px-3 fw-semibold">{post.user.name}</p>
            </div>
            <div onClick={() => setIsOptionOpen((prev) => !prev)}>
              <p
                className="m-0"
                style={{ fontSize: "20px", cursor: "pointer" }}>
                {isOptionOpen ? <RxCross2 /> : <BsThreeDotsVertical />}
              </p>
            </div>

            {isOptionOpen && (
              <div
                className="px-3 py-2 w-25 shadow-lg rounded-3 fw-semibold position-absolute"
                style={{
                  right: "0",
                  top: "40px",
                  backgroundColor: "#fff",
                  zIndex: 100,
                }}>
                <p className="m-0" onClick={toggleEdit}>
                  Edit
                </p>
                <p className="m-0" onClick={() => deleteHandler(post._id)}>
                  Delete
                </p>
              </div>
            )}
          </div>

          <div>
            <p className="my-2 fw-semibold">{post.title}</p>
            <p className="my-2">
              <span>
                {isFullText ? post.description : post.description.slice(0, 30)}
              </span>
              {post.description.length > 30 && (
                <span
                  className="px-2"
                  style={{ fontSize: "12px", cursor: "pointer" }}
                  onClick={() => setIsFullText((prev) => !prev)}>
                  {!isFullText ? "show more" : "show less"}
                </span>
              )}
            </p>
          </div>
          <div>
            <img
              src={post.image}
              alt={post.title}
              className="img-fluid rounded-3 my-2"
              style={{ height: "200px", width: "100%", objectFit: "cover" }}
            />
          </div>
          <div
            className="d-flex justify-content-between align-content-center mt-2"
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
      )}
    </>
  );
};

export default PostCard;
