// Authentination
// 1. check hash in gb
// 2. compare hash with password

import db from "@/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginSchema } from "@/components/ui/login/schema";
import { eq } from "drizzle-orm";
import { user } from "@/schema";
import { createSecretKey, Sign } from "crypto";
import { createSession, login } from "@/lib/session";
import { redirect } from "next/navigation";

// 3. return token
export async function POST(request: Request) {
  const body = await request.json();

  const validated = loginSchema.safeParse(body);

  if (!validated.success) {
    console.log('POST LOGIN FAILED', validated)
    return Response.json({ status: 400, result: { message: 'POST LOGIN FAILED' } });
  }

  // get user from db
  const [userInDb] = await db.select().from(user).where(eq(user.email, body.email)).limit(1);
  console.log(userInDb)

  if (!userInDb) {
    console.log('POST LOGIN FAILED', userInDb)
    return Response.json({ status: 400, result: { message: 'POST LOGIN FAILED' } });
  }

  // compare password
  const match = await bcrypt.compare(body.password, userInDb.password);

  if (!match) {
    console.log('POST LOGIN FAILED', match)
    return Response.json({ status: 400, result: { message: 'POST LOGIN FAILED' } });
  }

  if (!userInDb.id) {
    return Response.json({ status: 400, result: { message: 'POST LOGIN FAILED' } });
  }

  await login(userInDb.email)

  console.log('got a session')

  // redirect('/')

  // return Response.json({ status: 200, result: { token } });
  return Response.json({ status: 200, result: { message: 'POST LOGIN' } });
}

