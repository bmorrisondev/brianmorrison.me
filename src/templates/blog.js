import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostList from '../components/PostList'
import Pagination from '../components/Pagination'

export default class BlogPage extends React.Component {
  render() {
    const { data, pageContext } = this.props
    const { edges: posts } = data.allWordpressPost

    return (
      <Layout>
        <PostList posts={posts} title="Blog" />
        <Pagination pageContext={pageContext} pathPrefix="/" />
      </Layout>
    )
  }
}

BlogPage.propTypes = {
  data: PropTypes.shape({
    allWordpressPost: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
  pageContext: PropTypes.shape({
    currentPage: PropTypes.number,
    numPages: PropTypes.number,
  }),
}

export const pageQuery = graphql`
  query BlogQuery($limit: Int!, $skip: Int!) {
    wpgraphql {
      posts(
        where:{ 
          orderby:{
            field: DATE
            order: DESC
          }
        }
        first: $limit
      ) {
        edges {
          node {
            ...PostListFields
          }
        }
      }
    }
  }
`
// export const pageQuery = graphql`
//   query BlogQuery($limit: Int!, $skip: Int!) {
//     wpgraphql {
//       posts(
//         where:{ 
//           orderby:{
//             field: DATE
//             order: DESC
//           }
//         }
//         first: $limit
//         after: $skip
//       ) {
//         edges {
//           node {
//             ...PostListFields
//           }
//         }
//       }
//     }
//   }
// `