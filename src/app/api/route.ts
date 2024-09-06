export const dynamic = 'force-static';

export async function GET() {
  console.log('GETTING A BIT OF EVERYTHING')
  return Response.json({ message: "Getting a bit of everything" });
}
