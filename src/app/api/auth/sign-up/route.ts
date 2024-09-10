import db from '@/db';
import bcrypt from 'bcrypt';
import { user } from '@/schema';
import { loginSchema } from '@/components/ui/login/schema';

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  // Validate the request body again.
  // Validation on the front-end for better UX. 
  // Validation on the back-end for security.
  const validated = loginSchema.safeParse(body);

  if (!validated.success) {
    return Response.json({ status: 400, result: { message: 'POST SIGN-UP FAILED' } });
  }

  const encryptedPassword = await bcrypt.hash(body.password, 10)

  const result = await db.insert(user).values({
    email: body.email,
    password: encryptedPassword
  });

  if (!result) {
    return Response.json({
      status: 400, result: {
        message: 'POST SIGN-UP FAILED'
      }
    });
  }

  return Response.json({ status: 200, result: { message: 'POST SIGN-UP' } });
}
