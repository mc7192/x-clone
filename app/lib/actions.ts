"use server";

import { imageKit } from "./server/imageKit";

interface FileDetailsResponse {
  width: number;
  height: number;
  filePath: string;
  url: string;
  fileType: string;
  customMetaData?: { sensitive: boolean };
}

export const shareAction = async (
  formData: FormData,
  settings: { type: "original" | "wide" | "square"; sensitive: boolean }
) => {
  const file = formData.get("file") as File;
  // const desc = formData.get("desc") as string;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const transformation = `w-600, ${
    settings.type === "square"
      ? "ar-1-1"
      : settings.type === "wide"
      ? "ar-16-9"
      : ""
  }`;

  imageKit.upload(
    {
      file: buffer,
      fileName: file.name,
      folder: "/posts",
      ...(file.type.includes("image") && {
        transformation: {
          pre: transformation,
        },
      }),
      customMetadata: {
        sensitive: settings.sensitive,
      },
    },
    function (error, result) {
      if (error) console.log(error);
      else console.log(result);
    }
  );
};

export const getFileDetails = async (fileId: string) => {
  try {
    const result = await new Promise((resolve, reject) => {
      imageKit.getFileDetails(fileId, (error, result) => {
        error ? reject(error) : resolve(result);
      });
    });

    return JSON.parse(JSON.stringify(result)) as FileDetailsResponse;
  } catch (error) {
    console.error("Error fetching file details:", error);
    return null;
  }
};
