import App from '../components/App'
import Header from '../components/Header'
import CheckAuthorExist from '../components/CheckAuthorExist'
import PostList from '../components/PostList'
import Head from 'next/head'
import { withApollo } from '../lib/apollo'
import Footer from '../components/Footer'

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

export default withApollo({ ssr: true })(IndexPage)
