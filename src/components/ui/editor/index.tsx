import Sidebar from './sidebar'
import Footer from './footer'
import Controls from './controls'
import Editor from './editor'

interface EditorLayoutProps {
  heading: React.ReactNode
  controls: React.ReactNode
  sidebar: React.ReactNode
  footer: React.ReactNode
  editor: React.ReactNode
}

function EditorLayout({
  heading,
  controls,
  sidebar,
  footer,
  editor,
}: EditorLayoutProps) {
  return (
    <div className="flex flex-col w-min-[400px] pl-48 pt-24">
      <div className="justify-center text-4xl text-center mb-24">
        {heading}
      </div>
      {controls}
      <div className="flex flex-row gap-4">
        {editor}
        {sidebar}
      </div>
      {footer}
    </div>
  )
}

export { Sidebar, Footer, Controls, Editor }
export default EditorLayout
