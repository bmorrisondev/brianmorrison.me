const { default: axios } = require("axios");

module.exports = class NotionToHtmlClient {
  constructor(key) {
    this.apiBase = "https://api.notion.com/v1"
    this.key = key
  }

  async generateHtmlFromPage(pageId) {
    let html = "<div>"

    let isMakingUl = false
    let isMakingOl = false

    let page = await this.getPage(pageId)
    let blocks = await this.getBlockChildren(page.id)

    blocks.results.forEach(el => {
      if(el.type !== "bulleted_list_item" && isMakingUl) {
        html += "</ul>"
        isMakingUl = false
      }
      if(el.type !== "numbered_list_item" && isMakingOl) {
        html += "</ol>"
        isMakingOl = false
      }
      if(el.type === "bulleted_list_item" && !isMakingUl) {
        html += "<ul>"
        isMakingUl = true
      }
      if(el.type === "numbered_list_item" && !isMakingOl) {
        html += "<ol>"
        isMakingOl = true
      }
      html += this.makeHtml(el)
    })

    html += "</div>"
    return html
  }

  async getDatabase(databaseId) {
    let res = await axios({
      method: "get",
      url: `https://api.notion.com/v1/databases/${databaseId}`,
      headers: {
        "Authorization": `Bearer ${this.key}`,
        "Notion-Version": "2021-08-16"
      }
    })
    return res.data
  }

  async queryDatabase(databaseId) {
    let res = await axios({
      method: "post",
      url: `https://api.notion.com/v1/databases/${databaseId}/query`,
      headers: {
        "Authorization": `Bearer ${this.key}`,
        "Notion-Version": "2021-08-16"
      }
    })
    return res.data
  }

  async getPage(pageId) {
    let res = await axios({
      method: "get",
      url: `https://api.notion.com/v1/pages/${pageId}`,
      headers: {
        "Authorization": `Bearer ${this.key}`,
        "Notion-Version": "2021-08-16"
      }
    })
    return res.data
  }

  async getBlockChildren(id) {
    let res = await axios({
      method: "get",
      url: `https://api.notion.com/v1/blocks/${id}/children`,
      headers: {
        "Authorization": `Bearer ${this.key}`,
        "Notion-Version": "2021-08-16"
      }
    })
    return res.data
  }

  makeParagraph(block) {
    let p = "<p>"
    block.paragraph.text.forEach(el => {
      let content = el.text.content
      if(el.annotations.bold) {
        content = `<strong>${content}</strong>`
      }

      if(el.annotations.italic) {
        content = `<em>${content}</em>`
      }

      if(el.annotations.code) {
        content = `<code>${content}</code>`
      }

      if(el.text?.link?.url) {
        content = `<a href="${el.text.link.url}" target="_blank">${content}</a>`
      }
      p += content
    })
    p += "</p>"
    return p
  }

  makeImg(block) {
    if(block?.image?.file?.url) {
      let fig = "<figure>"
      fig += `<img src="${block.image.file.url}" />`
      if(block.image.caption) {
        fig += "<figcaption>"
        block.image.caption.forEach(c => {
          fig += c.text.content
        })
        fig += "</figcaption>"
      }
      fig += "</figure>"
      return fig
    }

    return ""
  }

  makeListItem(block) {
    if(block.numbered_list_item) {
      return `<li>${block.numbered_list_item.text[0].text.content}</li>`
    }
    if(block.bulleted_list_item) {
      return `<li>${block.bulleted_list_item.text[0].text.content}</li>`
    }
  }

  makeHeading(block) {
    if(block.heading_1) {
      return `<h2>${block.heading_1.text[0].text.content}</h2>`
    }
    if(block.heading_2) {
      return `<h2>${block.heading_2.text[0].text.content}</h2>`
    }
    if(block.heading_3) {
      return `<h3>${block.heading_3.text[0].text.content}</h3>`
    }
  }

  makeCode(block) {
    let code = `<pre class="language-${block.code.language}"><code>`
    block.code.text.forEach(t => {
      code += t.text.content
    })
    code += "</code></pre>"
    return code
  }

  makeBlockQuote(block) {
    let bq = "<blockquote>"
    block.quote.text.forEach(t => {
      bq += t.text.content
    })
    bq += "</blockquote>"
    return bq
  }

  makeCallout(block) {
    let callout = '<div class="callout">'
    // TODO: handle other icon types
    if(block.callout.icon.type === "emoji") {
      callout += `<div class="callout-icon">${block.callout.icon.emoji}</div>`
    }
    block.callout.text.forEach(t => {
      callout += t.text.content
    })
    callout += "</div>"
    return callout
  }

  makeHtml(block) {
    if(block.type === "paragraph") {
      return this.makeParagraph(block)
    }

    if(block.type === "image") {
      return this.makeImg(block)
    }

    if(block.type === "bulleted_list_item" || block.type === "numbered_list_item") {
      return this.makeListItem(block)
    }

    if(block.type.startsWith("heading_")) {
      return this.makeHeading(block)
    }

    if(block.type === "code") {
      return this.makeCode(block)
    }

    if(block.type === "quote") {
      return this.makeBlockQuote(block)
    }

    if(block.type === "callout") {
      return this.makeCallout(block)
    }

    return ""
  }
}