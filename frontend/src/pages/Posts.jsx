import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const user = useSelector((state) => state.user.user);

  const fetchPosts = async () => {
    try {
        const res = await fetch(`http://localhost:4000/api/posts`,{
            method:
        })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  return <div className="container my-5 d-flex justify-content-center"></div>;
};

export default Posts;
