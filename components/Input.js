import { useState, useEffect } from 'react'

const Input = (props) => {

   const [dynamicProps, setDynamicProps] = useState({})

   function onChangeCustomiser(e) {
      props.onChange(e);
   }

   function onBlurCustomizer(e) {
      props.onBlur && props.onBlur(e)
   }

   function labelHandler() {
      if (props.label) {
         return <label>{props.label}</label>
      }
   }

   if (props.value != undefined) {
      return (
         <div className={props.fullWidth ? 'input-container fullwidth-input-container' : 'input-container'}>
            {labelHandler()}
            <input name={props.type || ''} type={props.type || 'text'} placeholder={props.placeholder || ''} onChange={e => onChangeCustomiser(e)} onBlur={e => onBlurCustomizer(e)} className={props.errorMessage && props.errorMessage != '' ? 'input-on-error' : ''} value={props.value} {...dynamicProps} />

            {props.errorMessage && props.errorMessage != '' ? <span className="input-error">{props.errorMessage}</span> : ''}
         </div>
      )
   }
   else {
      return (
         <div className={props.fullWidth ? 'input-container fullwidth-input-container' : 'input-container'}>
            {labelHandler()}
            <input name={props.type || ''} type={props.type || 'text'} placeholder={props.placeholder || ''} onChange={e => onChangeCustomiser(e)} onBlur={e => onBlurCustomizer(e)} className={props.errorMessage && props.errorMessage != '' ? 'input-on-error' : ''} {...dynamicProps} />

            {props.errorMessage && props.errorMessage != '' ? <span className="input-error">{props.errorMessage}</span> : ''}
         </div>
      )
   }

}
export default Input