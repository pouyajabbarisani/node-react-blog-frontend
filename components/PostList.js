import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import gql from 'graphql-tag'
import ErrorMessage from './ErrorMessage'

export const ALL_POSTS_QUERY = gql`
   {
    posts {
      postID
      slug
      title
      content
      featuredImage
      thumnail
      author {
        fullName
        username
      }
    }
  }
`
export default function PostList() {
  const { loading, error, data
    // , fetchMore, networkStatus
  } = useQuery(
    ALL_POSTS_QUERY,
    {
      // variables: allPostsQueryVars,
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  )

  // const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

  // const loadMorePosts = () => {
  //   fetchMore({
  //     variables: {
  //       skip: allPosts.length,
  //     },
  //     updateQuery: (previousResult, { fetchMoreResult }) => {
  //       if (!fetchMoreResult) {
  //         return previousResult
  //       }
  //       return Object.assign({}, previousResult, {
  //         // Append the new posts results to the old one
  //         allPosts: [...previousResult.allPosts, ...fetchMoreResult.allPosts],
  //       })
  //     },
  //   })
  // }

  if (error) return <ErrorMessage message="Error loading posts." />
  if (loading
    // && !loadingMorePosts
  ) return <div>Loading</div>

  const { posts } = data
  // const areMorePosts = allPosts.length < _allPostsMeta.count

  return (
    <section>
      {posts.map((post, index) => (
        <div key={index}>
          <a href={post.slug}>{post.title}</a>
        </div>
      ))}
      {/* {areMorePosts && (
        <button onClick={() => loadMorePosts()} disabled={loadingMorePosts}>
          {loadingMorePosts ? 'Loading...' : 'Show More'}
        </button>
      )} */}
      <style jsx>{``}</style>
    </section>
  )
}
