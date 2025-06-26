import { prisma } from "@/prisma/client";
import Post from "./Post";
import { auth } from "@clerk/nextjs/server";
import InfiniteFeed from "./InfiniteFeed";

const Feed = async ({ userProfileId }: { userProfileId?: string }) => {
  const { userId } = await auth();
  if (!userId) {
    return;
  }
  const whereCondition = userProfileId
    ? { userId: userProfileId }
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
    take: 3,
    skip: 0,
    orderBy: { createdAt: "desc" },
  });
  return (
    <div>
      {posts?.map((post) => (
        <div key={post.id}>
          <Post />
        </div>
      ))}
      <InfiniteFeed userProfileId={userProfileId} />
    </div>
  );
};

export default Feed;
