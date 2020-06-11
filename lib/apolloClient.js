import { useMemo } from 'react'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

import { resolvers } from '../local-state/resolvers'
import fetch from 'isomorphic-unfetch'
import { createUploadLink } from 'apollo-upload-client'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'

let apolloClient

function createApolloClient() {
   const uploadLink = createUploadLink({
      uri: 'http://localhost:1111/graphql', // Server URL (must be absolute)
      credentials: 'include', // Additional fetch() options like `credentials` or `headers`
      fetch,
   })
   const errorLink = onError(({ graphQLErrors }) => {
      if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
   })
   return new ApolloClient({
      ssrMode: typeof window === 'undefined',
      link: new HttpLink({
         uri: 'https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn', // Server URL (must be absolute)
         credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      }),
      link: ApolloLink.from([errorLink, uploadLink]),
      cache: new InMemoryCache(),
      resolvers
   })
}


export function initializeApollo(initialState = null) {
   const _apolloClient = apolloClient ?? createApolloClient()

   // If your page has Next.js data fetching methods that use Apollo Client, the initial state
   // gets hydrated here
   if (initialState) {
      _apolloClient.cache.restore(initialState)
   }
   // For SSG and SSR always create a new Apollo Client
   if (typeof window === 'undefined') return _apolloClient
   // Create the Apollo Client once in the client
   if (!apolloClient) apolloClient = _apolloClient

   return _apolloClient
}

export function useApollo(initialState) {
   const store = useMemo(() => initializeApollo(initialState), [initialState])
   return store
}