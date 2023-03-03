import React from 'react'
import { domToReact } from "html-react-parser"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';

function getLanguage(node) {
  // TODO: Default code block
  if(node.attribs.class === "wp-block-code") {

  }

  // Data enlighter block
  if(node.attribs["data-enlighter-language"]) {
    if(node.attribs["data-enlighter-language"] == "golang") {
      return "go"
    }
    return node.attribs["data-enlighter-language"]
  }

  // legacy
  if(node.children &&
    node.children.length > 0 &&
    node.children[0].attribs &&
    node.children[0].attribs.class &&
    node.children[0].attribs.class.startsWith("language-")) {
    return node.children[0].attribs.class.replace("language-", "")
  }
  if (node.attribs.class != null) {
    return node.attribs.class;
  }
  return null;
};

function getCode(node: any) {
  let nodes = []
  node.children.forEach(el => {
    if(el.children) {
      nodes = nodes.concat(el.children)
    } else {
      nodes.push(el)
    }
  })
  return nodes
};

export function replaceCode(node) {
  if (node.name === 'pre') {
    return node.children.length > 0 && <PostCode language={getLanguage(node)}>{domToReact(getCode(node))}</PostCode>;
  }
};

function PostCode({ language, children }) {
  return (
    <SyntaxHighlighter
      style={theme}
      language={language}>
      {children}
    </SyntaxHighlighter>
  )
}

export default PostCode