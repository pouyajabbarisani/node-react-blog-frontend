import { useState, useEffect } from 'react'
import { withApollo } from '../../lib/apollo'
import AuthPanelLayout from '../../components/AuthPanelLayout'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import slugify from 'slugify'
import { useAlert } from 'react-alert'
import { createCategoryValidator } from '../../validators/create-category'
import Router from 'next/router'

const CHECK_SLUG = gql`
   query Category($slug: String!) {
      category (slug: $slug){
         title
      }
   }
`
const CREATE_CATEGORY = gql`
   mutation CreateCategory($title: String!, $slug: String!){
      createCategory(title: $title, slug: $slug){
         title
         slug
      }
   }
`

const AddCategory = () => {

   const alert = useAlert()
   const [isButtonLoading, setIsButtonLoading] = useState(false)
   const [formFields, setFormFields] = useState({});
   const [checkSlug, { called, loading: checkSlugLoading, data: checkSlugData }] = useLazyQuery(CHECK_SLUG);
   const [createCategory] = useMutation(CREATE_CATEGORY);

   const onSaveCategory = async (e) => {
      e.preventDefault();
      if (called && !checkSlugLoading && (checkSlugData && checkSlugData.category)) {
         alert.error('Entered slug is exist, please enter another slug!')
      }
      else {
         const { error, validateResult: value } = await createCategoryValidator.validate(formFields, { abortEarly: false });
         if (error) {
            alert.error(error.toString());
         }
         else {
            setIsButtonLoading(true);
            createCategory({
               variables: { ...formFields }, refetchQueries: [{
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
               if (data && data.createCategory && data.createCategory.title) {
                  Router.push('/panel/categories?create=success')
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
      <AuthPanelLayout pageTitle="Add Category">
         <section className="panel-centered-content">
            <h2 className="panel-page-title">Create New Category</h2>

            <Input
               type="text"
               name="title"
               label="Title*:"
               onChange={e => setFormFields({ ...formFields, title: e.target.value.toString() })}
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
               errorMessage={(!checkSlugLoading && checkSlugData && checkSlugData.category && checkSlugData.category.title) ? 'A category with entered slug exist, please enter a different slug.' : ''}
               value={formFields.slug || ''}
               placeholder="Use - for space"
               fullWidth={true}
               required={true} />

            <div className="float-to-right">
               <Button
                  label="Create"
                  isloading={!!isButtonLoading}
                  onClick={e => onSaveCategory(e)}
                  noSideMargin={true}
               />
            </div>

         </section>
      </AuthPanelLayout>
   )
}

export default withApollo({ ssr: true })(AddCategory);