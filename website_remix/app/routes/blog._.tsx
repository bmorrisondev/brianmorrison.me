import { json, Link, useLoaderData } from '@remix-run/react';
import notionPost from "../content/notionPost.json"
import Container from '~/components/Container';
import PostIcon from '~/components/PostIcon';

export const loader = async () => {
  // const data = JSON.parse(fileContents);

  const posts: {title: string, slug: string}[] = []

  notionPost.forEach(el => posts.push({
    title: el.title,
    slug: el.slug
  }))

  posts.sort((a, b) => new Date(a.publishOn) < new Date(b.publishOn) ? -1: 1)

  return json({
    posts
  });
};

function BlogIndex() {
  const { posts } = useLoaderData<typeof loader>()

  return (
    <Container>
      <h1>Blog</h1>
      <div className='flex flex-col mt-2'>
        {posts.map(p => (
          <div key={p.id} className='my-2'>
            {/* Meta stuff */}
            <div className='flex text-sm'>
              {p.publishOn}
            </div>

            {/* Main link */}
            <Link to={`/blog/${p.slug}`}
              className='text-black text-lg font-bold transition hover:text-gradientBlue flex items-center'>
              <PostIcon post={p} />
              <span>{p.title}</span>
            </Link>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default BlogIndex