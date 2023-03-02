import React, { useEffect, useState } from "react"
import { graphql, navigate } from "gatsby"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import parse from "html-react-parser"
import DefaultLayout from "../layouts/DefaultLayout"
import YouTubeEmbed from "../components/YouTubeEmbed"
import StylizedList from "../components/StylizedList"
import GitHub from "../components/svgs/GitHub"
import { SeriesCollection, SeriesEntry } from "../models"
import BlogFooter from "../components/BlogFooter"
import { replaceCode } from "../components/PostCode"
import Container from "../components/Container"
import Button from "../components/Button"
import StylizedListItem from "../components/StylizedListItem"
import Series from "../components/svgs/Series"

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
    hide: post.blogPostFields.hideFeaturedImage ? true : false,
    alt: post.featuredImage?.node?.alt || ``,
  }

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
      <Container>
        {/* <Seo title={post.title} description={post.excerpt} /> */}
        <article className="blog-post" itemScope itemType="http://schema.org/Article" >
          <header>
            {/* <small className="post-date"><FontAwesomeIcon icon={faCalendar} />{post.date}</small> */}
            <h1 itemProp="headline">{parse(post.title)}</h1>
            {(series || githubUrl !== "") && (
            <div className="post-meta">
              <StylizedList>
                {series && series.name && (
                  <StylizedListItem onClick={() => scrollToSeriesListing()}>
                    <Series /> Series: {series.name}
                  </StylizedListItem>
                )}
                {githubUrl && (
                  <StylizedListItem to={githubUrl}>
                    <GitHub /> Visit GitHub Repo
                  </StylizedListItem>
                )}
              </StylizedList>
            </div>

            )}
            {!hideFeaturedImage && featuredImage?.data && (
              <GatsbyImage
                image={featuredImage.data}
                alt={featuredImage.alt}
                className="rounded border-accent-2 border mb-2"
              />
            )}
            {post.blogPostFields && post.blogPostFields.videoUrl && (
              <YouTubeEmbed url={post.blogPostFields.videoUrl} />
            )}
          </header>

          {!!post.content && (
            // <div className="post-content">{parse(post.content)}</div>
            <div className="post-content">{parse(post.content, { replace: replaceCode })}</div>
          )}

          <BlogFooter location={location} articleTitle={parse(post.title) as string} seriesCollection={series} />

          <footer>
            {/* <Bio author={post.author.node} /> */}
          </footer>
        </article>

        <nav className="blog-post-nav">
          <ul className="flex justify-between space-x-2">
            <li className="flex-1">
              {previous && (
                <Button onClick={() => navigate(`/blog/${previous.slug}`)}>
                  ← {parse(previous.title)}
                </Button>
              )}
            </li>

            <li className="flex-1">
              {next && (
                <Button onClick={() => navigate(`/blog/${next.slug}`)}>
                  {parse(next.title)} →
                </Button>
              )}
            </li>
          </ul>
        </nav>
      </Container>

    </DefaultLayout>
  )
}

export default BlogPostTemplate
