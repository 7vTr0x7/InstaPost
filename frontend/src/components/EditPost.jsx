import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { editPost } from "../redux/slices/postSlice";

const EditPost = ({ editHandler, post }) => {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);

  const dispatch = useDispatch();

  const editPostHandler = async () => {
    try {
      const res = await fetch(
        `https://insta-post-backend.vercel.app/api/post/${post._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description }),
        }
      );

      if (!res.ok) {
        console.log("Failed to get posts");
      }

      const data = await res.json();
      if (data) {
        dispatch(editPost({ id: post._id, title, description }));
        toast.success("Post Edited");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-light   rounded-3 shadow-lg p-4">
      <div>
        <input
          value={title}
          type="text"
          className="form-control"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="my-3">
        <textarea
          value={description}
          type="text"
          className="form-control"
          onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>
      <div className="d-flex align-content-center justify-content-end gap-3 ">
        <button
          className="btn btn-light shadow-lg fw-semibold"
          onClick={editPostHandler}>
          Edit
        </button>
        <button
          className="btn btn-light shadow-lg fw-semibold"
          onClick={editHandler}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditPost;
