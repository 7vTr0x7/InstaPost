import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "./../components/PostCard";
import { addPost } from "../redux/slices/postSlice";
import { TbCirclePlus } from "react-icons/tb";
import AddPost from "../components/AddPost";

const Posts = () => {
  const [isAddPostOpen, setIsAddPostOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const posts = useSelector((state) => state.posts.posts);

  const fetchPosts = async () => {
    try {
      const res = await fetch(
        `https://insta-post-backend.vercel.app/api/posts/user/${user?.userId}`
      );
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      dispatch(addPost(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [posts?.length]);

  const toggleAddPost = () => {
    setIsAddPostOpen((prev) => !prev);
  };

  return (
    <>
      <div className="d-flex justify-content-center text-center mt-5">
        <div
          className="w-25 bg-body-secondary py-2 rounded-2"
          onClick={toggleAddPost}>
          <TbCirclePlus style={{ fontSize: "30px" }} />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        {isAddPostOpen ? (
          <div className="my-3 container d-flex justify-content-center">
            <AddPost userId={user?.userId} close={setIsAddPostOpen} />
          </div>
        ) : (
          <div className="my-3 container row">
            {posts.length ? (
              posts.map((post) => (
                <div key={post._id} className="col-md-4 mb-3">
                  <PostCard post={post} />
                </div>
              ))
            ) : (
              <p className="my-4 fw-semibold text-center">Loading . . .</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Posts;
