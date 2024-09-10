// Authentination
// 1. check hash in gb
// 2. compare hash with password

import db from "@/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginSchema } from "@/components/ui/login/schema";
import { eq } from "drizzle-orm";
import { user } from "@/schema";

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

  console.log('POST LOGIN SUCCESS', match)

  // const token = jwt.sign({ id: userInDb.id }, process.env.JWT_SECRET, {
  //   expiresIn: '30d'
  // });

  // return Response.json({ status: 200, result: { token } });
  return Response.json({ status: 200, result: { message: 'POST LOGIN' } });
}

