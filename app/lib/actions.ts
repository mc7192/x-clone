"use server";

import { auth } from "@clerk/nextjs/server";
import { imageKit } from "./server/imageKit";
import { prisma } from "@/prisma/client";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { UploadResponse } from "@imagekit/next";

export const followUser = async (targetUserId: string) => {
  const { userId } = await auth();
  if (!userId) return;

  const existingFollow = await prisma.follow.findFirst({
    where: {
      followerId: userId,
      followingId: targetUserId,
    },
  });

  if (existingFollow) {
    await prisma.follow.delete({
      where: { id: existingFollow.id },
    });
  } else {
    await prisma.follow.create({
      data: { followerId: userId, followingId: targetUserId },
    });
  }
};

export const likePost = async (postId: number) => {
  const { userId } = await auth();
  if (!userId) return;

  const existingLike = await prisma.like.findFirst({
    where: {
      userId: userId,
      postId: postId,
    },
  });
  if (existingLike) {
    await prisma.like.delete({
      where: { id: existingLike.id },
    });
  } else {
    await prisma.like.create({
      data: { userId, postId },
    });
  }
};

export const rePost = async (postId: number) => {
  const { userId } = await auth();
  if (!userId) return;

  const existingRepost = await prisma.post.findFirst({
    where: {
      userId: userId,
      rePostId: postId,
    },
  });
  if (existingRepost) {
    await prisma.post.delete({
      where: { id: existingRepost.id },
    });
  } else {
    await prisma.post.create({
      data: { userId, rePostId: postId },
    });
  }
};
export const savePost = async (postId: number) => {
  const { userId } = await auth();
  if (!userId) return;

  const existingSave = await prisma.savedPosts.findFirst({
    where: {
      userId: userId,
      postId: postId,
    },
  });
  if (existingSave) {
    await prisma.savedPosts.delete({
      where: { id: existingSave.id },
    });
  } else {
    await prisma.savedPosts.create({
      data: { userId, postId },
    });
  }
};

export const addComment = async (
  prev: { success: boolean; error: boolean },
  formData: FormData
): Promise<{ success: boolean; error: boolean }> => {
  const { userId } = await auth();
  if (!userId) return { success: false, error: true };

  const desc = formData.get("desc");
  const postId = formData.get("postId");
  const username = formData.get("username");

  const Comment = z.object({
    parentPostId: z.number(),
    desc: z.string().max(140),
  });

  const validatedFields = Comment.safeParse({
    parentPostId: Number(postId),
    desc,
  });

  if (!validatedFields.success) return { success: false, error: true };

  try {
    await prisma.post.create({ data: { ...validatedFields.data, userId } });
    revalidatePath(`/${username}/status/${postId}`);
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const addPost = async (
  prev: { success: boolean; error: boolean },
  formData: FormData
): Promise<{ success: boolean; error: boolean }> => {
  const { userId } = await auth();
  if (!userId) return { success: false, error: true };

  const desc = formData.get("desc");
  const file = formData.get("file") as File;
  const isSensitive = formData.get("isSensitive") as string;
  const imgType = formData.get("imgType");

  const uploadFile = async (file: File): Promise<UploadResponse> => {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const transformation = `w-600,${
      imgType === "square" ? "ar-1-1" : imgType === "wide" ? "ar-16-9" : ""
    }`;
    return new Promise((resolve, reject) => {
      imageKit.upload(
        {
          file: buffer,
          fileName: file.name,
          folder: "/posts",
          ...(file.type.includes("image") && {
            transformation: {
              pre: transformation,
            },
          }),
        },
        function (error, result) {
          if (error) reject(error);
          else resolve(result as UploadResponse);
        }
      );
    });
  };

  const Post = z.object({
    desc: z.string().max(140),
    isSensitive: z.boolean().optional(),
  });

  const validatedFields = Post.safeParse({
    desc,
    isSensitive: JSON.parse(isSensitive),
  });

  if (!validatedFields.success) return { success: false, error: true };
  let img = "";
  let video = "";
  let imgHeight = 0;

  if (file.size) {
    const result: UploadResponse = await uploadFile(file);
    if (result.fileType === "image") {
      img = result.filePath ?? "";
      imgHeight = result.height ?? 0;
    } else {
      video = result.filePath ?? "";
    }
  }

  try {
    await prisma.post.create({
      data: { ...validatedFields.data, userId, img, imgHeight, video },
    });
    revalidatePath(`/`);
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};
