import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return new Response("Hello, world!");
}

export async function POST(request: NextRequest) {
  return new Response("Hello, world!");
}

export async function DELETE(request: NextRequest) {
  return new Response("Hello, world!");
}
