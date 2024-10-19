import { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json, useLoaderData } from '@remix-run/react';
import notionPost from "../content/notion/notionPost.json"
import Container from '~/components/Container';
import { SeriesCollection, SeriesEntry } from '~/models';
import { useEffect, useState } from 'react';
import parse from "html-react-parser"
import StylizedList from '~/components/StylizedList';
import StylizedListItem from '~/components/StylizedListItem';
import { Calendar } from 'lucide-react';
import Series from '~/components/svgs/Series';
import GitHub from '~/components/svgs/GitHub';
import YouTubeEmbed from '~/components/YouTubeEmbed';
import BlogFooter from '~/components/BlogFooter';
import { replaceCode } from "../components/PostCode";
import { buildHeader } from '~/utils';

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const post = notionPost.find(el => el.slug === params.slug)
  return json({
    url: request.url,
    post
  });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return buildHeader({
    pageTitle: data?.post?.title,
    description: data?.post?.excerpt,
    ogImageUrl: data?.post?.featuredImage,
    url: data?.url
  })
}

function BlogPost() {
  const { post } = useLoaderData<typeof loader>()
  const [series, setSeries] = useState<SeriesCollection>()
  // const { previous, next, post } = data

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
    <Container>
      <article className="blog-post" itemScope itemType="http://schema.org/Article" >

      {post.blogHeader && post.blogHeader.length > 0 && (
        <img src={post.blogHeader[0]} alt="Blog post header" className="header-img" />
      )}

      <header>
        <h1 className="my-0 py-0">{parse(post.title)}</h1>
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
        {post.youTubeURL && (
          <YouTubeEmbed url={post.youTubeURL} />
        )}
      </header>

      {!!post.html && (
        // <div className="post-content mb-4">{parse(post.html)}</div>
        <div className="post-content mb-4">{parse(post.html, { replace: replaceCode })}</div>
      )}

      <BlogFooter
        articleTitle={parse(post.title) as string}
        seriesCollection={series} />
      </article>
    </Container>
  )
}

export default BlogPost