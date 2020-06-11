import App from '../../../../components/App'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import PostList from '../../../../components/PostList'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'

import CATEGORY_POSTS_LIST_QUERY from '../../../../queries/category-posts-list'
import { initializeApollo } from '../../../../lib/apolloClient'

const IndexPage = () => {
   const router = useRouter();
   return (
      <App>
         <Head>
            <title>Posts list {router.query.pagenumber && ' | page' + router.query.pagenumber}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         </Head>

         <Header />
         <PostList categorized={true} slug={router.query.catslug} page={router.query.pagenumber} />

         <Footer />
      </App>
   )
}

export async function getServerSideProps(context) {
   const apolloClient = initializeApollo()

   await apolloClient.query({
      query: CATEGORY_POSTS_LIST_QUERY,
      variables: { slug: context.params.catslug, page: parseInt(context.params.pagenumber) },
   })

   return {
      props: {
         initialApolloState: apolloClient.cache.extract(),
      },
   }
}

export default IndexPage