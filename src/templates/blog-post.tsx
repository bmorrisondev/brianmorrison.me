import React from "react"
import { Link, graphql, navigate } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import parse, {domToReact} from "html-react-parser"
// import "../css/@wordpress/block-library/build-style/style.css"
// import "../css/@wordpress/block-library/build-style/theme.css"
// import { colors, ForgeButton } from 'shared'
import styled from 'styled-components'
import { Button, Container } from "react-bootstrap"
import DefaultLayout from "../layouts/DefaultLayout"
import colors from "../colors"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCalendar } from '@fortawesome/free-solid-svg-icons'

// import Bio from "../components/Bio"
// import Layout from "../components/layout"
// import Seo from "../components/seo"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';

function PostCode({ language, children }) {
  return (
    <SyntaxHighlighter
      style={theme}
      language={language}>
      {children}
    </SyntaxHighlighter>
  )
}

const getLanguage = node => {
  console.log(node.children[0].attribs.class)
  if(node.children && node.children.length > 0 && node.children[0].attribs.class && node.children[0].attribs.class.startsWith("language-")) {
    return node.children[0].attribs.class.replace("language-", "")
  }
  if (node.attribs.class != null) {
    return node.attribs.class;
  }
  return null;
};

const getCode = node => {
  if (node.children.length > 0 && node.children[0].name === 'code') {
    return node.children[0].children;
  } else {
    return node.children;
  }
};

const replaceCode = node => {
  if (node.name === 'pre') {
    return node.children.length > 0 && <PostCode language={getLanguage(node)}>{domToReact(getCode(node))}</PostCode>;
  }
};

const Wrapper = styled(Container)`
  .post-date {
    font-style: italic;
    svg {
      margin-right: 5px;
    }
  }

  .post-content {
    h2 {
      margin-top: 30px;
    }

    img {
      height: auto;
      max-width: 100%;
      margin: 10px 0px;
      border-radius: 5px;
      border: 1px solid ${colors.light.backgroundAccent};
    }
  }

  .callout {
    border-radius: 5px;
    background-color: ${colors.light.backgroundAccent};
    padding: 10px;
  }

  code {
    font-size: 16px !important;
  }
`

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    post: wpPost(id: { eq: $id }) {
      id
      author {
				node {
					name
          firstName
          description
          avatar {
						url
          }
        }
      }
      excerpt
      content
      title
      date(formatString: "MMMM DD, YYYY")
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                quality: 100
                placeholder: TRACED_SVG
                layout: FULL_WIDTH
              )
            }
          }
        }
      }
    }
    previous: wpPost(id: { eq: $previousPostId }) {
      slug
      title
    }
    next: wpPost(id: { eq: $nextPostId }) {
      slug
      title
    }
  }
`

type Props = {
  data: any
}

const BlogPostTemplate = (props: Props) => {
  const { data: { previous, next, post } } = props

  const featuredImage = {
    data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: post.featuredImage?.node?.alt || ``,
  }

  return (
    <DefaultLayout>
      <Wrapper>
        {/* <Seo title={post.title} description={post.excerpt} /> */}

        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header>
            {/* <small className="post-date"><FontAwesomeIcon icon={faCalendar} />{post.date}</small> */}
            <h1 itemProp="headline">{parse(post.title)}</h1>
            {featuredImage?.data && (
              <GatsbyImage
                image={featuredImage.data}
                alt={featuredImage.alt}
                style={{ marginBottom: 50 }}
              />
            )}
          </header>

          {!!post.content && (
            <div className="post-content">{parse(post.content, { replace: replaceCode })}</div>
          )}

          <hr />

          <footer>
            {/* <Bio author={post.author.node} /> */}
          </footer>
        </article>

        <nav className="blog-post-nav">
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Button onClick={() => navigate(`/blog/${previous.slug}`)}>
                  ← {parse(previous.title)}
                </Button>
              )}
            </li>

            <li>
              {next && (
                <Button onClick={() => navigate(`/blog/${next.slug}`)}>
                  {parse(next.title)} →
                </Button>
              )}
            </li>
          </ul>
        </nav>
      </Wrapper>

    </DefaultLayout>
  )
}

export default BlogPostTemplate
