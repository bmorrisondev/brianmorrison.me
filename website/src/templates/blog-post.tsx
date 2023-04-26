import React, { useEffect, useState } from "react"
import { graphql, navigate } from "gatsby"
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
import Calendar from "../components/svgs/Calendar"

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    post: notionPost(id: { eq: $id }) {
      id
      excerpt
      html
      title
      publishOn(formatString: "MMMM DD, YYYY")
      featuredImage
      codeURL
      blogHeader
      series {
        title
        slug 
        posts {
          slug
          title
          seriesOrder
        }
      }
    }
    previous: notionPost(id: { eq: $previousPostId }) {
      slug
      title
    }
    next: notionPost(id: { eq: $nextPostId }) {
      slug
      title
    }
  }
`

const BlogPostTemplate = ({ data, location }) => {
  const [series, setSeries] = useState<SeriesCollection>()
  const { previous, next, post } = data

  useEffect(() => {
    if(post?.series?.length > 0) {
      const sc: SeriesCollection = {
        entries: []
      }
      sc.name = post.series[0].title
      let sp: SeriesEntry[] = []
      post.series[0].posts.forEach(p => {
        let entry: SeriesEntry = {
          order: p.seriesOrder,
          slug: p.slug,
          title: p.title
        }
        sp.push(entry)
      })
      sp.sort((a: SeriesEntry, b: SeriesEntry) => Number(a.order) < Number(b.order) ? -1 : 1)
      sc.entries = sp
      if(post.series[0].icon) {
        sc.icon = post.series[0].icon
      }
      setSeries(sc)
    }
  }, [])

  function scrollToSeriesListing() {
    let el = document.querySelector("#series_collection")
    if(el) {
      el.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }

  return (
    <DefaultLayout
      location={location}
      pageTitle={post.title}
      ogImageUrl={post.featuredImage ? post.featuredImage : undefined}
      description={post.excerpt} >
      <Container>
        <article className="blog-post" itemScope itemType="http://schema.org/Article" >



          {post.blogHeader && post.blogHeader.length > 0 && (
            <img src={post.blogHeader[0]} alt="Blog post header" className="header-img" />
          )}
          
          <header>
            <h1 itemProp="headline" className="my-0 py-0">{parse(post.title)}</h1>
            <div className="post-meta">
              <StylizedList>
                <StylizedListItem><Calendar />{post.publishOn}</StylizedListItem>

                {series?.name && (
                  <StylizedListItem onClick={() => scrollToSeriesListing()}>
                    <Series /> Series: {series.name}
                  </StylizedListItem>
                )}

                {post.codeURL && (
                  <StylizedListItem to={post.codeURL}>
                    <GitHub /> Visit GitHub Repo
                  </StylizedListItem>
                )}
              </StylizedList>
            </div>
            {post.blogPostFields && post.blogPostFields.videoUrl && (
              <YouTubeEmbed url={post.blogPostFields.videoUrl} />
            )}
          </header>

          {!!post.html && (
            <div className="post-content mb-4">{parse(post.html, { replace: replaceCode })}</div>
          )}

          <BlogFooter 
            location={location} 
            articleTitle={parse(post.title) as string} 
            seriesCollection={series} />
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
