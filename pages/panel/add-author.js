import { useState, useEffect } from 'react'
import { withApollo } from '../../lib/apollo'
import AuthPanelLayout from '../../components/AuthPanelLayout'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import slugify from 'slugify'
import { useAlert } from 'react-alert'
import { createAuthorValidator } from '../../validators/create-author'
import Router from 'next/router'

const CREATE_AUTHOR = gql`
   mutation CreateAuthor($fullName: String!, $email: String!, $password: String!, $username: String!){
      createAuthor(fullName: $fullName, email: $email, password: $password, username: $username){
         username
      }
   }
`
const CHECK_USERNAME = gql`
   query Author($username: String!) {
      author(username: $username) {
         fullName
         username
      }
   }
`
const CHECK_EMAIL = gql`
   query CheckEmailExistance($email: String!) {
      checkEmailExistance(email: $email) {
         username
      }
   }
`


const AddAuthor = (props) => {

   const alert = useAlert()
   const [isButtonLoading, setIsButtonLoading] = useState(false)
   const [formFields, setFormFields] = useState({})
   const [formFieldsErrors, setFormFieldsErrors] = useState({})
   const [checkUsername, { called: checkUsernameCalled, loading: checkUsernameLoading, data: checkUsernameData }] = useLazyQuery(CHECK_USERNAME)
   const [checkEmail, { called: checkEmailCalled, loading: checkEmailLoading, data: checkEmailData }] = useLazyQuery(CHECK_EMAIL)
   const [createAuthor] = useMutation(CREATE_AUTHOR)

   const onCreateAuthor = async (e) => {
      console.log(checkEmailData)
      e.preventDefault();
      if (checkUsernameCalled && !checkUsernameLoading && (checkUsernameData && checkUsernameData.author)) {
         alert.error('Entered username is exist, please enter another username!')
      }
      else if (checkEmailCalled && !checkEmailLoading && (checkEmailData && checkEmailData.checkEmailExistance)) {
         alert.error('Entered email is exist, please enter another email!')
      }
      else {
         const { error } = await createAuthorValidator.validate(formFields, { abortEarly: false });
         if (error) {
            alert.error(error.toString());
         }
         else {
            setIsButtonLoading(true);
            createAuthor({
               variables: { ...formFields }, refetchQueries: [{
                  query: gql`
               {
                  authors {
                     fullName
                     username
                     created_at
                     posts{
                        title
                     }
                  }
               }
            `}],
            }).then(({ data }) => {
               if (data && data.createAuthor && data.createAuthor.username) {
                  Router.push('/panel/authors?create=success')
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
      <AuthPanelLayout pageTitle="Add Author">
         <section className="panel-centered-content">
            <h2 className="panel-page-title">Create New Author</h2>

            <Input
               type="text"
               name="fullName"
               label="Full Name*:"
               placeholder="eg: Pouya Jabbarisani"
               onChange={e => setFormFields({ ...formFields, fullName: e.target.value.toString() })}
               fullWidth={true}
               required={true} />

            <Input
               type="text"
               name="username"
               label="Username (without space or special characters)*:"
               onChange={e => {
                  setFormFields({ ...formFields, username: slugify(e.target.value.toString()) })
                  checkUsername({ variables: { username: slugify(e.target.value.toString()) } })
               }}
               onBlur={(e) => {
                  checkUsername({ variables: { username: slugify(e.target.value.toString()) } })
               }}
               errorMessage={(!checkUsernameLoading && checkUsernameData && checkUsernameData.author && checkUsernameData.author.username) ? 'An author with entered username exist, please enter a different username.' : ''}
               value={formFields.username || ''}
               placeholder="Enter a username for author"
               fullWidth={true}
               required={true} />

            <Input
               type="email"
               name="email"
               label="Email*:"
               onChange={e => {
                  setFormFields({ ...formFields, email: e.target.value })
                  if (e.target.value.length && (e.target.value.indexOf('@') > 0) && (e.target.value.indexOf('.') > 0)) {
                     checkEmail({ variables: { email: e.target.value } })
                  }
               }}
               onBlur={(e) => {
                  if (e.target.value.length && (e.target.value.indexOf('@') > 0) && (e.target.value.indexOf('.') > 0)) {
                     checkEmail({ variables: { email: e.target.value } })
                  }

               }}
               errorMessage={(!checkEmailLoading && checkEmailData && checkEmailData.checkEmailExistance && checkEmailData.checkEmailExistance.username && (formFields.email.length && (formFields.email.indexOf('@') > 0) && (formFields.email.indexOf('.') > 0))) ? 'An author with entered email exist, please enter a different email.' : ''}
               placeholder="pouyajabbarisani@gmail.com"
               fullWidth={true}
               required={true} />

            <Input
               type="password"
               name="password"
               label="Password*:"
               onChange={e => {
                  setFormFields({ ...formFields, password: e.target.value })
                  if (!/^(?=.*[a-z])(?=.*\d).{6,30}$/.test(e.target.value)) {
                     setFormFieldsErrors({ ...formFieldsErrors, password: 'Password should have letter and number with length from 6 to 30' })
                  }
                  else { setFormFieldsErrors({ ...formFieldsErrors, password: '' }) }
               }}
               placeholder="minimum 6 letters and numbers"
               errorMessage={formFieldsErrors.password || ''}
               fullWidth={true}
               required={true} />


            <div className="float-to-right">
               <Button
                  label="Create"
                  isloading={!!isButtonLoading}
                  onClick={e => onCreateAuthor(e)}
                  noSideMargin={true}
               />
            </div>

         </section>
      </AuthPanelLayout>
   )
}

export default withApollo({ ssr: true })(AddAuthor)