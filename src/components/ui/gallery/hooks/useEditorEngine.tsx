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
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { createContext, useContext, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

type Document = {
  id: string;
  content: string;
  title: string;
  updatedAt: string;
  createdAt: string;
};

type EditorStateContextType = {
  currentDocument: Document | null;
  currentIndex: number;
  goToDocument: (index: number) => void;
  loadNextDocument: () => void;
  loadPreviousDocument: () => void;
  saveDocument: (document: Document) => void;
  deleteDocument: (document: Document) => void;
  addDocument: (document: Document) => void;
  documentHistory: Document[];
  isSuccess: boolean;
  isLoading: boolean;
  form: UseFormReturn<{ content: string }>;
  isAdding: boolean;
  isDeleting: boolean;
};

const EditorStateContext = createContext<EditorStateContextType | undefined>(undefined);

// The first implementation will simply be a list of documents. No Graphs. Just a list sorted by date.
export const EditorStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const queryClient = useQueryClient()
  const { data, isLoading, isSuccess, refetch } = useSuspenseQuery({
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

  const deleteMutation = useMutation({
    mutationFn: async (document: Document) => {
      const data = await fetcher.DELETE(`entries/${document.id}`)
      return data
    },
    mutationKey: ['entries']
  })

  const addMutation = useMutation({
    mutationFn: async (document: Document) => {
      const data = await fetcher.POST(`entries`, document)
      return data
    },
    mutationKey: ['entries']
  })

  const router = useRouter()
  const searchParams = useSearchParams()

  const [filteredData, setFilteredData] = React.useState<Document[]>(data)
  React.useEffect(() => {
    const filteredDocumentHistory = data?.filter((document: Document) => document.content?.toLowerCase().includes(searchParams.get('query')?.toLowerCase() || ''))
    setFilteredData(filteredDocumentHistory)
  }, [searchParams])

  const form = useForm({
    defaultValues: {
      content: data?.[0].content
    }
  })

  const [documentHistory, setDocumentHistory] = useState<Document[]>(data);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { toast } = useToast()

  const goToDocument = (index: number) => {
    if (index >= 0 && index < data.length) {
      setCurrentIndex(index);
      toast({
        title: 'Document loaded',
        description: `Document ${index} loaded`,
        duration: 5000,
      })
    }
  }

  const loadNextDocument = () => {
    if (currentIndex < data?.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      form.reset({ content: documentHistory[currentIndex + 1]?.content || '' })
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
      form.reset({ content: documentHistory[currentIndex - 1].content })
      toast({
        title: 'Document loaded',
        description: `Document ${currentIndex - 1} loaded`,
        duration: 5000,
      })
    }
  };

  React.useEffect(() => {
    form.reset({ content: data?.[currentIndex].content })
  }, [currentIndex])

  const saveDocument = async (document: Document) => {
    await mutation.mutateAsync(document)
    await queryClient.invalidateQueries('entries')

    toast({
      title: 'Document saved',
      description: `Document ${document.id} saved`,
      duration: 5000,
    })
  }

  const deleteDocument = async (document: Document) => {
    const data = await deleteMutation.mutateAsync(document)
    await queryClient.invalidateQueries('entries')

    setCurrentIndex(prev => prev - 1)
    toast({
      title: 'Document deleted',
      description: `Document ${document.id} deleted`,
      duration: 5000,
    })
  }

  const addDocument = async (document: Document) => {
    const data = await addMutation.mutateAsync(document)
    await queryClient.invalidateQueries('entries')

    router.push(`/`)

    toast({
      title: 'Document added',
      description: `Document ${data.id} added`,
      duration: 5000,
    })
  }



  return (
    <EditorStateContext.Provider value={{
      form,
      isLoading,
      isSuccess,
      isAdding: addMutation.isPending,
      isDeleting: deleteMutation.isPending,
      currentDocument: data?.[currentIndex],
      loadNextDocument,
      loadPreviousDocument,
      goToDocument,
      saveDocument,
      deleteDocument,
      addDocument,
      documentHistory: filteredData || data,
      currentIndex,
    }}>
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
