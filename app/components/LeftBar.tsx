import { SignOutButton } from "@clerk/nextjs";
import CustomImage from "./Image";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

const menuList = [
  {
    id: 1,
    name: "Homepage",
    link: "/",
    icon: "home.svg",
  },
  {
    id: 2,
    name: "Explore",
    link: "/",
    icon: "explore.svg",
  },
  {
    id: 3,
    name: "Notification",
    link: "/",
    icon: "notification.svg",
  },
  {
    id: 4,
    name: "Messages",
    link: "/",
    icon: "message.svg",
  },
  {
    id: 5,
    name: "Bookmarks",
    link: "/",
    icon: "bookmark.svg",
  },
  {
    id: 6,
    name: "Jobs",
    link: "/",
    icon: "job.svg",
  },
  {
    id: 7,
    name: "Communities",
    link: "/",
    icon: "community.svg",
  },
  {
    id: 8,
    name: "Premium",
    link: "/",
    icon: "logo.svg",
  },
  {
    id: 9,
    name: "Profile",
    link: "/",
    icon: "profile.svg",
  },
  {
    id: 10,
    name: "More",
    link: "/",
    icon: "more.svg",
  },
];

const LeftBar = async () => {
  const user = await auth();
  return (
    <div className="h-screen sticky top-0 flex flex-col justify-between pt-2 pb-8">
      <div className="flex flex-col gap-4 text-lg items-center 2xl:items-start">
        {/* {LOGO} */}
        <Link href="/">
          <CustomImage
            src="icons/logo.svg"
            alt="logo"
            width={24}
            height={24}
            tr={true}
          />
        </Link>
        {/* {MENU} */}
        <div className="flex flex-col gap-4">
          {menuList.map((item) => (
            <Link
              href={item.link}
              key={item.id}
              className="p-2 rounded-full hover:bg-[#181818] flex items-center gap-4"
            >
              <CustomImage
                src={`icons/${item.icon}`}
                alt={item.name}
                width={24}
                height={24}
                tr={true}
              />
              <span className="hidden 2xl:inline">{item.name}</span>
            </Link>
          ))}
        </div>
        <Link
          href="/compose/post"
          className="bg-white text-black rounded-full font-bold w-12 h-12 flex items-center justify-center 2xl:hidden"
        >
          <CustomImage
            src="icons/post.svg"
            width={24}
            height={24}
            alt="new post"
            tr={true}
          />
        </Link>
        <Link
          href="/compose/post"
          className=" hidden 2xl:block bg-white text-black rounded-full font-bold py-2 px-20"
        >
          Post
        </Link>
      </div>
      {/* {USER} */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 relative rounded-full overflow-hidden">
            <CustomImage
              src="general/avatar.png"
              alt="avatar"
              height={40}
              width={40}
            />
          </div>
          <div className="hidden 2xl:flex flex-col">
            <span className="font-bold">Michael Ma</span>
            <span className="text-sm text-gray">@mclorde1</span>
          </div>
        </div>
        <div className="hidden 2xl:block cursor-pointer text-black bg-white rounded-full px-4 py-2">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
