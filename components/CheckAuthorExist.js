import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'
import ErrorMessage from './ErrorMessage'
import PostList from './PostList'

export const AUTHORS_LIST_QUERY = gql`
   {
      authors {
         fullName
      }
   }
`

export default function CheckAuthorExist() {
   const { loading, error, data } = useQuery(
      AUTHORS_LIST_QUERY,
      {
         notifyOnNetworkStatusChange: true,
      }
   )

   if (error) return <ErrorMessage message="Error loading posts." />
   if (loading) return <div>Loading</div>
   const { authors } = data

   return (
      <>
         {authors && authors.length ? <PostList /> : <p>No author found! it seems weblog in new. for creating first author, go to <Link href="/register"><a>this page</a></Link></p>}
      </>
   )
}
