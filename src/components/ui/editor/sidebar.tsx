import { PlusIcon, SaveIcon } from "lucide-react";
import { Button } from "../button";
import { useEditorState } from "./hooks/useEditorEngine";

function Sidebar() {

  const { currentDocument } = useEditorState()
  console.log('SideBar Loaded: Current Document', currentDocument)
  const controls = [
    // { name: 'Save', icon: <SaveIcon className="h-8 w-8" onClick={() => currentDocument && saveDocument(currentDocument)} /> },
    { name: 'Add', icon: <PlusIcon className="h-8 w-8" /> },
  ]

  return (
    <div className="mt-8 mr-8 flex flex-col gap-4">
      {controls.map((control) => (
        <Button key={control.name} className="bg-stone-950  h-24 w-24 border-white border-4 rounded-lg">
          {control.icon}
        </Button>
      ))}
    </div>
  );
}

export default Sidebar;

// NOTE: I kinda like this.
// border-white border-4 rounded-lg h-fit
