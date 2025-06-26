import Image from "next/image";
import Link from "next/link";

const Recommendations = () => {
  return (
    <div className="p-4 rounded-2xl border-[1px] border-border-gray flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* image and user info */}
          <div className="relative rounded-full overflow-hidden w-10 h-10">
            <Image
              src="/general/avatar.png"
              alt="John Doe"
              width={100}
              height={100}
            />
          </div>
          <div>
            <h1 className="text-md font-bold">John Doe</h1>{" "}
            <span className="text-gray text-sm">@johnDoe</span>
          </div>
        </div>
        <button className="py-1 px-4 font-semibold bg-white text-black rounded-full">
          Follow
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* image and user info */}
          <div className="relative rounded-full overflow-hidden w-10 h-10">
            <Image
              src="/general/avatar.png"
              alt="John Doe"
              width={100}
              height={100}
            />
          </div>
          <div>
            <h1 className="text-md font-bold">John Doe</h1>{" "}
            <span className="text-gray text-sm">@johnDoe</span>
          </div>
        </div>
        <button className="py-1 px-4 font-semibold bg-white text-black rounded-full">
          Follow
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* image and user info */}
          <div className="relative rounded-full overflow-hidden w-10 h-10">
            <Image
              src="/general/avatar.png"
              alt="John Doe"
              width={100}
              height={100}
            />
          </div>
          <div>
            <h1 className="text-md font-bold">John Doe</h1>{" "}
            <span className="text-gray text-sm">@johnDoe</span>
          </div>
        </div>
        <button className="py-1 px-4 font-semibold bg-white text-black rounded-full">
          Follow
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* image and user info */}
          <div className="relative rounded-full overflow-hidden w-10 h-10">
            <Image
              src="/general/avatar.png"
              alt="John Doe"
              width={100}
              height={100}
            />
          </div>
          <div>
            <h1 className="text-md font-bold">John Doe</h1>{" "}
            <span className="text-gray text-sm">@johnDoe</span>
          </div>
        </div>
        <button className="py-1 px-4 font-semibold bg-white text-black rounded-full">
          Follow
        </button>
      </div>
      <Link href="/" className="text-icon-blue">
        Show More
      </Link>
    </div>
  );
};

export default Recommendations;
