import { prisma } from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const Recommendations = async () => {
  const { userId } = await auth();
  if (!userId) return;
  const followIds = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true },
  });
  const followedUserIds = followIds.map((f) => f.followingId);
  const friendRecommendations = await prisma.user.findMany({
    where: {
      id: { not: userId, notIn: followedUserIds },
      followings: { some: { followerId: { in: followedUserIds } } },
    },
    take: 3,
    select: { id: true, displayName: true, username: true, img: true },
  });

  return (
    <div className="p-4 rounded-2xl border-[1px] border-border-gray flex flex-col gap-4">
      {friendRecommendations.map((person) => (
        <div className="flex items-center justify-between" key={person.id}>
          <div className="flex items-center gap-2">
            {/* image and user info */}
            <div className="relative rounded-full overflow-hidden w-10 h-10">
              <Image
                src={person.img || "/general/noProfile.webp"}
                alt={person.displayName!}
                width={100}
                height={100}
              />
            </div>
            <div>
              <h1 className="text-md font-bold">
                {person.displayName || person.username}
              </h1>{" "}
              <span className="text-gray text-sm">@{person.username}</span>
            </div>
          </div>
          <button className="py-1 px-4 font-semibold bg-white text-black rounded-full">
            Follow
          </button>
        </div>
      ))}

      <Link href="/" className="text-icon-blue">
        Show More
      </Link>
    </div>
  );
};

export default Recommendations;
