import { useEffect } from 'react'
import App from '../components/App'
import Header from '../components/Header'
import Input from '../components/Input'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import { withApollo } from '../lib/apollo'
import Router from 'next/router'


export const AUTHORS_LIST_QUERY = gql`
   {
      authors {
         fullName
      }
   }
`

// This component is just for initializing the first manager at the begining.
const Register = () => {

   const { loading, error, data } = useQuery(
      AUTHORS_LIST_QUERY,
      {
         notifyOnNetworkStatusChange: true,
      }
   )

   useEffect(() => {
      const { authors } = data
      if (authors.length) {
         // check, if initial author (manager) exist, then return to home page
         Router.push(`/`)
      }
   }, [])

   if (error) return <ErrorMessage message="Error on loading data from server." />
   if (loading) return <Loading />
   return (
      <App>
         <Header />
         <div className="maxwidth">
            <div className="narrow-block">
               <h1>Initialize Author Manager</h1>
               <Input type="text" label="Full Name:" placeholder="Pouya Jabbarisani" fullWidth={true} />
               <Input type="test" label="Username:" placeholder="pouya" fullWidth={true} />
               <Input type="email" label="Email:" placeholder="pouyajabbarisani@gmail.com" fullWidth={true} />
               <Input type="password" label="Password:" placeholder="minimum 6 letters and numbers" fullWidth={true} />
               <button className="fullwidth-button">Initialize</button>
            </div>
         </div>
         <style jsx>{`
            h1{
               font-size: 1.4rem;
            }
         `}</style>
      </App>
   )
}

export default withApollo({ ssr: true })(Register)
