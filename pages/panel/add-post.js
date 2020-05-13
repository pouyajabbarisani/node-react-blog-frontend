import { useState, useEffect, useRef } from 'react'
import AuthPanelLayout from '../../components/AuthPanelLayout'
import Input from '../../components/Input'
import Button from '../../components/Button'
import slugify from 'slugify'
import useCKEditor from '../../custom-hooks/use-ckeditor';
import { XmlEntities as Entities } from 'html-entities';
const entities = new Entities();


const AddPost = () => {
   const { isEditorLoaded, CKEditor, ClassicEditor } = useCKEditor();
   const [isButtonLoading, setIsButtonLoading] = useState(false)
   const [formFields, setFormFields] = useState({});
   const [haveError, setHaveError] = useState(true) // set initial value to true to prevent user from submit form before than touch

   const haveErrorTrigger = (result) => {
      setHaveError(!!result)
   }

   const onSavePost = (e) => {
      e.preventDefault();
      console.log(formFields)
      // validation
      // submit
      // result
      // redirect if tru
      setIsButtonLoading(false)
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
               haveError={haveErrorTrigger}
               required={true} />

            <Input
               type="text"
               name="slug"
               label="Slug (to show in the url)*:"
               onChange={e => { setFormFields({ ...formFields, slug: slugify(e.target.value.toString()) }) }}
               placeholder="Use - for space"
               fullWidth={true}
               haveError={haveErrorTrigger}
               required={true} />


            {isEditorLoaded ? <CKEditor
               editor={ClassicEditor}
               onInit={editor => { /* initialize editor content if needed. */ }}
               onChange={(event, editor) => { setFormFields({ ...formFields, content: entities.encode(editor.getData()) }) }}
               onBlur={(event, editor) => { setFormFields({ ...formFields, content: entities.encode(editor.getData()) }) }}
            /> : ''}

            <div className="float-to-right">
               <Button
                  label="Publish New Post"
                  isloading={!!isButtonLoading}
                  onClick={e => onSavePost(e)}
                  noSideMargin={true}
               />
            </div>

         </section>
      </AuthPanelLayout>
   )
}

export default AddPost;