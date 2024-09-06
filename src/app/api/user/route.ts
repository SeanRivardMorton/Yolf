import db from '../../../db/index'
import { user } from '../../../schema'

export async function GET() {

  const users = await db.select().from(user)

  return Response.json({ users });
}
