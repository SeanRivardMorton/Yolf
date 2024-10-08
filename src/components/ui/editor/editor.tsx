import { Textarea } from "../textarea"
import { useEditorState } from "./hooks/useEditorEngine"
import { Controller } from "react-hook-form"

function Editor() {
  const { currentDocument, saveDocument, form, documentHistory } = useEditorState()

  const handleSubmit = form.handleSubmit(async (data) => {
    saveDocument({ ...currentDocument, content: data?.content, title: data?.title })
  })

  return <article className="p-8 rounded-lg w-4/5" key={documentHistory.length}>
    <form className="h-[1000px]" onBlur={handleSubmit}>
      <Controller
        name="title"
        control={form.control}
        render={({ field }) => (
          <input {...field} className="rounded-lg bg-white text-black font-bold border-b-0 text-2xl w-full p-2 px-4 relative top-3" />
        )}
      />
      <Controller
        name="content"
        control={form.control}
        render={({ field }) => (
          <Textarea {...field} className="text-2xl w-full h-full p-4 bg-stone-950 text-white border-white border-4 rounded-lg" />
        )}
      />
    </form>
  </article>
}

export default Editor
