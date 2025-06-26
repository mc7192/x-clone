"use client";
import Comments from "@/app/components/Comments";
import Post from "@/app/components/Post";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <div className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 z-10 bg-[#00000084]">
        <Link href="/">
          <Image src="/icons/back.svg" alt="back" width={24} height={24} />
        </Link>
        <h1 className="font-bold text-lg">Post</h1>
      </div>
      <Post type="status" />
      <Comments />
    </div>
  );
};

export default page;
