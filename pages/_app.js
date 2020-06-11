import { ApolloProvider } from '@apollo/react-hooks'
import { useApollo } from '../lib/apolloClient'

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
const alertOptions = {
   position: positions.BOTTOM_CENTER,
   timeout: 4000,
   offset: '30px',
   transition: transitions.SCALE
}

export default function App({ Component, pageProps }) {
   const apolloClient = useApollo(pageProps.initialApolloState)

   return (
      <ApolloProvider client={apolloClient}>
         <AlertProvider template={AlertTemplate} {...alertOptions}>
            <Component {...pageProps} />
         </AlertProvider>
      </ApolloProvider>
   )
}
