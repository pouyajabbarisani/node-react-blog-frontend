import { useEffect } from 'react'
import { withApollo } from "../../../lib/apollo"
import AuthPanelLayout from "../../../components/AuthPanelLayout"
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'
import Button from '../../../components/Button'
import { useAlert } from 'react-alert'
import { useRouter } from 'next/router'


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
// const DELETE_CATEGORY = gql`
//    mutation DeleteCategory($slug: String!) {
//       deleteCategory (slug: $slug){
//          status
//       }
//    }
// `

const Authors = () => {

   const alert = useAlert()
   const router = useRouter()

   const { loading, error, data } = useQuery(AUTHORS_LIST_QUERY, { notifyOnNetworkStatusChange: true })
   // const [deleteCategory] = useMutation(DELETE_CATEGORY);

   // const onDeleteCategory = (slug) => {
   //    deleteCategory({
   //       variables: { slug }, refetchQueries: [{
   //          query: gql`
   //          {
   //             categories {
   //                title
   //                slug
   //                posts{
   //                   title
   //                }
   //             }
   //          }
   //       `}],
   //    }).then(({ data }) => {
   //       (data && data.deleteCategory && data.deleteCategory.status) ? alert.success('Category deleted!') : alert.error('Error in deleting the category!')
   //    }).catch(err => alert.error(err.toString()));
   // }

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
                  <Link href={`/panel/authors/${singleAuthor.slug}`}>
                     <a className="button">Edit</a>
                  </Link>
                  <Button label="Delete" className="button red-button"
                  // onClick={() => onDeleteCategory(singleAuthor.slug)} 
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