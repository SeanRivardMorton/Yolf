import { loginSchema } from "@/components/ui/login/schema";
import db from "@/db";
import { login } from "@/lib/session";
import { user } from "@/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const body = await request.json();

  const validated = loginSchema.safeParse(body);

  if (!validated.success) {
    return Response.json({ status: 400, result: { message: 'POST LOGIN FAILED' } });
  }

  const [userInDb] = await db.select().from(user).where(eq(user.email, body.email)).limit(1);

  if (!userInDb) {
    console.log('POST LOGIN FAILED', userInDb)
    return Response.json({ status: 400, result: { message: 'POST LOGIN FAILED' } });
  }

  const match = await bcrypt.compare(body.password, userInDb.password);

  if (!match) {
    console.log('POST LOGIN FAILED', match)
    return Response.json({ status: 400, result: { message: 'POST LOGIN FAILED' } });
  }

  if (!userInDb.id) {
    return Response.json({ status: 400, result: { message: 'POST LOGIN FAILED' } });
  }

  await login(userInDb.email)

  // redirect('/')

  // return Response.json({ status: 200, result: { token } });
  return Response.json({ status: 200, result: { message: 'POST LOGIN' } });
}

