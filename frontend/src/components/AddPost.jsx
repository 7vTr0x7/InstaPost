import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { FaRegImage } from "react-icons/fa";
import { addNewPost } from "../redux/slices/postSlice";

const AddPost = ({ userId, close }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [imageURL, setImageURL] = useState(null);

  const dispatch = useDispatch();

  const addPostHandler = async () => {
    try {
      const res = await fetch(
        `https://insta-post-backend.vercel.app/api/post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: userId,
            image: imageURL,
            title,
            description,
          }),
        }
      );

      if (!res.ok) {
        console.log("Failed to get posts");
      }

      const data = await res.json();
      console.log(data);
      console.log({ image: imageURL, title, description });

      if (data) {
        dispatch(addNewPost(data));
        toast.success("Post Uploaded");
        close(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = async (e) => {
    setIsLoading(true);
    const file = e.target.files[0];
    if (!file) return;
    toast.success("Please Wait ...");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "fww4myo8");
    formData.append("cloud_name", "dbzzejye6");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dbzzejye6/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setImageURL(data.url);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div
      className="bg-light   rounded-3 shadow-lg p-4 "
      style={{ width: "400px" }}>
      {isLoading && (
        <p className="fw-semibold text-center">Loading image ...</p>
      )}
      {imageURL && (
        <div>
          <img
            src={imageURL}
            alt="image"
            className="img-fluid rounded-3 my-2"
            style={{ height: "200px", width: "100%", objectFit: "cover" }}
          />
        </div>
      )}
      <div>
        <input
          value={title}
          type="text"
          required={true}
          className="form-control"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="my-3">
        <textarea
          value={description}
          type="text"
          required={true}
          placeholder="Description"
          className="form-control"
          onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>
      <div className="d-flex align-content-center justify-content-between  ">
        <div>
          <label htmlFor="image-upload">
            <FaRegImage style={{ fontSize: "23px", cursor: "pointer" }} />
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>
        <div className="d-flex gap-3">
          <button
            className="btn btn-light shadow-lg fw-semibold"
            onClick={addPostHandler}>
            Add
          </button>
          <button
            className="btn btn-light shadow-lg fw-semibold"
            onClick={() => close(false)}>
            Cancel
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AddPost;
