"use client";
import Post from "./Post";
import Image from "next/image";
import { Post as PostType } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { useActionState } from "react";
import { addComment } from "../lib/actions";
type CommentsWithDetails = PostType & {
  user: { displayName: string | null; username: string; img: string | null };
  _count: { likes: number; rePosts: number; comments: number };
  likes: { id: number }[];
  rePosts: { id: number }[];
  saves: { id: number }[];
};

const Comments = ({
  comments,
  postId,
  username,
}: {
  comments: CommentsWithDetails[];
  postId: number;
  username: string;
}) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [state, formAction, isPending] = useActionState(addComment, {
    success: false,
    error: false,
  });

  return (
    <div>
      {user && (
        <form
          className="flex items-center justify-between gap-4 p-4"
          action={formAction}
        >
          <Image
            src={user?.imageUrl || "/general/noProfile.webp"}
            alt=""
            width={100}
            height={100}
            className="relative w-10 h-10 rounded-full overflow-hidden"
          />
          <input type="number" name="postId" hidden readOnly value={postId} />
          <input type="text" name="username" hidden readOnly value={username} />
          <input
            type="text"
            name="desc"
            className="flex-1 bg-transparent outline-none p-2 text-xl"
            placeholder="Post your reply"
          />
          <button
            disabled={isPending}
            className="py-2 px-4 font-bold bg-white text-black rounded-full disabled:cursor-not-allowed disabled:bg-slate-200"
          >
            {isPending ? "Replying" : "Reply"}
          </button>
        </form>
      )}
      {state.error && (
        <span className="text-red-300 p-4">Something went wrong!</span>
      )}
      {comments.map((comment) => (
        <div key={comment.id}>
          <Post post={comment} type="comment" />
        </div>
      ))}
    </div>
  );
};

export default Comments;
