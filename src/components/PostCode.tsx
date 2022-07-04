import React from 'react'
import {domToReact} from "html-react-parser"
import { DataNode } from 'domhandler'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ElementType } from "htmlparser2"

const getLanguage = node => {
  if(node.attribs["data-enlighter-language"]) {
    if(node.attribs["data-enlighter-language"] == "golang") {
      return "go"
    }
    return node.attribs["data-enlighter-language"]
  }
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

const getCode = node => {
  let content = ""
  console.log(node)
  if (node.children && node.children.length == 1 && node.children[0].name === 'code') {
    return node.children[0].children;
  } else {
    node.children.forEach(c => {
      console.log(c)
      if(c.name == "code" && c.children.length) {
        content += c.children[0].data
      } else {
        content += c.data
      }
    })
  }
  if(content) {
    let el = new DataNode(ElementType.Text, content)
    console.log(el)
    return [el]
  } else {
    return node.children
  }
};

export const replaceCode = node => {
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