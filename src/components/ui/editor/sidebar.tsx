import { PlusIcon, SaveIcon } from "lucide-react";
import { Button } from "../button";
import { useEditorState } from "./hooks/useEditorEngine";
import { CrumpledPaperIcon } from "@radix-ui/react-icons";

function Sidebar() {

  const { currentDocument, isDeleting, isAdding, saveDocument, deleteDocument, addDocument } = useEditorState()

  console.log('Sidebar: currentDocument', currentDocument)

  const controls = [
    { name: 'Save', icon: <SaveIcon className="h-24 w-24 p-6 " onClick={() => currentDocument && saveDocument(currentDocument)} /> },
    { name: 'Add', icon: isAdding ? <></> : <PlusIcon className="h-24 w-24 p-6" onClick={() => currentDocument && addDocument(currentDocument)} /> },
    { name: 'Delete', icon: isDeleting ? <></> : <CrumpledPaperIcon className="h-24 w-24 p-6" onClick={() => currentDocument && deleteDocument(currentDocument)} /> },
  ]

  return (
    <div className="mt-8 mr-8 flex flex-col gap-4">
      {controls.map((control) => (
        <Button key={control.name} className="bg-stone-950 p-0  h-24 w-24 border-white border-4 rounded-lg">
          {control.icon}
        </Button>
      ))}
    </div>
  );
}

export default Sidebar;

// NOTE: I kinda like this.
// border-white border-4 rounded-lg h-fit
