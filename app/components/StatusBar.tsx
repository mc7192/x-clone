"use client";
import Link from "next/link";
import { cn } from "../lib/utils";
import { useState } from "react";

const StatusBar = () => {
  const [activeTab, setActiveTab] = useState<string | null>("For you");
  const handleOnclick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const clickedText = e.currentTarget.textContent?.trim();
    setActiveTab(clickedText || null);
  };
  return (
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
  );
};

export default StatusBar;
