import { useEffect } from 'react'
import { withApollo } from "../../../lib/apollo"
import AuthPanelLayout from "../../../components/AuthPanelLayout"
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'
import Button from '../../../components/Button'
import { useAlert } from 'react-alert'
import { useRouter } from 'next/router'

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

const AUTHORS_LIST_QUERY = gql`
   {
      authors {
         fullName
         email
         username
         created_at
         posts{
            title
         }
      }
   }
`
const DELETE_AUTHOR = gql`
   mutation DeleteAuthor($username: String!) {
      deleteAuthor (username: $username){
         status
      }
   }
`

const Authors = () => {

   const alert = useAlert()
   const router = useRouter()

   const { loading: authStatusLoading, error: authStatusError, data: atuhStatusData } = useQuery(GET_AUTH_STATUS)
   const { loading, error, data } = useQuery(AUTHORS_LIST_QUERY, { notifyOnNetworkStatusChange: true })
   const [deleteAuthor] = useMutation(DELETE_AUTHOR);

   const onDeleteAuthor = (username) => {
      if (!authStatusLoading && atuhStatusData) {
         if (username !== atuhStatusData.authStatus.username) {
            deleteAuthor({
               variables: { username }, refetchQueries: [{ query: AUTHORS_LIST_QUERY }],
            }).then(({ data }) => {
               (data && data.deleteAuthor && data.deleteAuthor.status) ? alert.success('Author deleted!') : alert.error('Error in deleting author!')
            }).catch(err => alert.error(err.toString()));
         }
         else {
            alert.error('You can not delete your own profile!')
         }
      }
   }

   useEffect(() => {
      (router.query && router.query.create && router.query.create == "success") && alert.success('Author created!');
      (router.query && router.query.update && router.query.update == "success") && alert.success('Author updated!');
   }, [])

   return (
      <AuthPanelLayout pageTitle="Authors">
         <section className="panel-list-container">
            {loading && <p>Loading...</p>}
            {error && <p>error!</p>}
            {data && <div><h2 className="inline-page-headline panel-page-title">Authors</h2></div>}
            {data && ((data.authors && data.authors.length) ? data.authors.map((singleAuthor, index) => <div className="single-author-row" key={index}>
               <div>
                  <span className="large-text">{singleAuthor.fullName}</span> <span className="light-text">({singleAuthor.username})</span>
               </div>
               <div>
                  {singleAuthor.email && 'Email:' + singleAuthor.email}
               </div>
               <div>
                  Posts count: {singleAuthor.posts ? singleAuthor.posts.length : '0'}
               </div>
               <div>
                  <Button label="Delete" className="button red-button"
                     onClick={() => onDeleteAuthor(singleAuthor.username)}
                  />
               </div>
            </div>) : 'authors list is empty!')}

            <style jsx>{`
            .single-author-row{
               padding: 0.5rem 1rem;
               box-shadow: 0 0.2rem 1.3rem -0.3rem rgba(0,0,0,0.15);
               margin-bottom: 1.5rem;
               border-radius: 0.5rem;
               overflow: hidden;
               display: flex;
               flex-direction: row;
               flex-wrap: nowrap;
               justify-content: space-between;
               align-items: center;                           
            }
            @media screen and (max-width: 767px){
               .single-author-row{
                  display: flex;
                  flex-direction: column;
                  flex-wrap: nowrap;
                  justify-content: flex-start;
               }
               .single-author-row >div:first-of-type{
                  display: block;
                  margin-bottom: 1rem;
                  margin-top: 0.3rem;
               }
            }
            .single-author-row >div:nth-of-type(3){
               display: flex;
               flex-direction: row;
               flex-wrap: nowrap;
               justify-content: space-between;
               align-items: flex-start;                           
            }

         `}</style>
         </section>
      </AuthPanelLayout>
   )
}

export default withApollo({ ssr: true })(Authors)