import App from '../components/App'
import Header from '../components/Header'
import CheckAuthorExist from '../components/CheckAuthorExist'
import PostList from '../components/PostList'
import Head from 'next/head'
import Footer from '../components/Footer'

import POSTS_LIST_QUERY from '../queries/posts-list'
import { initializeApollo } from '../lib/apolloClient'

const IndexPage = () => (
  <App>
    <Head>
      <title>Node React Blog | First Page</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>

    <Header />
    <CheckAuthorExist />
    <PostList />
    <Footer />
  </App>
)

export async function getServerSideProps(context) {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: POSTS_LIST_QUERY,
    variables: { page: 1 },
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default IndexPage