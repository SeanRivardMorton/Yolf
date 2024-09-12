import { logout } from "@/lib/session";

export async function GET() {
  console.log('POST LOGOUT');
  await logout()
  return Response.json({ status: 200, result: { message: 'POST LOGOUT' } });
}
