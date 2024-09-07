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
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { createContext, useContext, useState } from "react"
import { useForm, UseFormReturn } from "react-hook-form";

type Document = {
  id: string;
  content: string;
  title: string;
};

type EditorStateContextType = {
  currentDocument: Document | null;
  goToDocument: (index: number) => void;
  loadNextDocument: () => void;
  loadPreviousDocument: () => void;
  saveDocument: (document: Document) => void;
  isSuccess: boolean;
  isLoading: boolean;
  form: UseFormReturn<{ content: string }>;
};

const EditorStateContext = createContext<EditorStateContextType | undefined>(undefined);


// The first implementation will simply be a list of documents. No Graphs. Just a list sorted by date.
export const EditorStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, isLoading, isSuccess } = useSuspenseQuery({
    queryKey: ['entries'],
    queryFn: async () => {
      const data = await fetcher.GET('entries')
      return data.result
    }
  })

  const mutation = useMutation({
    mutationFn: async (document: Document) => {
      const data = await fetcher.PUT(`entries/${document.id}`, document)
      return data
    },
    mutationKey: ['entries']
  })

  const form = useForm({
    defaultValues: {
      content: data?.[0].content
    }
  })


  const [documentHistory, setDocumentHistory] = useState<Document[]>(data);
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
      form.reset({ content: documentHistory[currentIndex + 1].content })
      toast({
        title: 'Document loaded',
        description: `Document ${currentIndex + 1} loaded`,
        duration: 5000,
      })
    }
  };

  const loadPreviousDocument = () => {
    console.log('EditorStateProvider: loadPreviousDocument', currentIndex, documentHistory)
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setCurrentDocument(documentHistory[currentIndex - 1]);
      form.reset({ content: documentHistory[currentIndex - 1].content })
      toast({
        title: 'Document loaded',
        description: `Document ${currentIndex - 1} loaded`,
        duration: 5000,
      })
    }
  };

  const saveDocument = async (document: Document) => {
    console.log('EditorStateProvider: saveDocument', document)
    const data = await mutation.mutateAsync(document)
    console.log('EditorStateProvider: saveDocument', data)
    toast({
      title: 'Document saved',
      description: `Document ${document.id} saved`,
      duration: 5000,
    })
  }

  // log the current document
  console.log('useEditorEngine: currentDocument', currentDocument)

  return (
    <EditorStateContext.Provider value={{ form, isLoading, isSuccess, currentDocument, loadNextDocument, loadPreviousDocument, goToDocument, saveDocument }}>
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
