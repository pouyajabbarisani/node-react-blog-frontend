import { useEffect } from 'react'
import { withApollo } from "../../../lib/apollo"
import AuthPanelLayout from "../../../components/AuthPanelLayout"
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'
import Button from '../../../components/Button'
import { useAlert } from 'react-alert'
import { useRouter } from 'next/router'


const CATEGORIES_LIST_QUERY = gql`
   {
      categories {
         title
         slug
         posts{
            title
         }
      }
   }
`
const DELETE_CATEGORY = gql`
   mutation DeleteCategory($slug: String!) {
      deleteCategory (slug: $slug){
         status
      }
   }
`

const Categories = () => {

   const alert = useAlert()
   const router = useRouter()

   const { loading, error, data } = useQuery(CATEGORIES_LIST_QUERY, { notifyOnNetworkStatusChange: true })
   const [deleteCategory] = useMutation(DELETE_CATEGORY);

   const onDeleteCategory = (slug) => {
      deleteCategory({
         variables: { slug }, refetchQueries: [{
            query: gql`
            {
               categories {
                  title
                  slug
                  posts{
                     title
                  }
               }
            }
         `}],
      }).then(({ data }) => {
         (data && data.deleteCategory && data.deleteCategory.status) ? alert.success('Category deleted!') : alert.error('Error in deleting the category!')
      }).catch(err => alert.error(err.toString()));
   }

   useEffect(() => {
      (router.query && router.query.create && router.query.create == "success") && alert.success('Category created!');
      (router.query && router.query.update && router.query.update == "success") && alert.success('Category updated!');
   }, [])

   return (
      <AuthPanelLayout pageTitle="Categories">
         <section className="panel-list-container">
            {loading && <p>Loading...</p>}
            {error && <p>error!</p>}
            {data && <div><h2 className="inline-page-headline panel-page-title">Categories</h2></div>}
            {data && ((data.categories && data.categories.length) ? data.categories.map((singleCategory, index) => <div className="single-category-row" key={index}>
               <div>
                  <span className="large-text">{singleCategory.title}</span> <span className="light-text">({singleCategory.slug})</span>
               </div>
               <div>
                  Posts in this category: {singleCategory.posts ? singleCategory.posts.length : '0'}
               </div>
               <div>
                  <Link href={`/panel/categories/${singleCategory.slug}`}>
                     <a className="button">Edit</a>
                  </Link>
                  <Button label="Delete" className="button red-button" onClick={() => onDeleteCategory(singleCategory.slug)} />
               </div>
            </div>) : 'Categories list is empty!')}

            <style jsx>{`
            .single-category-row{
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
               .single-category-row{
                  display: flex;
                  flex-direction: column;
                  flex-wrap: nowrap;
                  justify-content: flex-start;
               }
               .single-category-row >div:first-of-type{
                  display: block;
                  margin-bottom: 1rem;
                  margin-top: 0.3rem;
               }
            }
            .single-category-row >div:nth-of-type(3){
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

export default withApollo({ ssr: true })(Categories)