import { Textarea } from "../textarea"
import { useEditorState } from "./hooks/useEditorEngine"

function Editor() {
  const { currentDocument } = useEditorState()

  console.log("Editor Started", currentDocument)

  return <article className="p-8 rounded-lg w-4/5">
    <div className="h-[1000px]">
      <Textarea defaultValue={currentDocument?.content} className="text-2xl w-full h-full p-4 bg-stone-950 text-white border-white border-4 rounded-lg" />
    </div>
  </article>
}

export default Editor
