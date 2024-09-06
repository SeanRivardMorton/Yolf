import { Button } from "../button"
import { ChevronLeft, ChevronRight, HomeIcon } from "lucide-react"

const controls = [
  { name: 'back', icon: <ChevronLeft className="h-8 w-8" /> },
  { name: 'home', icon: <HomeIcon className="h-8 w-8" /> },
  { name: 'forward', icon: <ChevronRight className="h-8 w-8" /> },
]

function Controls() {
  return (
    <div className="flex flex-row gap-4 ml-8">
      {controls.map((control) => (
        <Button key={control.name} className="bg-stone-950 border-white border-4 h-16 w-16 rounded-lg p-1">
          {control.icon}
        </Button>
      ))}
    </div>
  )
}

export default Controls
