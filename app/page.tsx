"use client";
import Feed from "./components/Feed";
import Share from "./components/Share";
import Link from "next/link";
import { cn } from "./lib/utils";
import { useState } from "react";

const imageKitAPI = process.env.NEXT_PUBLIC_URL_ENDPOINT;

const Home = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const handleOnclick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const clickedText = e.currentTarget.textContent?.trim();
    setActiveTab(clickedText || null);
  };

  return (
    <div>
      <div className="px-4 pt-4 flex justify-evenly text-gray font-bold border-b-[1px] border-border-gray">
        <Link
          href="/"
          className={cn(
            "pb-3 flex items-center",
            activeTab === "For you" && "border-b-4 border-icon-blue"
          )}
          onClick={handleOnclick}
        >
          For you
        </Link>
        <Link
          href="/"
          className={cn(
            "pb-3 flex items-center",
            activeTab === "Following" && "border-b-4 border-icon-blue"
          )}
          onClick={handleOnclick}
        >
          Following
        </Link>
        <Link
          href="/"
          className={cn(
            "pb-3 flex items-center",
            activeTab === "React.js" && "border-b-4 border-icon-blue"
          )}
          onClick={handleOnclick}
        >
          React.js
        </Link>
        <Link
          href="/"
          className={cn(
            "pb-3 flex items-center",
            activeTab === "Javascript" && "border-b-4 border-icon-blue"
          )}
          onClick={handleOnclick}
        >
          Javascript
        </Link>
        <Link
          href="/"
          className={cn(
            "pb-3 flex items-center",
            activeTab === "CSS" && "border-b-4 border-icon-blue"
          )}
          onClick={handleOnclick}
        >
          CSS
        </Link>
      </div>
      <Share />
      <Feed />
    </div>
  );
};

export default Home;
