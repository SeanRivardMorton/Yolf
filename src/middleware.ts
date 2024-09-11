import { updateSession } from "@/lib/session";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}
