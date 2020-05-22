import React, { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useAlert } from 'react-alert'
import config from '../config'

const UPLOAD_PHOTO = gql`
   mutation UploadPhoto($photo: Upload!){
      uploadPhoto(photo: $photo){
         status
         url
      }
   }
`

const DragDropUploader = (props) => {

   const alert = useAlert()
   const [uploadFile, { loading }] = useMutation(UPLOAD_PHOTO);
   const [file, setFile] = useState(null);

   const onDrop = useCallback((acceptedFiles) => {
      uploadFile({ variables: { photo: acceptedFiles[0] } }).then(({ data }) => {
         if (data.uploadPhoto && data.uploadPhoto.status) {
            data.uploadPhoto && data.uploadPhoto.status && data.uploadPhoto.url && props.onUpload && props.onUpload(data.uploadPhoto.url);
            data.uploadPhoto && data.uploadPhoto.url && setFile(config.serverURL + data.uploadPhoto.url);
         }
         else {
            alert.error('An error occurred on file upload!')
         }
      }).catch(err => {
         alert.error(err.toString())
      });
   }, [uploadFile, props])

   const { getRootProps, getInputProps, isDragActive } = useDropzone({ accept: 'image/jpeg, image/png', maxSize: 2097152, onDrop })

   useEffect(() => {
      if (!file && props.default && props.default.value != '') {
         setFile(props.default)
      }
   }, [props.default])

   return (
      <div className="dropzone-container">
         <label className="input-label">Featured Image:</label>

         <div {...getRootProps()} >
            <input {...getInputProps()} />
            {
               isDragActive ?
                  <p>Drop to upload...</p> :
                  <p>Drag & Drop an image, or click to select to upload.</p>
            }
            <aside>
               {loading && <p>uploading...</p>}
               {file && <div>
                  <div>
                     <img
                        src={file}
                     />
                     <span onClick={(e) => {
                        e.stopPropagation();
                        props.onUpload && props.onUpload(null);
                        setFile(null);
                     }}>Delete</span>
                  </div>
               </div>}
            </aside>
         </div>
      </div>
   )
}

export default DragDropUploader