export * from "~/routes/$";
import { json, MetaFunction, useLoaderData } from "@remix-run/react";
import notionPage from "../content/notion/notionPage.json"
import { LoaderFunctionArgs } from "@remix-run/node";
import { buildHeader } from "~/utils";
import Container from "~/components/Container";
import YouTubeEmbed from "~/components/YouTubeEmbed";
import parse from "html-react-parser"


export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const slug = `/${params['*']}`
  const page = notionPage.find(el => el.slug === slug)
  return json({
    url: request.url,
    page
  });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return buildHeader({
    pageTitle: data?.page?.title,
    description: data?.page?.excerpt,
    url: data?.url
  })
}

export default function CatchAll() {
  const { page } = useLoaderData<typeof loader>()

  if(!page) {
    return (
      <div className="m-8 py-20 rounded-xl">
        <Container className="flex flex-col gap-2 text-center">
          <header>
            <h1 className="my-0 py-0">Page not found</h1>
          </header>
          <div className="post-content mb-4">
            <p>Sorry, we couldn’t find the page you were looking for.</p>
            <p>
              <a className="underline" href="/">Go back home</a>
            </p>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="bg-gradient m-8 pt-8 rounded-xl">
      <Container>
        <article className="blog-post" itemScope itemType="http://schema.org/Article" >

        <header>
          <h1 className="my-0 py-0">{parse(page.title)}</h1>
          {page.youTubeURL && (
            <YouTubeEmbed url={page.youTubeURL} />
          )}
        </header>

        {!!page.html && (
          <div className="post-content mb-4">{parse(page.html)}</div>
        )}
        </article>
      </Container>
    </div>
  )
}