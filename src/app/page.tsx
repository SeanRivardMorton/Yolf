import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import db from "@/db";
import { user } from "@/schema";
import { ChevronLeft, ChevronRight, HomeIcon } from "lucide-react"

const fn = async () => {
  const users = await db.select().from(user)

  return users
}

export default async function Home() {
  const data = await fn()
  console.log(data)
  return (
    <main className="flex flex-col">
      <div className="flex flex-row justify-between">
        <div></div>
        <div className="logo w-3/5 mt-16 h-[130px] border-fuchsia-700 border-[1px] rounded flex items-center justify-center">
          <span className="text-purple-700 text-[64px] fluorescent-text">
            Y O L F
          </span>
        </div>
        <div></div>
      </div>
      <div className="h-32 flex flex-row justify-between">
        <div className=""></div>
        <div className="my-auto flex flex-row gap-4 w-4/5">
          <Button variant="outline" size="icon" className="bg-fuchsia-900 border-fuchsia-900 my-auto rounded-full">
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button variant="outline" size="icon" className="bg-fuchsia-900 border-fuchsia-900 h-16 w-16 my-auto rounded-full">
            <HomeIcon className="h-8 w-8" />
          </Button>
          <Button variant="outline" size="icon" className="bg-fuchsia-900 border-fuchsia-900 my-auto rounded-full">
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
        <div></div>
      </div>
      <div className="flex flex-row justify-between">
        <div></div>
        <div className="p-0 rounded w-3/5">
          <Textarea className="text-2xl h-[800px] border-fuchsia-700 border-[1px] p-12 text-fuchsia-100" />
        </div>
        <div className="border-fuchsia-700 flex flex-col gap-24 p-24 rounded-full border-[1px]">
          <Button className="text-2xl rounded-full h-24 border-green-900 border-[1px]">Submit</Button>
          <Button className="text-2xl rounded-full h-24 border-fuchsia-900 border-[1px]">{"<"}</Button>
          <Button className="text-2xl rounded-full h-24 border-fuchsia-900 border-[1px]">{">"}</Button>
        </div>
        <div></div>
      </div>
    </main>
  );
}
