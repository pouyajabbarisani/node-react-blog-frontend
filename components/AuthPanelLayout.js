import { useEffect, useState } from 'react'
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
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
const GET_AUTH_STATUS = gql`
   query AuthStatus {
      authStatus @client {
         fullName
         isAuthenticated
         isManager
         username
      }
   }
`;
const SET_AUTH = gql`
   mutation SetAuth($fullName: String!, $username: String!, $isManager: Boolean) {
      setAuth(fullName: $fullName, username: $username, isManager: $isManager) @client
   }
`;


export const AuthPanelLayout = (props) => {

   const { data, loading } = useQuery(GET_AUTH_STATUS);
   const [getAuthStatus, { data: checkData, loading: checkLoading, error: checkError }] = useLazyQuery(CHECK_AUTH);
   const [setLocalAuthStatus] = useMutation(SET_AUTH);
   const [authData, setAuthData] = useState(null);
   const [authLoading, setAuthLoading] = useState(true);

   useEffect(() => {
      // check auth from local state of apollo on re-routing without full page reload 
      if (!loading) {
         if (data) {
            setAuthData(data.authStatus)
            setAuthLoading(false)
         }
         else if (!data) {
            // if not exist, then check from server
            getAuthStatus()
         }
      }
   }, [loading])

   useEffect(() => {
      // chech auth from server on full page reload
      if (!checkLoading && !checkLoading && checkData) {
         setLocalAuthStatus({ variables: { fullName: checkData.checkAuth.fullName, username: checkData.checkAuth.username, isManager: checkData.checkAuth.isManager } }).then(() => {
            setAuthData(checkData.checkAuth)
            setAuthLoading(false)
         })
      }
      else if (!checkLoading && checkError) {
         setAuthData(null)
         setAuthLoading(false)
         Router.push('/login');
      }
   }, [checkData, checkLoading, checkError])

   if (authLoading) return <PanelLoading />
   if (!authLoading && (!authData)) return <p>Login again!</p>
   if (!authLoading && authData) return <PanelLayout pageTitle={props.pageTitle} authData={authData}>{props.children}</PanelLayout>
}

export default withApollo({ ssr: true })(AuthPanelLayout)