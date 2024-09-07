import { Button } from "../button"
import { ChevronLeft, ChevronRight, HomeIcon, SquareIcon } from "lucide-react"
import { useEditorState } from "./hooks/useEditorEngine"

// I want to represent the current index and the total number of documents in the document history.
// I will represent them with a square icon. each square will represent a document. The current index will be highlighted.

const Pagination = ({ currentIndex, totalDocuments }: { currentIndex: number; totalDocuments: number }) => {
  return (
    <div className="flex flex-row">
      {[...Array(totalDocuments)].map((_, index) => (
        <SquareIcon className={`h-4 w-4 rounded-lg m-1 ${index === currentIndex ? 'text-stone-950' : 'text-white'}`} />
      ))}
    </div>
  )
}

function Controls() {
  const { loadNextDocument, loadPreviousDocument, documentHistory, currentIndex } = useEditorState()

  const controls = [
    { name: 'back', icon: <ChevronLeft className="h-8 w-8" onClick={loadPreviousDocument} /> },
    // { name: 'home', icon: <HomeIcon className="h-8 w-8" onClick={() => goToDocument(0)} /> },
    { name: 'forward', icon: <ChevronRight className="h-8 w-8" onClick={loadNextDocument} /> },
  ]

  return (
    <div className="flex flex-row pr-24 gap-4">
      <div className="flex flex-row gap-4 ml-8">
        {controls.map((control) => (
          <Button key={control.name} className="bg-stone-950 border-white border-4 h-16 w-16 rounded-lg p-1">
            {control.icon}
          </Button>
        ))}
      </div>
      <div className="flex flex-col">
        <div className="my-auto">
        </div>
      </div>
      <div className="mt-auto">
        <Pagination currentIndex={currentIndex} totalDocuments={documentHistory.length - 1} />
      </div>
    </div>
  )
}

export default Controls
