// Editor Engine.
//
// Manages the editor state and layout.
//
// ```tsx
// const { document, next, previous } = useEditor()
//
//```

import fetcher from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react"

type Document = {
  id: string;
  content: string;
};

type EditorStateContextType = {
  currentDocument: Document | null;
  loadNextDocument: () => void;
  loadPreviousDocument: () => void;
};

const EditorStateContext = createContext<EditorStateContextType | undefined>(undefined);


// The first implementation will simply be a list of documents. No Graphs. Just a list sorted by date.
export const EditorStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['entries'],
    queryFn: () => fetcher.GET('entries'),
  })

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [documents, setDocuments] = useState<Document[]>(data?.result || []);
  const [currentDocument, setCurrentDocument] = useState<Document | null>(data?.result[currentIndex]);
  const [documentHistory, setDocumentHistory] = useState<Document[]>([]);

  console.log('EditorStateProvider: entries fetched', data)

  const loadNextDocument = () => {
    if (currentIndex < documentHistory.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setCurrentDocument(documentHistory[currentIndex + 1]);
    }
  };

  const loadPreviousDocument = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setCurrentDocument(documentHistory[currentIndex - 1]);
    }
  };

  return (
    <EditorStateContext.Provider value={{ currentDocument, loadNextDocument, loadPreviousDocument }}>
      {children}
    </EditorStateContext.Provider>
  );
}
export const useEditorState = () => {
  const context = useContext(EditorStateContext);
  if (context === undefined) {
    throw new Error('useEditorState must be used within an EditorStateProvider');
  }
  return context;
}
