'use client'
import Sidebar from './sidebar'
import Footer from './footer'
import Controls from './controls'
import Editor from './editor'
import { EditorStateProvider } from './hooks/useEditorEngine'


// TODO: I have copied and pasted this template from entries. I will need to look at
// standardizing the template more, so that I don't need to use so many different names.
interface GalleryLayoutProps {
  heading: React.ReactNode
  controls: React.ReactNode
  sidebar: React.ReactNode
  footer: React.ReactNode
  editor: React.ReactNode
}


function GalleryEngine({
  heading,
  controls,
  sidebar,
  footer,
  editor,
}: GalleryLayoutProps) {
  return (
    <EditorStateProvider>
      <div className="flex flex-col w-min-[400px] pl-48 ">
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
export default GalleryEngine
