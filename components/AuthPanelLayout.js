import { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { withApollo } from '../lib/apollo'
import Router from 'next/router'
import PanelLoading from './PanelLoading'
import PanelLayout from './PanelLayout'

const CHECK_AUTH = gql`
   query {
      checkAuth{
         fullName
         username
         isManager
      }
   }
`

const AuthPanelLayout = (props) => {
   const { loading, error, data } = useQuery(CHECK_AUTH)

   useEffect(() => {
      if (loading == false && (!data || !data.checkAuth || !data.checkAuth.username)) {
         Router.push('/login');
      }
   }, [loading]);

   if (loading) return <PanelLoading />
   if (loading == false && (!data || !data.checkAuth || !data.checkAuth.username)) return <p>Login again!</p>
   return <PanelLayout pageTitle={props.pageTitle} authData={data}>{props.children}</PanelLayout>
}

export default withApollo({ ssr: true })(AuthPanelLayout)