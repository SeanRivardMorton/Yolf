import create from 'zustand';

type Document = {
  id: string;
  content: string;
};

type EditorState = {
  currentDocument: Document | null;
  documentHistory: Document[];
  currentIndex: number;
  loadNextDocument: () => void;
  loadPreviousDocument: () => void;
  setDocumentHistory: (documents: Document[]) => void;
  setCurrentDocument: (document: Document) => void;
};

export const useEditorStore = create<EditorState>((set, get) => ({
  currentDocument: null,
  documentHistory: [],
  currentIndex: 0,

  // Set the entire document history
  setDocumentHistory: (documents: Document[]) => set(() => ({
    documentHistory: documents,
    currentDocument: documents[0] || null,
    currentIndex: 0
  })),

  // Set the current document manually (if needed)
  setCurrentDocument: (document: Document) => set(() => ({
    currentDocument: document
  })),

  // Load the next document
  loadNextDocument: () => {
    const { documentHistory, currentIndex } = get();
    if (currentIndex < documentHistory.length - 1) {
      const newIndex = currentIndex + 1;
      set(() => ({
        currentIndex: newIndex,
        currentDocument: documentHistory[newIndex]
      }));
    }
  },

  // Load the previous document
  loadPreviousDocument: () => {
    const { documentHistory, currentIndex } = get();
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      set(() => ({
        currentIndex: newIndex,
        currentDocument: documentHistory[newIndex]
      }));
    }
  },
}));

