"use client";
import { useActionState, useEffect, useRef, useState } from "react";
import CustomImage from "./Image";
import { addPost } from "../lib/actions";
import Image from "next/image";
import ImageEditor from "./ImageEditor";
import { useUser } from "@clerk/nextjs";

const Share = () => {
  const [media, setMedia] = useState<File | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [settings, setSetting] = useState<{
    type: "original" | "wide" | "square";
    sensitive: boolean;
  }>({
    type: "original",
    sensitive: false,
  });
  // const abortController = new AbortController();
  const handleMediaChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setMedia(file);
  };

  const previewURL = media ? URL.createObjectURL(media) : null;
  const [state, formAction, isPending] = useActionState(addPost, {
    success: false,
    error: false,
  });
  const { user } = useUser();
  const formRef = useRef<HTMLFormElement | null>(null);
  useEffect(() => {
    if (state.success) formRef?.current?.reset();
  }, [state]);
  if (!user) {
    return null;
  }

  return (
    <form className="p-4 flex gap-4" action={formAction}>
      <div className="relative w-10 h-10 rounded-full over-flow-hidden">
        <CustomImage
          src={user?.imageUrl}
          alt=""
          width={100}
          height={100}
          tr={true}
        />
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <input
          type="text"
          name="imgType"
          value={settings.type}
          hidden
          readOnly
        />
        <input
          type="text"
          name="isSensitive"
          value={settings.sensitive ? "true" : "false"}
          hidden
          readOnly
        />
        <input
          type="text"
          placeholder="What is Happening?"
          name="desc"
          className="bg-transparent outline-none placeholder:text-gray text-xl"
        />
        {media?.type.includes("image") && previewURL && (
          <div className="relative rounded-xl overflow-hidden">
            <Image
              src={previewURL}
              alt="preview"
              width={600}
              height={600}
              className={`w-full ${
                settings.type === "original"
                  ? "h-full object-contain"
                  : settings.type === "square"
                  ? "aspect-square object-cover"
                  : "aspect-video object-cover"
              }`}
            />
            <div
              className="absolute top-2 left-2 bg-black/50 text-white py-1 px-4 rounded-full font-bold text-sm cursor-pointer hover:bg-black/70"
              onClick={() => {
                setIsEditorOpen(true);
              }}
            >
              Edit
            </div>
          </div>
        )}{" "}
        {media?.type.includes("video") && previewURL && (
          <div className="relative">
            <video src={previewURL} controls />
            <div
              className="absolute top-2 left-2 bg-black/50 text-white h-8 w-8 flex items-center justify-items-center cursor-pointer font-bold text-sm"
              onClick={() => {
                setMedia(null);
              }}
            >
              X
            </div>
          </div>
        )}
        {isEditorOpen && previewURL && (
          <ImageEditor
            onClose={() => {
              setIsEditorOpen(false);
            }}
            previewUrl={previewURL}
            settings={settings}
            setSetting={setSetting}
          />
        )}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-4 flex-wrap">
            <input
              type="file"
              onChange={handleMediaChange}
              className="hidden"
              id="file"
              name="file"
              accept="image/*, video/*"
            />
            <label htmlFor="file">
              <CustomImage
                src="icons/image.svg"
                alt=""
                width={20}
                height={20}
                className="cursor-pointer"
              />
            </label>
            <CustomImage
              src="icons/gif.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <CustomImage
              src="icons/poll.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <CustomImage
              src="icons/emoji.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <CustomImage
              src="icons/schedule.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <CustomImage
              src="icons/location.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </div>
          <button
            className="bg-white text-black font-bold rounded-full py-2 px-4 hover:bg-slate-100 hover:cursor-pointer"
            disabled={isPending}
          >
            {isPending ? "Posting" : "Post"}
          </button>
          {state.error && (
            <span className="text-red-300 p-4">Something went wrong!</span>
          )}
        </div>
      </div>
    </form>
  );
};

export default Share;
