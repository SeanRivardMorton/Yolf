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
    <form className="h-[1000px] flex flex-col text-white border-white border-4 rounded-lg" onBlur={handleSubmit}>
      <div className="flex flex-row justify-between m-8">
        <Search />
      </div>
      <div className="flex flex-row justify-between m-8">
        <div></div>
        <Table />
        <div></div>
      </div>
    </form>
  </article>
}

export default Editor
