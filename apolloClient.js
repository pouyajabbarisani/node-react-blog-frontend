import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { resolvers } from './local-state/resolvers'
import { HttpLink } from 'apollo-link-http' // new HttpLink - using upload client instead for upload support
import fetch from 'isomorphic-unfetch'
import { createUploadLink } from 'apollo-upload-client'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'


export default function createApolloClient(initialState, ctx) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  const uploadLink = createUploadLink({
    uri: 'http://localhost:1111/graphql', // Server URL (must be absolute)
    credentials: 'include', // Additional fetch() options like `credentials` or `headers`
    fetch,
  })
  const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
  })
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: ApolloLink.from([errorLink, uploadLink]),
    cache: new InMemoryCache().restore(initialState),
    resolvers // local state resolvers
  })
}


