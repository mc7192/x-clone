import React from "react";
import Post from "./Post";
import Image from "next/image";

const Comments = () => {
  return (
    <div>
      <form className="flex items-center justify-between gap-4 p-4">
        <Image
          src="/general/avatar.png"
          alt=""
          width={100}
          height={100}
          className="relative w-10 h-10 rounded-full overflow-hidden"
        />
        <input
          type="text"
          className="flex-1 bg-transparent outline-none p-2 text-xl"
          placeholder="Post your reply"
        />
        <button className="py-2 px-4 font-bold bg-white text-black rounded-full">
          Reply
        </button>
      </form>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Comments;
