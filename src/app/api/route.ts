export const dynamic = 'force-static';

export async function GET() {
  console.log(`GET /`)
  return Response.json({
    routes: [
      { method: 'GET', path: '/user' },
      { method: 'GET', path: '/entries' },
      { method: 'POST', path: '/user' },
      { method: 'POST', path: '/entries' },
    ]
  })
}
