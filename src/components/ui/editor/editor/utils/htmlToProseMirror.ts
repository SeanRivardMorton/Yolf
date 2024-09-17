// src/utils/htmlToProseMirror.js

import { DOMParser as ProseMirrorDOMParser } from 'prosemirror-model';
import mySchema from '../schema';

/**
 * Converts an HTML string to a ProseMirror Node.
 * @param {string} html - The HTML string to convert.
 * @returns {ProseMirrorNode} - The ProseMirror document node.
 */
export const htmlToProseMirror = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return ProseMirrorDOMParser.fromSchema(mySchema).parse(doc.body);
};

