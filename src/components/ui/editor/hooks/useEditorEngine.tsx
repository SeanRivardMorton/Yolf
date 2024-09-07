// Editor Engine.
//
// Manages the editor state and layout.
//
// ```tsx
// const { document, next, previous } = useEditor()
//
//```

import { useToast } from "@/hooks/use-toast";
import fetcher from "@/lib/fetcher";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react"

type Document = {
  id: string;
  content: string;
};

type EditorStateContextType = {
  currentDocument: Document | null;
  goToDocument: (index: number) => void;
  loadNextDocument: () => void;
  loadPreviousDocument: () => void;
  saveDocument: (document: Document) => void;
  isSuccess: boolean;
  isLoading: boolean;
};

const EditorStateContext = createContext<EditorStateContextType | undefined>(undefined);


// The first implementation will simply be a list of documents. No Graphs. Just a list sorted by date.
export const EditorStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [documentHistory, setDocumentHistory] = useState<Document[]>([]);
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['entries'],
    queryFn: async () => {
      const data = await fetcher.GET('entries')
      console.log('EditorStateProvider: data', data)
      setDocumentHistory(data.result)
      return data.result
    }
  })

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentDocument, setCurrentDocument] = useState<Document | null>(data?.[currentIndex]);

  const { toast } = useToast()
  console.log('EditorStateProvider: documentHistory', documentHistory)

  const goToDocument = (index: number) => {
    if (index >= 0 && index < documentHistory.length) {
      setCurrentIndex(index);
      setCurrentDocument(documentHistory[index]);
      console.log('EditorStateProvider: goToDocument', index, documentHistory)
      toast({
        title: 'Document loaded',
        description: `Document ${index} loaded`,
        duration: 5000,
      })
    }
  }

  const loadNextDocument = () => {
    console.log('EditorStateProvider: loadNextDocument', currentIndex, documentHistory)
    if (currentIndex < documentHistory.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setCurrentDocument(documentHistory[currentIndex + 1]);
      console.log('EditorStateProvider: loadNextDocument', currentIndex, documentHistory)
      toast({
        title: 'Document loaded',
        description: `Document ${currentIndex + 1} loaded`,
        duration: 5000,
      })
    }
  };

  const loadPreviousDocument = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setCurrentDocument(documentHistory[currentIndex - 1]);
      console.log('EditorStateProvider: loadPreviousDocument', currentIndex, documentHistory)
      toast({
        title: 'Document loaded',
        description: `Document ${currentIndex - 1} loaded`,
        duration: 5000,
      })
    }
  };

  const saveDocument = (document: Document) => {
    setDocumentHistory([...documentHistory, document]);
    console.log('EditorStateProvider: saveDocument', documentHistory)
  }

  return (
    <EditorStateContext.Provider value={{ isLoading, isSuccess, currentDocument, loadNextDocument, loadPreviousDocument, goToDocument, saveDocument }}>
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
