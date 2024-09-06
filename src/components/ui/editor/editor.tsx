import { Textarea } from "../textarea"

function Editor() {
  return <article className="p-8 rounded-lg w-4/5">
    <div className="h-[1000px]">
      <Textarea className="text-2xl w-full h-full p-4 bg-stone-950 text-white border-white border-4 rounded-lg" />
    </div>
  </article>
}

export default Editor
