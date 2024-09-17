
import { ProseMirror, useNodeViews } from "@nytimes/react-prosemirror";
import { useEditorState } from '../hooks/useEditorEngine'
import type { NodeViewComponentProps } from "@nytimes/react-prosemirror";
import type { ReactNodeViewConstructor } from "@nytimes/react-prosemirror";
import { react } from "@nytimes/react-prosemirror";

import Menu from "./Menu";
import "./rich-text-editor.css";

import {
  baseKeymap,
  chainCommands,
  createParagraphNear,
  liftEmptyBlock,
  newlineInCode,
  splitBlock,
  toggleMark
} from "prosemirror-commands";
import { keymap } from "prosemirror-keymap";
import { Schema } from "prosemirror-model";
import { liftListItem, sinkListItem, splitListItem } from "prosemirror-schema-list";
import { EditorState } from "prosemirror-state";
import type { Transaction } from "prosemirror-state";
import "prosemirror-view/style/prosemirror.css";
import React, { useCallback, useState } from "react";
import { history, undo, redo } from "prosemirror-history";
import { htmlToProseMirror, proseMirrorToHtml, schema } from "./utils";

const defaultState = (document: Node) => EditorState.create({
  doc: document,
  schema,
  plugins: [
    history(),
    keymap({
      ...baseKeymap,
      Enter: chainCommands(
        newlineInCode,
        createParagraphNear,
        liftEmptyBlock,
        splitListItem(schema.nodes.list_item),
        splitBlock
      ),
      "Shift-Enter": baseKeymap.Enter,
      "Shift-Tab": liftListItem(schema.nodes.list_item),
      "Mod-b": toggleMark(schema.marks["strong"]),
      "Mod-i": toggleMark(schema.marks["em"]),
      "Mod-z": undo,
      "Mod-y": redo,
    }),
    react(),
  ],
});

function Paragraph({ children }: NodeViewComponentProps) {
  return <p>{children}</p>;
}

function List({ children }: NodeViewComponentProps) {
  return <ul>{children}</ul>;
}

function ListItem({ children }: NodeViewComponentProps) {
  return <li>{children}</li>;
}

const reactNodeViews: Record<string, ReactNodeViewConstructor> = {
  paragraph: () => ({
    component: Paragraph,
    dom: document.createElement("div"),
    contentDOM: document.createElement("span"),
  }),
  list: () => ({
    component: List,
    dom: document.createElement("div"),
    contentDOM: document.createElement("div"),
  }),
  list_item: () => ({
    component: ListItem,
    dom: document.createElement("div"),
    contentDOM: document.createElement("div"),
  }),
};


export function RichTextEditor({ document }: { document: string }) {
  const data = useEditorState()
  const { nodeViews, renderNodeViews } = useNodeViews(reactNodeViews);
  const [mount, setMount] = useState<HTMLDivElement | null>(null);
  const parsed = htmlToProseMirror(data.currentDocument?.content || document)
  const [state, setState] = useState(defaultState(parsed));

  const dispatchTransaction = useCallback(
    (tr: Transaction) => setState((oldState) => oldState.apply(tr)),
    []
  );

  React.useEffect(() => {
    const parsed = htmlToProseMirror(data.currentDocument?.content || document)
    setState(defaultState(parsed))
  }, [data.currentIndex])

  console.log('to html', proseMirrorToHtml(state.toJSON()))


  return (
    <main>
      <ProseMirror
        mount={mount}
        state={state}
        nodeViews={nodeViews}
        dispatchTransaction={dispatchTransaction}
      >
        <Menu />
        <div ref={setMount} />
        {renderNodeViews()}
      </ProseMirror>
    </main>
  );
}
