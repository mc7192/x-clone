import { prisma } from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userProfileId = searchParams.get("user");
  const page = searchParams.get("cursor");
  const limit = 3;

  const { userId } = await auth();
  if (!userId) {
    return;
  }
  const whereCondition =
    userProfileId !== "undefined"
      ? { userId: userProfileId as string }
      : {
          parentPostId: null,
          userId: {
            in: [
              userId,
              ...(
                await prisma.follow.findMany({
                  where: { followerId: userId },
                  select: { followingId: true },
                })
              ).map((follow) => follow.followingId),
            ],
          },
        };
  const posts = await prisma.post.findMany({
    where: whereCondition,
    take: limit,
    skip: (Number(page) - 1) * limit,
  });
  const totalPosts = await prisma.post.count({ where: whereCondition });
  const hasMore = Number(page) * limit < totalPosts;

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return Response.json({ posts, hasMore });
}
