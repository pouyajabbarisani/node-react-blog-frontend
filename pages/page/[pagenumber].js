import App from '../../components/App'
import Header from '../../components/Header'
import PostList from '../../components/PostList'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import Footer from '../../components/Footer'

import POSTS_LIST_QUERY from '../../queries/posts-list'
import { initializeApollo } from '../../lib/apolloClient'

const IndexPage = () => {
   const router = useRouter();
   return (
      <App>
         <Head>
            <title>Posts list</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         </Head>

         <Header />
         <PostList page={router.query.pagenumber} />
         <Footer />
      </App>
   )
}

export async function getServerSideProps(context) {
   const apolloClient = initializeApollo()

   await apolloClient.query({
      query: POSTS_LIST_QUERY,
      variables: { page: parseInt(context.params.pagenumber) },
   })

   return {
      props: {
         initialApolloState: apolloClient.cache.extract(),
      },
   }
}

export default IndexPage