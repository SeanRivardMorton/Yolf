export function POST() {
  console.log('POST LOGOUT');
  return Response.json({ status: 200, result: { message: 'POST LOGOUT' } });
}
