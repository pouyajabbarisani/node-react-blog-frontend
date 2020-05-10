import { useState } from 'react'
import { useEffect } from 'react'

const Input = (props) => {

   const [dynamicProps, setDynamicProps] = useState({})
   const [errorMessage, setErrorMessage] = useState('')

   function onChangeCustomiser(e) {
      // if (props.type == 'username') {
      //    e.target.value = e.target.value.replace(/[^A-Z0-9]/ig, "");
      // }
      props.onChange(e);
   }

   function onBlurCustomizer(e) {
      // if (props.type == 'password' && e.target.value.length < 6) {
      //    setErrorMessage('Password length should be at lest 6')
      //    props.haveError(true)
      // }
      // else if (props.type == 'password' && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,30}$/.test(e.target.value)) {
      //    setErrorMessage('Password should have letter and number with length from 6 to 30')
      //    props.haveError(true)
      // }
      // else {
      setErrorMessage('')
      props.haveError(false)
      // }
   }

   function labelHandler() {
      if (props.label) {
         return <label>{props.label}</label>
      }
   }

   return (
      <div className="input-container">
         {labelHandler()}
         <input name={props.type || ''} type={props.type || 'text'} placeholder={props.placeholder || ''} onChange={e => onChangeCustomiser(e)} onBlur={e => onBlurCustomizer(e)} {...dynamicProps} className={errorMessage && errorMessage != '' ? 'input-on-error' : ''} />

         {errorMessage && errorMessage != '' ? <span className="input-error">{errorMessage}</span> : ''}
      </div>
   )
}
export default Input