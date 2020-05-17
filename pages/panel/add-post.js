import { useState, useEffect, useRef } from 'react'
import AuthPanelLayout from '../../components/AuthPanelLayout'
import Input from '../../components/Input'
import Button from '../../components/Button'
import slugify from 'slugify'
import gql from 'graphql-tag'
import useCKEditor from '../../custom-hooks/use-ckeditor';
import { XmlEntities as Entities } from 'html-entities';
import { withApollo } from '../../lib/apollo'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useAlert } from 'react-alert'
import SelectCategory from '../../components/SelectCategory';
import { createPostValidator } from '../../validators/create-post'
import DragDropUplaoder from '../../components/DragDropUploader'
import config from '../../config'
import Router from 'next/router'
const entities = new Entities();


const CREATE_POST = gql`
   mutation CreatePost($slug: String!, $title: String!, $content: String!, $featuredImage: String, $categories: [String]!) {
      createPost (slug: $slug, title: $title, content: $content, featuredImage: $featuredImage, categories: $categories) {
         slug
      }
   }
`
const UPLOAD_PHOTO = gql`
   mutation UploadPhoto($photo: Upload!){
      uploadPhoto(photo: $photo){
         status
         url
      }
   }
`

const AddPost = () => {

   const alert = useAlert()
   const { isEditorLoaded, CKEditor, ClassicEditor } = useCKEditor();
   const [isButtonLoading, setIsButtonLoading] = useState(false)
   const [uploadFile, { loading }] = useMutation(UPLOAD_PHOTO);
   const [formFields, setFormFields] = useState({});
   const [createPost] = useMutation(CREATE_POST);

   const onSavePost = async (e) => {
      e.preventDefault();
      console.log(formFields)
      // const { error, validateResult: value } = await createPostValidator.validate(formFields, { abortEarly: false });
      // if (error) {
      //    alert.error(error.toString());
      // }
      // else {
      //    setIsButtonLoading(true);
      //    createPost({ variables: { ...formFields } }).then(({ data }) => {
      //       if (data && data.createPost && data.createPost.slug) {
      //          setTimeout(function () { Router.push(`/panel/posts?create=success`) }, 1000)
      //       }
      //       else {
      //          alert.error('Unknown Error!')
      //       }
      //    }).catch(err => alert.error(err.toString()));
      //    setIsButtonLoading(false);
      // }
   }

   return (
      <AuthPanelLayout pageTitle="Add Post">
         <section className="panel-centered-content">
            <h2 className="panel-page-title">Create New Post</h2>

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
               onChange={e => { setFormFields({ ...formFields, slug: slugify(e.target.value.toString()) }) }}
               placeholder="Use - for space"
               fullWidth={true}
               required={true} />


            {isEditorLoaded ? <CKEditor
               editor={ClassicEditor}
               onInit={editor => {
                  // Connect the upload adapter using code below 
                  editor.plugins.get("FileRepository").createUploadAdapter = function (loader) {
                     return {
                        upload: async () => {
                           const file = await loader.file;
                           return new Promise((resolve, reject) => {
                              if (file.type == 'image/jpeg' || file.type == 'image/png') {
                                 if (file.size <= 2097152) {
                                    uploadFile({ variables: { photo: file } }).then(({ data }) => {
                                       if (data.uploadPhoto && data.uploadPhoto.status) {
                                          resolve({ default: config.serverURL + data.uploadPhoto.url })
                                       }
                                       else { reject() }
                                    }).catch(err => reject(err));
                                 }
                                 else { reject('Maximum allowed size is 2mb!') }
                              }
                              else { reject('You can just upload images with jpg or png format!') }
                           });
                        },
                        abort: (error) => {
                           console.log(error);
                        }
                     };
                  };
               }}
               onChange={(event, editor) => { setFormFields({ ...formFields, content: entities.encode(editor.getData()) }) }}
               onBlur={(event, editor) => { setFormFields({ ...formFields, content: entities.encode(editor.getData()) }) }}
            /> : ''}

            <SelectCategory
               label="Categories:"
               setFormFields={setFormFields}
               formFields={formFields}
               fullWidth={true} />

            <DragDropUplaoder
               onUpload={value => { setFormFields({ ...formFields, featuredImage: value }) }} />

            <div className="float-to-right">
               <Button
                  label="Publish New Post"
                  isloading={!!isButtonLoading}
                  onClick={e => onSavePost(e)}
                  noSideMargin={true}
               />
            </div>

         </section>
      </AuthPanelLayout >
   )
}

export default withApollo({ ssr: true })(AddPost);