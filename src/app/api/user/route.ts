import db from '../../../db/index'
import { user } from '../../../schema'

// NOTE:
// This current implementation gets all users.
//
export async function GET() {

  const users = await db.select().from(user)

  return Response.json({ users });
}
