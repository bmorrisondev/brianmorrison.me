/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable import/prefer-default-export */
import React from 'react'
// import { renderToString } from "react-dom/server"
// import Prism from 'prismjs'
// import jsdom from 'jsdom'
// import loadLanguages from 'prismjs/components/index'

// loadLanguages()

// const highlightCode = function(content) {
//   const dom = new jsdom.JSDOM(content);
//   dom.window.document.querySelectorAll("code").forEach(c => {
//     const code = c.textContent;
//     const name = c.className
//       .replace("language-", "")
//       .replace("lang-", "");
//     if(name) {
//       const processed = Prism.highlight(code, Prism.languages[name], name);
//       c.innerHTML = processed;
//       c.parentNode.className = `${c.parentNode.className} language-${name}`
//     }
//   });
//   return dom.window.document.body.innerHTML;
// }

export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script 
      src="https://kit.fontawesome.com/456fa9b7f3.js" 
      crossOrigin="anonymous" />,
    <script 
      src="https://code.jquery.com/jquery-3.2.1.slim.min.js" 
      integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" 
      crossOrigin="anonymous" />,
    <script 
      src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" 
      integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" 
      crossOrigin="anonymous" />,
    <script 
      src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" 
      integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" 
      crossOrigin="anonymous" />
  ])
}

// export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
//   const bodyHtml = renderToString(bodyComponent)
//   const highlightedHtml = highlightCode(bodyHtml);

//   replaceBodyHTMLString(highlightedHtml)
// }