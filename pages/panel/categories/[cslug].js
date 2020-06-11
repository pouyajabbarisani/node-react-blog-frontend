// edit category file

import { useState, useEffect } from 'react'
import AuthPanelLayout from '../../../components/AuthPanelLayout'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import slugify from 'slugify'
import { useAlert } from 'react-alert'
import { createCategoryValidator } from '../../../validators/create-category'
import Router, { useRouter } from 'next/router'

const GET_CATEGORY = gql`
   query Category($slug: String!) {
      category (slug: $slug){
         title
         slug
      }
   }
`

const UPDATE_CATEGORY = gql`
   mutation EditCategory( $slug: String!, $updatedSlug: String, $updatedTitle: String){
      editCategory(slug: $slug, updatedSlug: $updatedSlug, updatedTitle: $updatedTitle){
         title
         slug
      }
   }
`

const AddCategory = () => {

   const alert = useAlert()
   const router = useRouter()
   const { loading, error, data } = useQuery(GET_CATEGORY, { variables: { slug: router.query.cslug }, notifyOnNetworkStatusChange: true })
   const [isButtonLoading, setIsButtonLoading] = useState(false)
   const [formFields, setFormFields] = useState({});
   const [checkSlug, { called, loading: checkSlugLoading, data: checkSlugData }] = useLazyQuery(GET_CATEGORY);

   useEffect(() => {
      if (!loading && data) {
         setFormFields({ title: data.category.title, slug: data.category.slug })
      }
   }, [loading])

   const [updateCategory] = useMutation(UPDATE_CATEGORY);

   const onEditCategory = async (e) => {
      e.preventDefault();
      if (called && !checkSlugLoading && (checkSlugData && checkSlugData.category && (checkSlugData.category.slug != router.query.cslug))) {
         alert.error('Entered slug is exist, please enter another slug!')
      }
      else {
         if ((!formFields.title || formFields.title == '') && (!formFields.slug || formFields.slug == '')) {
            alert.error('Change something to update!');
         }
         else {
            setIsButtonLoading(true);
            const updatedObject = {};
            (formFields.title && formFields.title != '') && (updatedObject.updatedTitle = formFields.title.toString());
            (formFields.slug && formFields.slug != '') && (updatedObject.updatedSlug = formFields.slug.toString());
            updateCategory({
               variables: {
                  ...updatedObject,
                  slug: router.query.cslug,
               }, refetchQueries: [{
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
               if (data && data.editCategory && data.editCategory.title) {
                  Router.push('/panel/categories?update=success')
               }
               else {
                  alert.error('Unknown Error!')
               }
            }).catch(err => alert.error(err.toString()));
            setIsButtonLoading(false);
         }
      }
   }

   return (
      <AuthPanelLayout pageTitle="Edit Category">
         <section className="panel-centered-content">
            {loading && <p>Loading...</p>}
            {error && <p>error!</p>}
            {data && <div><h2 className="panel-page-title">Edit {data && data.category.title && data.category.title ? data.category.title : ''} Category</h2></div>}
            {data && data.category && data.category.title && <div className="single-category-row" >

               <Input
                  type="text"
                  name="title"
                  label="Title*:"
                  onChange={e => setFormFields({ ...formFields, title: e.target.value.toString() })}
                  value={formFields.title || ''}
                  fullWidth={true}
                  required={true} />

               <Input
                  type="text"
                  name="slug"
                  label="Slug (to show in the url)*:"
                  onChange={e => {
                     setFormFields({ ...formFields, slug: slugify(e.target.value.toString()) })
                     checkSlug({ variables: { slug: slugify(e.target.value.toString()) } })
                  }}
                  onBlur={(e) => {
                     checkSlug({ variables: { slug: slugify(e.target.value.toString()) } })
                  }}
                  errorMessage={(!checkSlugLoading && checkSlugData && checkSlugData.category && checkSlugData.category.title && checkSlugData.category.slug != router.query.cslug) ? 'A category with entered slug exist, please enter a different slug.' : ''}
                  value={formFields.slug || ''}
                  placeholder="Use - for space"
                  fullWidth={true}
                  required={true} />

               <div className="float-to-right">
                  <Button
                     label="Update"
                     isloading={!!isButtonLoading}
                     onClick={e => onEditCategory(e)}
                     noSideMargin={true}
                  />
               </div>
            </div>}
         </section>
      </AuthPanelLayout>
   )
}

export default AddCategory