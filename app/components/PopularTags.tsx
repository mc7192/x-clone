import Image from "next/image";
import Link from "next/link";

const PopularTags = () => {
  return (
    <div className="p-4 rounded-2xl border-[1px] border-border-gray flex flex-col gap-4">
      <h1 className="text-xl font-bold text-light-gray">What's Happening</h1>
      {/* TRENDS */}
      <div className="flex gap-4">
        <div className="relative w-20 h-20 rounded-xl overflow-hidden">
          <Image
            src="/general/avatar.png"
            alt="event"
            width={120}
            height={120}
          />
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-light-gray">
            Nadal v Federer Grand Slam
          </h2>
          <span className="text-sm text-gray">Last Night</span>
        </div>
      </div>
      {/* TOPICS */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-gray text-sm">Technology • Trending</span>
          <Image src="/icons/infoMore.svg" alt="info" width={16} height={16} />
        </div>
        <div>
          <h2 className="text-light-gray font-bold">OpenAI</h2>{" "}
          <span className="text-sm text-gray">20k Posts</span>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <span className="text-gray text-sm">Technology • Trending</span>
          <Image src="/icons/infoMore.svg" alt="info" width={16} height={16} />
        </div>
        <div>
          <h2 className="text-light-gray font-bold">OpenAI</h2>{" "}
          <span className="text-sm text-gray">20k Posts</span>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <span className="text-gray text-sm">Technology • Trending</span>
          <Image src="/icons/infoMore.svg" alt="info" width={16} height={16} />
        </div>
        <div>
          <h2 className="text-light-gray font-bold">OpenAI</h2>{" "}
          <span className="text-sm text-gray">20k Posts</span>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <span className="text-gray text-sm">Technology • Trending</span>
          <Image src="/icons/infoMore.svg" alt="info" width={16} height={16} />
        </div>
        <div>
          <h2 className="text-light-gray font-bold">OpenAI</h2>{" "}
          <span className="text-sm text-gray">20k Posts</span>
        </div>
      </div>
      <Link href="/" className="text-icon-blue">
        Show More
      </Link>
    </div>
  );
};

export default PopularTags;
