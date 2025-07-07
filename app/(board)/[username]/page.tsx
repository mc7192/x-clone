import Image from "next/image";
import Link from "next/link";
import Feed from "@/app/components/Feed";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import { User } from "@prisma/client";

async function generateUser(): Promise<User> {
  const ai = new GoogleGenAI({});
  const prompt = `
  Generate a JSON object for a user database with the following fields:
  - id: string (UUID format)
  - email: string (valid email format)
  - username: string (alphanumeric, 5-12 chars)
  - displayName: string (human-readable name)
  - bio: string (50-100 words about a fictional person)
  - location: string (random real-world city/country)
  - job: string (realistic job title)
  - website: string (valid URL)
  Return ONLY the JSON, without markdown or additional text.
`;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [prompt],
  });
  const data = response.text?.replace(/^```json|```$/g, "").trim();
  if (!data) throw new Error("No text returned from model");
  const res = JSON.parse(data);
  return res;
}

async function getRandomImageUrl({
  width,
  height,
  query,
}: {
  width: number;
  height: number;
  query: "landscape" | "portrait";
}): Promise<string> {
  const res = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${query}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return `${data.urls.raw}&w=${width}&h=${height}&fit=crop&dpr=2`;
}

const page = async ({ params }: { params: { username: string } }) => {
  const { userId } = await auth();
  const { username } = await params;
  const user = await prisma.user.findUnique({
    where: { username: username },
    include: {
      _count: { select: { followers: true, followings: true } },
      followings: userId ? { where: { followerId: userId } } : undefined,
    },
  });
  if (!user) return notFound();
  const newUser = await generateUser();
  console.log(newUser);

  return (
    <div>
      <div className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 z-10 bg-[#00000084]">
        <Link href="/">
          <Image src="/icons/back.svg" alt="back" width={24} height={24} />
        </Link>
        <h1 className="font-bold text-lg">{user.displayName}</h1>
      </div>
      {/* Info */}
      <div>
        <div className="relative w-full">
          <div className="w-full aspect-[3/1] relative">
            <Image
              src={user.cover || ""}
              alt=""
              width={600}
              height={200}
              id="cover"
            />
          </div>
          <div className="w-1/6 aspect-square rounded-full overflow-hidden border-4 border-black bg-gray-300 absolute left-4 -translate-y-1/2">
            <Image
              src={user.img || ""}
              alt=""
              width={100}
              height={100}
              id="profile"
            />
          </div>
          <div className="flex w-full items-center justify-end gap-2 p-2">
            <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
              <Image src="/icons/more.svg" alt="" width={20} height={20} />
            </div>
            <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
              <Image src="/icons/explore.svg" alt="" width={20} height={20} />
            </div>
            <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
              <Image src="/icons/message.svg" alt="" width={20} height={20} />
            </div>
            <button className="py-2 px-4 bg-white text-black font-bold rounded-full">
              Follow
            </button>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-2">
          {/* USERNAME & HANDLE */}
          <div>
            <h1 className="text-2xl font-bold">Lama Dev</h1>
            <span className="text-gray text-sm">@lamaWebDev</span>
          </div>
          <p>Lama Dev Youtube Channel</p>
          {/* JOB LOCATION DATE */}
          <div className="flex gap-4 text-gray text-[15px]">
            <div className="flex items-center gap-2">
              <Image
                src="/icons/userLocation.svg"
                alt="location"
                width={20}
                height={20}
              />
              <span>USA</span>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src="/icons/date.svg"
                alt="location"
                width={20}
                height={20}
              />
              <span>Joined May 2021</span>
            </div>
          </div>
          {/* FOLLWINGS FOLLOWERS */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold">100</span>
              <span className="text-gray text-[15px]">Followers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">100</span>
              <span className="text-gray text-[15px]">Followings</span>
            </div>
          </div>
        </div>
      </div>
      <Feed userProfileId={user.id} />
    </div>
  );
};

export default page;
