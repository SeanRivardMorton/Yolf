'use client'
import Sidebar from './sidebar'
import Footer from './footer'
import Controls from './controls'
import Editor from './editor'
import { EditorStateProvider } from './hooks/useEditorEngine'


// NOTE: entries are in the database, which I'm using documents for the editor.
// I should probably make them the same thing. Would it be better to use
// documents for the database? Entities are the same thing, maybe a 
// bit more generic
//
interface EditorLayoutProps {
  heading: React.ReactNode
  controls: React.ReactNode
  sidebar: React.ReactNode
  footer: React.ReactNode
  editor: React.ReactNode
}

function EditorEngine({
  heading,
  controls,
  sidebar,
  footer,
  editor,
}: EditorLayoutProps) {
  return (
    <EditorStateProvider>
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
    </EditorStateProvider>
  )
}

export { Sidebar, Footer, Controls, Editor }
export default EditorEngine
