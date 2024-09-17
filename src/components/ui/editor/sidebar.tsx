import { LogOutIcon, PlusIcon, SaveIcon } from "lucide-react";
import { Button } from "../button";
import { useEditorState } from "./hooks/useEditorEngine";
import { CrumpledPaperIcon } from "@radix-ui/react-icons";
import useAuth from "../login/hooks/useLogin";

function Sidebar() {

  const { currentDocument, isDeleting, isAdding, saveDocument, deleteDocument, addDocument } = useEditorState()
  const { logout } = useAuth()

  const controls = [
    { name: 'Save', icon: <SaveIcon className="h-24 w-24 p-6 " onClick={() => currentDocument && saveDocument(currentDocument)} /> },
    { name: 'Add', icon: isAdding ? <></> : <PlusIcon className="h-24 w-24 p-6" onClick={() => currentDocument && addDocument(currentDocument)} /> },
    { name: 'Delete', icon: isDeleting ? <></> : <CrumpledPaperIcon className="h-24 w-24 p-6" onClick={() => currentDocument && deleteDocument(currentDocument)} /> },
  ]

  const bottomControls = [
    {
      name: 'Logout', icon: <LogOutIcon className="h-24 w-24 p-6" onClick={() => logout()} />
    }
  ]

  return (
    <div className="flex flex-col justify-between gap-4 h-[80vh]">
      <div className="flex flex-col gap-4">
        {controls.map((control) => (
          <Button key={control.name} variant="link" className=" p-0  h-24 w-24 border-white border-4 rounded-lg">
            {control.icon}
          </Button>
        ))}
      </div>
      <div>
        {bottomControls.map((control) => (
          <Button key={control.name} variant="link" className=" p-0  h-24 w-24 border-white border-4 rounded-lg">
            {control.icon}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
