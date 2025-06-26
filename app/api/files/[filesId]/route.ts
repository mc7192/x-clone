// app/api/files/[fileId]/route.ts
import { NextResponse } from "next/server";
import { imageKit } from "@/app/lib/server/imageKit";

export async function GET(
  request: Request,
  { params }: { params: { fileId: string } }
) {
  try {
    const fileDetails = await new Promise((resolve, reject) => {
      imageKit.getFileDetails(params.fileId, (error, result) => {
        error ? reject(error) : resolve(result);
      });
    });

    return NextResponse.json(fileDetails);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch file" },
      { status: 500 }
    );
  }
}
