"use client";
import { IKImageProps, Image } from "@imagekit/next";

interface CustomImage extends IKImageProps {
  src: string;
  alt: string;
  tr?: boolean;
  width?: number;
  height?: number;
  className?: string;
}

const imageKitAPI = process.env.NEXT_PUBLIC_URL_ENDPOINT;

const CustomImage = ({
  src,
  width,
  height,
  alt,
  className,
  tr,
}: CustomImage) => {
  return (
    <Image
      urlEndpoint={imageKitAPI}
      src={src}
      alt={alt}
      width={width}
      height={height}
      {...(tr
        ? { transformation: [{ width: `${width}`, height: `${height}` }] }
        : undefined)}
      className={className}
    />
  );
};

export default CustomImage;
