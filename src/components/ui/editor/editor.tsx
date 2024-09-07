import { Textarea } from "../textarea"
import { useEditorState } from "./hooks/useEditorEngine"
import { Controller } from "react-hook-form"

function Editor() {
  const { currentDocument, saveDocument, form, documentHistory } = useEditorState()


  const handleSubmit = form.handleSubmit(async (data) => {
    saveDocument({ ...currentDocument, content: data?.content })
  })

  // TODO: There is still something wrong with getting the current document.
  // It keeps breaking. It's kinda driving me crazy. I need to figure out what's
  // causing it to not-update.
  // --
  // Maybe it's not happening in this component. Maybe it's soemthign upsteam.
  // It definitely seems upstream.
  // --
  // Maybe it's the next and previous buttons not propogating correctly?
  // --
  // I'm pretty sure it's the form. The form is setting the default value
  // and then not updating it when the current document changes.
  // --
  // maybe I should incorporate the form into the editor state.


  return <article className="p-8 rounded-lg w-4/5" key={documentHistory.length}>
    <form className="h-[1000px]" onBlur={handleSubmit}>
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
