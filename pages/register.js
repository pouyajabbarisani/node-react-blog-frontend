import { useEffect, useState } from 'react'
import App from '../components/App'
import Header from '../components/Header'
import Head from 'next/head'
import Input from '../components/Input'
import Button from '../components/Button'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import { withApollo } from '../lib/apollo'
import Router from 'next/router'
import { createAuthorValidator } from '../validators/create-author'
import { useAlert } from 'react-alert'


const AUTHORS_LIST_QUERY = gql`
   {
      authors {
         fullName
      }
   }
`
const INITIALIZE_AUTHOR = gql`
  mutation AddTodo($fullName: String!, $email: String!, $password: String!, $username: String!) {
   initialManager(fullName: $fullName, email: $email, password: $password, username: $username) {
      username
    }
  }
`;

// This component is just for initializing the first manager at the begining.
const Register = () => {
   const alert = useAlert()

   const { loading, error, data } = useQuery(
      AUTHORS_LIST_QUERY,
      {
         notifyOnNetworkStatusChange: true,
      }
   )

   const [formFields, setFormField] = useState({});

   useEffect(() => {
      const { authors } = data
      if (authors.length) {
         // check, if initial author (manager) exist, then return to home page
         Router.push(`/`)
      }
   }, [])

   const [isButtonLoading, setIsButtonLoading] = useState(false)
   const [initializeAuthor, { _: mutationLoading, __: mutationError }] = useMutation(INITIALIZE_AUTHOR);
   const onInitialRegisterSubmit = async (e) => {
      e.preventDefault();
      if (haveError) {
         alert.error('Please complete required Field Currectly and try again!')
      }
      else {
         const { error, validateResult: value } = await createAuthorValidator.validate(formFields, { abortEarly: false });
         if (error) {
            alert.error(error.toString());
         }
         else {
            setIsButtonLoading(true);
            initializeAuthor({ variables: { ...formFields } }).then(({ data }) => {
               if (data && data.initialManager && data.initialManager.username) {
                  alert.success('Manager created!')
                  setTimeout(function () { Router.push(`/login`) }, 1000)
               }
               else {
                  alert.error('Unknown Error!')
               }
            }).catch(err => alert.error(err.toString()));
            setIsButtonLoading(false);
         }
      }
   }

   const [haveError, setHaveError] = useState(true) // set initial value to true to prevent user from submit form before than touch
   const haveErrorTrigger = (res) => {
      setHaveError(!!res)
   }

   if (error) return <ErrorMessage message="Error on loading data from server." />
   if (loading) return <Loading />
   return (
      <App>
         <Head>
            <title>Register</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
         </Head>

         <Header />
         <div className="maxwidth">
            <div className="narrow-block">
               <h1>Initialize Author Manager</h1>

               <Input type="text" name="fullName" label="Full Name*:" onChange={e => setFormField({ ...formFields, fullName: e.target.value })} placeholder="Pouya Jabbarisani" haveError={haveErrorTrigger} fullWidth={true} required={true} />

               <Input type="username" name="username" label="Username*:" onChange={e => setFormField({ ...formFields, username: e.target.value })} placeholder="pouya" fullWidth={true} haveError={haveErrorTrigger} required={true} />

               <Input type="email" name="email" label="Email*:" onChange={e => setFormField({ ...formFields, email: e.target.value })} placeholder="pouyajabbarisani@gmail.com" fullWidth={true} haveError={haveErrorTrigger} required={true} />

               <Input type="password" name="password" label="Password*:" onChange={e => setFormField({ ...formFields, password: e.target.value })} placeholder="minimum 6 letters and numbers" fullWidth={true} haveError={haveErrorTrigger} required={true} />

               <Button label="Initialize" isFullWidth={true} isloading={!!isButtonLoading} onClick={e => onInitialRegisterSubmit(e)} />
            </div>
         </div>
         <style jsx>{`
            h1{
               font-size: 1.4rem;
            }
         `}</style>
      </App>
   )
}

export default withApollo({ ssr: true })(Register)
