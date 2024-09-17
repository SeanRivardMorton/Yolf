import { Button } from "../button";
import { ChevronLeft, ChevronRight, HomeIcon, LibraryIcon, SquareIcon } from "lucide-react";
import { useEditorState } from "./hooks/useEditorEngine";
import Link from "next/link";

// displays the amount of documents, and where the current document is.
// getting hydration errors from Pagination component.
const Pagination = ({ currentIndex, totalDocuments }: { currentIndex: number; totalDocuments: any }) => {
  const { goToDocument } = useEditorState()
  return (
    <div className="flex flex-row">
      {totalDocuments.map((_: any, index: number) => (
        <div key={index}>
          {false && index}
          <Button variant="outline" size="icon" onClick={() => goToDocument(index)} className="p-0 m-auto h-8 w-8 bg-stone-950 border-none">
            <SquareIcon className={`h-4 w-4 ${index === currentIndex ? 'text-stone-700' : 'text-white'}`} />
          </Button>
        </div>
      ))}
    </div>
  )
}

function Controls() {
  const { loadNextDocument, loadPreviousDocument, documentHistory, currentIndex } = useEditorState()

  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-row gap-4 mb-8">
        <Button className="bg-stone-950 border-white border-4 h-12 w-12 rounded-lg p-1" variant="link">
          <ChevronLeft className="h-12 w-12" onClick={loadPreviousDocument} />
        </Button>
        <Button variant="link" className="bg-stone-950 border-white border-4 h-12 w-12 rounded-lg p-1">
          <Link href="/documents" >
            <LibraryIcon className="h-8 w-8" />
          </Link>
        </Button>
        <Button className="bg-stone-950 border-white border-4 h-12 w-12 rounded-lg p-1" variant="link">
          <ChevronRight className="h-12 w-12" onClick={loadNextDocument} />
        </Button>
      </div>
      <div>
        <Pagination currentIndex={currentIndex} totalDocuments={documentHistory} />
      </div>
    </div>
  )
}

export default Controls
