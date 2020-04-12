import React from 'react'
// import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
// import { graphql, Link } from 'gatsby'
// import Prism from 'prismjs'
// let Prism = require("prismjs");  // prism isn't typescript friendly just import it
// import bash from "prismjs/components/prism-bash"
// import "prismjs/plugins/autoloader/prism-autoloader"
// import langs from 'prismjs/components'
// import jsdom from 'jsdom'
// import cheerio from 'cheerio'
// import { DOMParser } from 'xmldom'
import Layout from '../components/Layout'

// console.log(langs)
// console.log(Prism)
// Prism.highlightAll();

// const parser = new DOMParser();

export const BlogPostTemplate = ({
  content,
  // categories,
  // tags,
  title,
  date,
  // author,
}) => {
  // console.log(Prism.languages.bash)
  // console.log("fn", bash(Prism))
  // console.log("lng", Prism.languages.bash)
  // let highlighted = Prism.highlight(content, Prism.languages.bash, "bash")
  // console.log(highlighted)
  // Prism.highlightAllUnder(content, false, out => console.log(out))
  // Prism.highlightAll();
  // const parsedHtml = parser.parseFromString(content, "text/html");
  // // parsedHtml.querySelectorAll("code").forEach(c => Prism.highlight(c, Prism.languages.bash, "bash"));
  // parsedHtml.querySelectorAll("code").forEach(c => {
  //   // console.log(c)
  //   Prism.highlightElement(c);
  // });
  // const highlighted = parsedHtml.querySelector("body").innerHTML

  // const parsedHtml = cheerio.parseHTML(content);
  // console.log(parsedHtml)
  // // var codeTags = $('code').toArray();
  // parsedHtml.querySelectorAll("code").forEach(c => Prism.highlightElement(c));
  // console.log(parsedHtml); // '<!DOCTYPE html><p>Bye moon</p>'

  // const parser = new DOMParser();
  // const parsedHtml = parser.parseFromString(content)
  // const elements = parsedHtml.getElementsByName("code") //.forEach(c => Prism.highlightElement(c));
  // Object.keys(elements).map(key => elements[key]).forEach(c => console.log(c))
  // console.log(elements); // '<!DOCTYPE html><p>Bye moon</p>'
  // const highlighted = parsedHtml.body.innerHTML
  // console.log(highlighted)



  // const parsedHtml = new jsdom.JSDOM(content);
  // console.log(parsedHtml)
  // // const parsedHtml = dom.window.document;
  // parsedHtml.querySelectorAll("code").forEach(c => {
  //   // console.log(c)
  //   Prism.highlightElement(c);
  // });
  // const highlighted = parsedHtml.querySelector("body").innerHTML

  return (
    <section className="section">
      <div className="container content">
        <div className="row">
          <div className="col-12-md post">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <div>
              {/* TODO: Style name should be renamed and style below should go into scss file */}
              <span className="post-excerpt-meta">
                <i className="far fa-calendar" style={{paddingRight: 5 + 'px'}} />
                {(new Date(date)).toDateString()}
              </span> 
            </div>
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <div style={{ marginTop: `4rem` }}>
              <p>
                {/* <Link to={`/author/${author.slug}`}>{author.name}</Link> */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// BlogPostTemplate.propTypes = {
//   content: PropTypes.node.isRequired,
//   title: PropTypes.string,
// }

// const BlogPost = ({ data }) => {
//   const { post } = data.wpgraphql

//   return (
//     <Layout>
//       <Helmet title={`${post.title} | Blog`} />
//       <BlogPostTemplate
//         content={post.content}
//         // categories={post.categories}
//         // tags={post.tags}
//         title={post.title}
//         date={post.date}
//         // author={post.author}
//       />
//     </Layout>
//   )
// }

const BlogPost = ({
  pageContext
}) => {
  console.log(pageContext)
  return (
    <Layout>
      <Helmet title={`${pageContext.title} | Blog`} />
      <BlogPostTemplate
        content={pageContext.content}
        // categories={post.categories}
        // tags={post.tags}
        title={pageContext.title}
        date={pageContext.date}
        // author={post.author}
      />
    </Layout>
  )
}

// BlogPost.propTypes = {
//   data: PropTypes.shape({
//     markdownRemark: PropTypes.object,
//   }),
// }

export default BlogPost

// export const pageQuery = graphql`
//   query BlogPostByID($id: ID!) {
//     wpgraphql {
//       post(id: $id) {
//         id
//         title
//         slug
//         content
//         date
//       }
//     }
//   }
// `

    // wordpressPost(id: { eq: $id }) {
    //   id
    //   title
    //   slug
    //   content
    //   date(formatString: "MMMM DD, YYYY")
    //   categories {
    //     name
    //     slug
    //   }
    //   tags {
    //     name
    //     slug
    //   }
    //   author {
    //     name
    //     slug
    //   }
    // }
