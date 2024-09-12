import { getSession } from '@/lib/session';
import db from '../../../db/index'
import { user } from '../../../schema'
import { eq } from 'drizzle-orm'

// NOTE:
// This current implementation gets all users.
//
export async function GET() {

  const session = await getSession()
  const users = await db.select().from(user).where(eq(user.id, session.user.id)).limit(1);

  return Response.json({
    user: {
      id: users[0].id,
      name: users[0].name,
      email: users[0].email
    }
  });
}
