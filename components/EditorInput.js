import { useAlert } from 'react-alert'
import useCKEditor from '../custom-hooks/use-ckeditor';
import { withApollo } from "../lib/apollo";
import config from '../config'
import gql from 'graphql-tag'
import { XmlEntities as Entities } from 'html-entities';
import { useMutation } from '@apollo/react-hooks'
const entities = new Entities();

const UPLOAD_PHOTO = gql`
   mutation UploadPhoto($photo: Upload!){
      uploadPhoto(photo: $photo){
         status
         url
      }
   }
`

const TextEditor = props => {
   const alert = useAlert()
   const { isEditorLoaded, CKEditor, ClassicEditor } = useCKEditor();
   const [uploadFile] = useMutation(UPLOAD_PHOTO);

   return isEditorLoaded ? <CKEditor
      editor={ClassicEditor}
      data={entities.decode(props.default)}
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
                  alert.error(error);
               }
            };
         };
      }}
      onChange={(event, editor) => {
         props.onChange(entities.encode(editor.getData()))
      }}
      onBlur={(event, editor) => {
         props.onBlur(entities.encode(editor.getData()))
      }}
   /> : '';
}

export default withApollo()(TextEditor);