import { useState } from 'react'
import App from '../components/App'
import Header from '../components/Header'
import Input from '../components/Input'
import Button from '../components/Button'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Router from 'next/router'
import { loginValidator } from '../validators/login'
import { useAlert } from 'react-alert'

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
   login(email: $email, password: $password) {
      fullName
      isManager
      username
    }
  }
`;
const SET_AUTH = gql`
   mutation SetAuth($fullName: String!, $username: String!, $isManager: Boolean) {
      setAuth(fullName: $fullName, username: $username, isManager: $isManager) @client
   }
`;

const Login = () => {

   const alert = useAlert()
   const [loginFields, setLoginField] = useState({})
   const [isButtonLoading, setIsButtonLoading] = useState(false)
   const [login] = useMutation(LOGIN);
   const [setLocalAuthStatus] = useMutation(SET_AUTH);

   const onLogin = async (e) => {
      e.preventDefault();
      const { error, validateResult: value } = await loginValidator.validate(loginFields, { abortEarly: false });
      if (error) {
         alert.error(error.toString());
      }
      else {
         setIsButtonLoading(true);
         login({ variables: { ...loginFields } }).then(({ data }) => {
            if (data && data.login && data.login.username) {
               setLocalAuthStatus({ variables: { fullName: data.login.fullName, username: data.login.username, isManager: data.login.isManager } }).then(() => {
                  Router.push(`/panel`)
               })
            }
            else {
               alert.error('Unknown Error!')
            }
         }).catch(err => alert.error(err.toString()));
         setIsButtonLoading(false);
      }

   }

   return (
      <App>
         <Header />
         <div className="maxwidth">
            <div className="narrow-block">
               <h1>Login</h1>

               <Input
                  type="email"
                  name="email"
                  label="Email*:"
                  onChange={e => setLoginField({ ...loginFields, email: e.target.value })}
                  placeholder="pouyajabbarisani@gmail.com"
                  fullWidth={true}
                  required={true} />

               <Input
                  type="password"
                  name="password"
                  label="Password*:"
                  onChange={e => setLoginField({ ...loginFields, password: e.target.value })}
                  fullWidth={true}
                  required={true} />

               <Button
                  label="Login"
                  isFullWidth={true}
                  isloading={!!isButtonLoading}
                  onClick={e => onLogin(e)}
               />

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

export default Login