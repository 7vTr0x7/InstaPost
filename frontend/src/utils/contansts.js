export const deleteHandler = async (postId) => {
  try {
    const res = await fetch(
      `https://insta-post-backend.vercel.app/api/post/${postId}`,
      {
        method: "DELETE",
      }
    );

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
