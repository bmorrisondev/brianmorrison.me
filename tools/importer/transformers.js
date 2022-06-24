const jsdom = require('jsdom')
const loadLanguages = require('prismjs/components/index.js');
const Prism = require('prismjs')
const socials = require('./social-links.json')
const markdownIt = require('markdown-it')
const mdAttrs = require('markdown-it-attrs')

loadLanguages()

const md = markdownIt()
md.use(mdAttrs)

exports.highlightCode = function(content) {
  const dom = new jsdom.JSDOM(content);

  // Transform prismatic blocks from WordPress
  dom.window.document.querySelectorAll("code").forEach(c => {
    const code = c.textContent;
    const name = c.className
      .replace("language-", "")
      .replace("lang-", "");
    if(name) {
      const processed = Prism.highlight(code, Prism.languages[name], name);
      c.innerHTML = processed;
      c.parentNode.className = `${c.parentNode.className} language-${name}`
    }
  });

  // Transform inline code
  dom.window.document.querySelectorAll("p").forEach(p => {
    // Transforms backticks
    const regex = /`([^`]*?)`/gm;
    const matches = p.innerHTML.match(regex);
    if(matches) {
      matches.forEach(m => {
        const originalMatch = m;
        // m = m.replace('`', '<code class=\'language-bash\'>')
        m = m.replace('`', '<code class=\'language-bash\'>')
        m = m.replace('`', '</code>')
        // m = `<pre class='inline language-bash'>${m}</pre>`
        p.innerHTML = p.innerHTML.replace(originalMatch, m);
      })
    }



    // Transforms inline code with the <code> tag
    const codeRegex = /<code>/gm;
    const codeMatches = p.innerHTML.match(codeRegex);
    if(codeMatches) {
      codeMatches.forEach(m => {
        const originalMatch = m;
        m = m.replace('<code>', '<code class=\'language-bash\'>')
        p.innerHTML = p.innerHTML.replace(originalMatch, m);
      })
    }
  })

  // Transform list item inline code
  dom.window.document.querySelectorAll("li").forEach(li => {
    // Transforms backticks
    const regex = /`([^`]*?)`/gm;
    const matches = li.innerHTML.match(regex);
    if(matches) {
      matches.forEach(m => {
        const originalMatch = m;
        m = m.replace('`', '<code class=\'language-bash\'>')
        m = m.replace('`', '</code>')
        li.innerHTML = li.innerHTML.replace(originalMatch, m);
      })
    }

    // Transforms inline code with the <code> tag
    const codeRegex = /<code>/gm;
    const codeMatches = li.innerHTML.match(codeRegex);
    if(codeMatches) {
      codeMatches.forEach(m => {
        const originalMatch = m;
        m = m.replace('<code>', '<code class=\'language-bash\'>')
        li.innerHTML = li.innerHTML.replace(originalMatch, m);
      })
    }
  })

  // Transform single blocks of <code> inside of <p>
  dom.window.document.querySelectorAll("p").forEach(p => {
    const regex = /<code.*>.*<\/code>/gm
    const matches = p.innerHTML.match(regex)
    if(matches && matches.length === 1 && matches[0] === p.innerHTML) {
      p.outerHTML = `<pre class=\'language-bash\'>${matches[0]}</pre>`
    }
  })

  return dom.window.document.body.innerHTML;
}

exports.transformMagicTags = function (content) {
  const dom = new jsdom.JSDOM(content);
  dom.window.document.querySelectorAll("p").forEach(p => {
    p.innerHTML = p.innerHTML.replace('[[discord]]', `<a href="${socials.discord}">${socials.discord}</a>`)
    p.innerHTML = p.innerHTML.replace('[[youtube]]', `<a href="${socials.youtube}">${socials.youtube}</a>`)
  });
  return dom.window.document.body.innerHTML;
}

exports.addResponsiveImageTags = function(content) {
  const dom = new jsdom.JSDOM(content);
  dom.window.document.querySelectorAll("img").forEach(img => {
    const classList = img.className.split(" ");
    if(!classList.includes("img-fluid")) {
      classList.push("img-fluid");
      img.className = classList.join(" ");
    }
  })
  return dom.window.document.body.innerHTML;
}

exports.addImgLinks = function(content) {
  const dom = new jsdom.JSDOM(content);
  dom.window.document.querySelectorAll("img").forEach(img => {
    img.outerHTML = `<a href="${img.src}">${img.outerHTML}</a>`
  })
  return dom.window.document.body.innerHTML;
}

exports.makeVideoEmbedsResponsive = function(content) {
  const dom = new jsdom.JSDOM(content);
  dom.window.document.querySelectorAll(".wp-block-embed__wrapper").forEach(el => {
    const classList = el.className.split(" ");
    if(!classList.includes("embed-responsive")) {
      classList.push("embed-responsive");
      classList.push("embed-responsive-16by9");
      el.className = classList.join(" ");
    }
  })
  return dom.window.document.body.innerHTML;
}

exports.replaceOldDomainReferrences = function(content) {
  return content.split("https://chi01-wp02.ad.morrisonhome.net/wp-content/uploads").join("https://cdn.brianmorrison.me/images")
}

exports.compileMarkdown = function (markdown) {
  return md.render(markdown)
}

exports.removeH1Tags = function (content) {
  const dom = new jsdom.JSDOM(content);
  dom.window.document.querySelectorAll("h1").forEach(header => {
    header.parentNode.removeChild(header)
  });
  return dom.window.document.body.innerHTML;
}