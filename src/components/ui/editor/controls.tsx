import { Button } from "../button";
import { ChevronLeft, ChevronRight, SquareIcon } from "lucide-react";
import { useEditorState } from "./hooks/useEditorEngine";

// displays the amount of documents, and where the current document is.
// getting hydration errors from Pagination component.
const Pagination = ({ currentIndex, totalDocuments }: { currentIndex: number; totalDocuments: any }) => {
  console.log('Pagination', currentIndex, totalDocuments)
  return (
    <div className="flex flex-row">
      {totalDocuments.map((_, index) => (
        <div key={index}>
          {false && index}
          <SquareIcon className={`h-4 w-4 rounded-lg m-1 ${index === currentIndex ? 'text-stone-700' : 'text-white'}`} />
        </div>
      ))}
    </div>
  )
}

function Controls() {
  const { loadNextDocument, loadPreviousDocument, documentHistory, currentIndex, isAdding, isDeleting } = useEditorState()

  const controls = [
    { name: 'back', icon: <ChevronLeft className="h-12 w-12" onClick={loadPreviousDocument} /> },
    // { name: 'home', icon: <HomeIcon className="h-8 w-8" onClick={() => goToDocument(0)} /> },
    { name: 'forward', icon: <ChevronRight className="h-12 w-12" onClick={loadNextDocument} /> },
  ]

  return (
    <div className="flex flex-row pr-24 gap-4">
      <div className="flex flex-row gap-4 ml-8">
        {controls.map((control) => (
          <Button key={control.name} className="bg-stone-950 border-white border-4 h-12 w-12 rounded-lg p-1">
            {control.icon}
          </Button>
        ))}
      </div>
      <div className="mt-auto">
        <Pagination currentIndex={currentIndex} totalDocuments={documentHistory} />
      </div>
    </div>
  )
}

export default Controls
