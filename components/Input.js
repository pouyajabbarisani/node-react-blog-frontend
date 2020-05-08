const Input = (props) => {
   function labelHandler() {
      if (props.label) {
         return <label>{props.label}</label>
      }
   }

   return (
      <div className="input-container">
         {labelHandler()}
         <input type={props.type || 'text'} placeholder={props.placeholder || ''} />
      </div>
   )
}
export default Input