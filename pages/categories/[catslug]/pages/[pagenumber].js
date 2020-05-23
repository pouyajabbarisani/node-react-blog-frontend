import App from '../../../../components/App'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import PostList from '../../../../components/PostList'
import { withApollo } from '../../../../lib/apollo'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'

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

export default withApollo({ ssr: true })(IndexPage)
