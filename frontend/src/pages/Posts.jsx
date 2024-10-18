import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostCard from "./../components/PostCard";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const user = useSelector((state) => state.user.user);

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
    } catch (error) {
      console.log(error);
    }
  };

  console.log(posts);
  useEffect(() => {
    fetchPosts();
  }, []);

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
