export async function GET() {
  console.log('GET ENTRIES')
  return Response.json({ message: "Getting Entries" });
}

export async function POST() {
  console.log('POST ENTRIES')
  return Response.json({ message: "Posting Entries" });
}
