import { graphql, useStaticQuery, Link } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import Container from '../components/Container'
import DefaultLayout from '../layouts/DefaultLayout'

// const BlogLink = styled(Link)`
//   display: flex;
//   font-weight: bold;
//   text-decoration: none;
//   color: inherit;
//   align-items: center;
//   font-size: 20px;
//   padding-bottom: 20px;

//   span {
//     margin-left: 10px;
//   }

//   .post-icon {
//     min-width: 25px;
//     min-height: 25px;
//     border-radius: 5px;
//   }
// `

function Blog({ location }) {
  const data = useStaticQuery(graphql`
    {
      allWpPost(sort: {fields: [date], order: DESC}) {
        edges {
          node {
            id
            slug
            uri
            title
            blogPostFields {
              icon {
                altText
                gatsbyImage(width: 25, height: 25)
              }
            }
            series {
              nodes {
                seriesFields {
                  icon {
                    altText
                    gatsbyImage(width: 25, height: 25)
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const posts = data.allWpPost.edges.map(el => el.node)

  return (
    <DefaultLayout location={location} pageTitle="Blog">
      <Container>
        <h1>Blog</h1>
        <div className='flex flex-col space-y-4 text-lg font-bold'>
          {posts.map(p => (
            <Link to={`/blog/${p.slug}`} className='text-black hover:text-gradientBlue flex items-center'>
              {p.series && p.series.nodes && p.series.nodes.length && p.series.nodes[0].seriesFields && p.series.nodes[0].seriesFields.icon ? (
                <GatsbyImage className="w-[25px] h-[25px] mr-2 rounded"
                  image={p.series.nodes[0].seriesFields.icon.gatsbyImage}
                  alt={p.series.nodes[0].seriesFields.icon.altText} />
                ) : p.blogPostFields && p.blogPostFields.icon
                ? <GatsbyImage className="w-[25px] h-[25px] mr-2 rounded"
                    image={p.blogPostFields.icon.gatsbyImage}
                    alt={p.blogPostFields.icon.altText} />
                : <StaticImage className="w-[25px] h-[25px] mr-2 rounded"
                    src="../images/emoji/memo.png"
                    alt="default post icon" />
              }
              <span>{p.title}</span>
            </Link>
          ))}
        </div>
      </Container>
    </DefaultLayout>
  )
}

export default Blog