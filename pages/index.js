import App from '../components/App'
import Header from '../components/Header'
import CheckAuthorExist from '../components/CheckAuthorExist'
import { withApollo } from '../lib/apollo'

const IndexPage = () => (
  <App>
    <Header />
    <CheckAuthorExist />
  </App>
)

export default withApollo({ ssr: true })(IndexPage)
