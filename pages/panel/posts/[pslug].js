import { useState, useEffect, useRef } from 'react'
import AuthPanelLayout from '../../../components/AuthPanelLayout'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import slugify from 'slugify'
import gql from 'graphql-tag'
import { withApollo } from '../../../lib/apollo'
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
import { useAlert } from 'react-alert'
import SelectCategory from '../../../components/SelectCategory';
import { updatePostValidator } from '../../../validators/update-post'
import DragDropUplaoder from '../../../components/DragDropUploader'
import config from '../../../config'
import Router, { useRouter } from 'next/router'
import POSTS_LIST_QUERY from '../../../queries/posts-list'
import EditorInput from '../../../components/EditorInput'


const GET_SINGLE_POST = gql`
   query Post($slug: String!){
      post(slug: $slug){
         slug
         title
         content
         featuredImage
         created_at
         categories
         categoriesList {
            title
            slug
         }
         author {
            fullName
            username
         }
      }
   }
`

const UPDATE_POST = gql`
   mutation EditePost($slug: String!, $updatedSlug: String, $updatedTitle: String, $updatedContent: String, $updatedFeaturedImage: String, $updatedCategories: [String]) {
      editPost (slug: $slug, updatedSlug: $updatedSlug, updatedTitle: $updatedTitle, updatedContent: $updatedContent, updatedFeaturedImage: $updatedFeaturedImage, updatedCategories: $updatedCategories) {
         slug
      }
   }
`

const CHECK_POST_SLUG = gql`
   query Post($slug: String!) {
      post (slug: $slug){
         title
         slug
      }
   }
`

const EditPost = () => {
   const router = useRouter();
   const alert = useAlert()

   const [isButtonLoading, setIsButtonLoading] = useState(false)
   const [categoriesDefaultValue, setCategoriesDefaultValue] = useState([]);
   const [formFields, setFormFields] = useState({ categories: [] });

   const { loading, error, data } = useQuery(GET_SINGLE_POST, { variables: { slug: router.query.pslug } });
   const [checkSlug, { called: checkSlugCalled, loading: checkSlugLoading, data: checkSlugData }] = useLazyQuery(CHECK_POST_SLUG);
   const [updatePost] = useMutation(UPDATE_POST);

   useEffect(() => {
      if (!loading && data) {
         const catDefault = []
         data.post.categoriesList && data.post.categoriesList.length && data.post.categoriesList.forEach((singleCat) => {
            catDefault.push({ label: singleCat.title, value: singleCat.slug })
         })
         setCategoriesDefaultValue(catDefault)
         setFormFields({
            title: data.post.title,
            slug: data.post.slug,
            content: data.post.content,
            featuredImage: data.post.featuredImage,
            categories: data.post.categories
         })
      }
   }, [loading])

   const onUpdatePost = async (e) => {
      e.preventDefault();
      if (checkSlugCalled && !checkSlugLoading && (checkSlugData && checkSlugData.post && checkSlugData.post && checkSlugData.post.slug != router.query.pslug)) {
         alert.error('A post with entered slug is exist, please enter another slug');
      }
      else {
         const updatedPost = {
            slug: router.query.pslug,
            updatedSlug: formFields.slug,
            updatedTitle: formFields.title,
            updatedContent: formFields.content,
            updatedCategories: formFields.categories,
            updatedFeaturedImage: formFields.featuredImage
         }
         const { error, validateResult: value } = await updatePostValidator.validate(updatedPost, { abortEarly: false });
         if (error) {
            alert.error(error.toString());
         }
         else {
            setIsButtonLoading(true);
            console.log("updatedPost::", updatedPost)
            updatePost({
               variables: updatedPost, refetchQueries: [{ query: POSTS_LIST_QUERY, variables: { limit: 10, page: 1 } }],
            }).then(({ data }) => {
               // console.log(data)
               if (data && data.editPost && data.editPost.slug) {
                  setTimeout(function () { Router.push(`/panel/posts?update=success`) }, 1000);
               }
               else {
                  alert.error('Unknown Error!');
               }
            }).catch(err => {
               alert.error(err.toString())
               setIsButtonLoading(false);
            });

         }
      }
   }

   return (
      <AuthPanelLayout pageTitle="Edit Post">
         <section className="panel-centered-content">
            {loading && <p>Loading...</p>}
            {error && <p>error!</p>}
            {!loading && ((data && data.post) ? <>
               <h2 className="panel-page-title">Edit Post</h2>

               <Input
                  type="text"
                  name="title"
                  label="Title*:"
                  onChange={e => setFormFields({ ...formFields, title: e.target.value.toString() })}
                  value={formFields.title || 'null'}
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
                  errorMessage={(!checkSlugLoading && checkSlugData && checkSlugData.post && checkSlugData.post.slug && (checkSlugData.post.slug != router.query.pslug)) ? 'A Post with entered slug exist, please enter a different slug.' : ''}
                  placeholder="Use - for space"
                  value={formFields.slug || ''}
                  fullWidth={true}
                  required={true} />

               <EditorInput
                  default={formFields.content || ''}
                  onChange={(value) => setFormFields({ ...formFields, content: value })}
                  onBlur={(value) => setFormFields({ ...formFields, content: value })} />

               <SelectCategory
                  label="Categories:"
                  setFormFields={setFormFields}
                  formFields={formFields}
                  defaultValue={categoriesDefaultValue || null}
                  fullWidth={true} />

               <DragDropUplaoder
                  default={formFields.featuredImage ? config.serverURL + formFields.featuredImage : null}
                  onUpload={value => { setFormFields({ ...formFields, featuredImage: value }) }} />

               <div className="float-to-right">
                  <Button
                     label="Save Cahnges"
                     isloading={!!isButtonLoading}
                     onClick={e => onUpdatePost(e)}
                     noSideMargin={true}
                  />
               </div>
            </> : <p>Post Not Found! - 404</p>)}
         </section>
      </AuthPanelLayout >
   )
}

export default withApollo({ ssr: true })(EditPost);