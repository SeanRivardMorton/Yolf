// useDocumentNavigator.ts
//
// This hook is used to handle the current document, as well as navigate to other documents.
//
// It will be able to:
//
// - Get the current document
// - lazy load the document before and after
// - navigate to the next and previous document
// - navigate to a specific document
// - navigate to the first and last document
// - navigate to the parent document
// - navigate to the child document
//
// Example Usage:
// ```tsx
// const { document, next, previous, navigateTo, first, last, parent, child } = useDocumentNavigator();
// ```
// The hook will return the current document, as well as the functions to navigate to other documents.
// The functions will return the document that was navigated to.
// If the document does not exist, it will return undefined.
//
// The hook will also handle the loading of the document, and will return the loading state.

import React from "react";

function useDocumentNavigator() {
  const [currentDocument, setCurrentDocument] = React.useState(null);

  const document = {};

  const next = () => { };
  const previous = () => { };
  const navigateTo = () => { };
  const first = () => { };
  const last = () => { };
  const parent = () => { };
  const child = () => { };


  return {
    document,
    next,
    previous,
    navigateTo,
    first,
    last,
    parent,
    child,
  };
}

export default useDocumentNavigator;
