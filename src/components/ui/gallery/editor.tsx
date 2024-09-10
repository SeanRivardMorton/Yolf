import { Textarea } from "../textarea"
import { useEditorState } from "./hooks/useEditorEngine"
import { Controller } from "react-hook-form"
import Search from "./search"
import Table from "./table"

function Editor() {
  const { currentDocument, saveDocument, form, documentHistory } = useEditorState()


  const handleSubmit = form.handleSubmit(async (data) => {
    saveDocument({ ...currentDocument, content: data?.content })
  })

  return <article className="p-8 rounded-lg w-4/5" key={documentHistory.length}>
    <div className="h-[1000px] flex flex-col text-white border-white border-4 rounded-lg">
      <Search />
      <Table />
    </div>
  </article>
}

export default Editor
