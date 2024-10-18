import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { FaRegBookmark } from "react-icons/fa6";

const PostCard = ({ post }) => {
  const [isFullText, setIsFullText] = useState(false);

  return (
    <div className="bg-light rounded-3 shadow-lg p-4">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex  align-items-center">
          <img
            alt={post.user.name}
            src={post.user.imageURL}
            className="img-fluid rounded-3"
            style={{ height: "40px" }}
          />
          <p className="m-0 px-3 fw-semibold">{post.user.name}</p>
        </div>
        <BsThreeDotsVertical />
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
    </div>
  );
};

export default PostCard;
