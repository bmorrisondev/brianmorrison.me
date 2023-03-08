import React, { useEffect, useState } from 'react'
import { domToReact } from "html-react-parser"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';

function getLanguage(node) {
  // Manually set class
  if(node.attribs && node.attribs.class && node.attribs.class.includes("language-")) {
    console.log("found", node.attribs.class)
    let lang = ""
    let spl = node.attribs.class.split(" ")
    spl.forEach(el => {
      if(el.startsWith("language-")) {
        lang = el.replace("language-", "")
      }
    })
    return lang
  }

  // Data enlighter block
  if(node.attribs["data-enlighter-language"]) {
    let lang = node.attribs["data-enlighter-language"]
    if(lang === "golang") {
      return "go"
    }

    if(lang === "json") {
      return "javascript"
    }
    
    return lang
  }

  // WP code block
  if(node.children &&
    node.children.length > 0 &&
    node.children[0].attribs &&
    node.children[0].attribs.class &&
    node.children[0].attribs.class.startsWith("language-")) {

    let lang = node.children[0].attribs.class.replace("language-", "")
    if(lang === "json") {
      return "javascript"
    }
    return lang
  }
  
  return null;
};

function getCode(node: any) {
  if (node.children && node.children.length == 1 && node.children[0].name === 'code') {
    return node.children[0].children;
  } else {
    let textInidces: number[] = []
    let nodes: any[] = []
    node.children.forEach((el, idx) => {
      if(el.children) {
        nodes = nodes.concat(el.children)
      } else {
        textInidces.push(idx)
        el.text = "`" + el.text
        nodes.push(el)
      }
    })

    let mainNode = [nodes[0]]
    nodes.forEach((n, idx)=> {
      if(n.data.includes("<code>") || n.data.includes("</code>")) {
        n.data = n.data.replace("<code>", "`")
        n.data = n.data.replace("</code>", "`")
      }
      if(textInidces.includes(idx)) {
        // Add ` at the beginning of the block, just not the first one
        if(idx !== 0) {
          n.data = `\`${n.data}`
        }
        
        // Add ` if its not the last block
        if(idx !== nodes.length - 1) {
          n.data += "`"
        }
      }
      mainNode[0].data += n.data
    });
    return mainNode
  }
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