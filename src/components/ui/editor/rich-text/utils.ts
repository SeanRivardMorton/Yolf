import { DOMSerializer, Schema } from "prosemirror-model";
import { DOMParser as ProseMirrorDOMParser } from 'prosemirror-model';

export const schema = new Schema({
  nodes: {
    doc: { content: "block+" },
    paragraph: { group: "block", content: "inline*" },
    list: { group: "block", content: "list_item+" },
    list_item: { content: "paragraph+", toDOM: () => ["li", 0] },
    text: { group: "inline" },
  },
  marks: {
    em: {
      parseDOM: [{ tag: "em" }],
      toDOM() {
        return ["em", 0];
      },
    },
    heading: {
      parseDOM: [{ tag: "h1" }],
      toDOM() {
        return ["h1", 0];
      },
    },
    underline: {
      parseDOM: [{ tag: "u" }],
      toDOM() {
        return ["u", 0];
      },
    },
    indent: {
      parseDOM: [{ tag: "blockquote" }],
      toDOM() {
        return ["blockquote", 0];
      },
    },
    strong: {
      parseDOM: [{ tag: "strong" }],
      toDOM() {
        return ["strong", 0];
      },
    },
  },
});


export const proseMirrorToHtml = (doc: any) => {
  const serializer = DOMSerializer.fromSchema(schema);
  const fragment = serializer.serializeNode(doc.content);
  const div = document.createElement('div');
  div.appendChild(fragment);
  return div.innerHTML;
};


export const htmlToProseMirror = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return ProseMirrorDOMParser.fromSchema(schema).parse(doc.body);
};
