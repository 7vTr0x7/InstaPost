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

      if (!res.ok) throw new Error("Failed to edit post");

      const data = await res.json();
      if (data) {
        dispatch(editPost({ id: post._id, title, description }));
        toast.success("Post Edited");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-light rounded-3 shadow-lg p-4">
      <input
        value={title}
        type="text"
        className="form-control"
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="my-3">
        <textarea
          value={description}
          className="form-control"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-end gap-3">
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
