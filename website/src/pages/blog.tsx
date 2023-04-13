import { graphql, useStaticQuery, Link } from 'gatsby'
import React from 'react'
import Container from '../components/Container'
import DefaultLayout from '../layouts/DefaultLayout'
import PostIcon from '../components/PostIcon'

function Blog({ location }) {
  const data = useStaticQuery(graphql`
    {
      allNotionPost(sort: {publishOn: DESC}, filter: {status:{ eq:"Published"}}) {
        edges {
          node {
            id
            slug
            icon
            title
            category
            publishOn(formatString: "MMMM DD, YYYY")
            series {
              icon
            }
          }
        }
      }
    }
  `)

  const posts = data.allNotionPost.edges.map(el => el.node)

  return (
    <DefaultLayout location={location} pageTitle="Blog">
      <Container>
        <h1>Blog</h1>
        <div className='flex flex-col mt-2'>
          {posts.map(p => (
            <div className='my-2'>
              {/* Meta stuff */}
              <div className='flex text-sm'>
                {p.publishOn}
                {/* {p.category ? (
                  <> in&nbsp;<Link className='border-b border-b-gray-300 text-black hover:border-b-black transition' to="">{p.category}</Link></>) : ""} */}
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
    </DefaultLayout>
  )
}

export default Blog