// app/api/revalidate/route.js
"use server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { path } = await request.json();
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({
      revalidated: false,
      message: "Error revalidating",
      now: Date.now(),
    });
  }
}
