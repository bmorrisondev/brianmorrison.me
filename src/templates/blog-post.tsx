import React, { useEffect, useState } from "react"
import { Link, graphql, navigate } from "gatsby"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
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
import YouTubeEmbed from "../components/YouTubeEmbed"
import StylizedList from "../components/StylizedList"
import GitHub from "../components/svgs/GitHub"
import { SeriesCollection, SeriesEntry } from "../models"
import BlogFooter from "../components/BlogFooter"

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

  .post-meta {
    a:hover {
      cursor: pointer;
    }

    svg {
      height: 25px;
      width: 25px;

      &:hover {
        fill: inherit;
      }
    }
  }

  .post-content {
    word-wrap: break-word;

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

  .callout, blockquote {
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
      series {
        nodes {
          name
          description
          seriesFields {
            icon {
              altText
              gatsbyImage(width: 25, height: 25)
            }
          }
          posts {
            nodes {
              slug
              title
              blogPostFields {
                seriesOrder
              }
            }
          }
        }
      }
      blogPostFields {
        seriesOrder
        videoUrl
        githubUrl
        hideFeaturedImage
      }
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

const BlogPostTemplate = ({ data, location }) => {
  const [hideFeaturedImage, setHideFeaturedImage] = useState(false)
  const [githubUrl, setGithubUrl] = useState("")
  const [series, setSeries] = useState<SeriesCollection>()
  const { previous, next, post } = data

  const featuredImage = {
    data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    url: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src,
    alt: post.featuredImage?.node?.alt || ``,
  }

  console.log()

  useEffect(() => {
    if(post.blogPostFields && post.blogPostFields.hideFeaturedImage) {
      setHideFeaturedImage(true)
    }

    if(post.blogPostFields && post.blogPostFields.githubUrl) {
      setGithubUrl(post.blogPostFields.githubUrl)
    }

    if(post.series && post.series.nodes && post.series.nodes.length) {
      const sc: SeriesCollection = {
        entries: []
      }
      sc.name = post.series.nodes[0].name
      let sp: SeriesEntry[] = []
      post.series.nodes[0].posts.nodes.forEach(p => {
        let entry: SeriesEntry = {
          order: p.blogPostFields.seriesOrder,
          slug: p.slug,
          title: p.title
        }
        sp.push(entry)
      })
      sp.sort((a: SeriesEntry, b: SeriesEntry) => Number(a.order) < Number(b.order) ? -1 : 1)
      sc.entries = sp
      if(post.series.nodes[0].seriesFields?.icon) {
        sc.icon = post.series.nodes[0].seriesFields.icon
      }
      setSeries(sc)
    }
  }, [])

  function scrollToSeriesListing() {
    let el = document.querySelector(".series-meta")
    if(el) {
      el.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }

  return (
    <DefaultLayout location={location} pageTitle={post.title} ogImageUrl={featuredImage && featuredImage.url ? featuredImage.url : undefined} description={post.excerpt} >
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
            {(series || githubUrl !== "") && (
            <div className="post-meta">
              <StylizedList>
                {series && series.name && (
                  <a onClick={() => scrollToSeriesListing()}>
                    <li className="tag-link">
                      <StaticImage className="list-icon" src="../images/emoji/series.png" alt="series icon" /> Series: {series.name}
                    </li>
                  </a>
                )}
                {githubUrl && (
                  <a href={githubUrl} target="_blank">
                    <li className="tag-link">
                      <GitHub /> Visit GitHub Repo
                    </li>
                  </a>

                )}
              </StylizedList>
            </div>

            )}
            {!hideFeaturedImage && featuredImage?.data && (
              <GatsbyImage
                image={featuredImage.data}
                alt={featuredImage.alt}
                style={{ marginBottom: 50 }}
              />
            )}
            {post.blogPostFields && post.blogPostFields.videoUrl && (
              <YouTubeEmbed url={post.blogPostFields.videoUrl} />
            )}
          </header>

          {!!post.content && (
            <div className="post-content">{parse(post.content, { replace: replaceCode })}</div>
          )}

          <BlogFooter seriesCollection={series} />

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
