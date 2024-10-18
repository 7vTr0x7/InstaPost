import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "./../components/PostCard";
import { addPost } from "../redux/slices/postSlice";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const allPosts = useSelector((state) => state.posts.posts);

  const fetchPosts = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/posts/user/${user?.userId}`
      );

      if (!res.ok) {
        console.log("Failed to get posts");
      }

      const data = await res.json();
      setPosts(data);
      dispatch(addPost(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [allPosts?.length]);

  return (
    <div className="d-flex justify-content-center">
      <div className=" my-5 container row">
        {posts &&
          posts.map((post) => (
            <div key={post._id} className="col-md-4 mb-3">
              <PostCard post={post} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Posts;
