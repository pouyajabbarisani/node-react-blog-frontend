import { useState } from 'react'

const Button = (props) => {

   const loadingLoader = () => {
      return <div className="button-loader">
         <div className="button-loader-bullet"></div>
         <div className="button-loader-bullet"></div>
         <div className="button-loader-bullet"></div>
         <style jsx>{`
            .button-loader-bullet{
               width: 0.7rem;
               height: 0.7rem;
               display: inline-block;
               margin: 0 0.2rem;
               background: #fff;
               border-radius: 1rem;
            }
            @keyframes sides {
               0%   {transform: translateY(-0.1rem)}
               50% {transform: translateY(0.1rem)}
               100%  {transform: translateY(-0.1rem)}
            }
            @keyframes centeral {
               0%   {transform: translateY(0.1rem)}
               50% {transform: translateY(-0.1rem)}
               100%   {transform: translateY(0.1rem)}
            }

            .button-loader-bullet:nth-of-type(1),
            .button-loader-bullet:nth-of-type(3){
               animation-name: sides;
               animation-duration: 0.6s;
               animation-timing-function: linear;
               animation-iteration-count: infinite;
            }
            .button-loader-bullet:nth-of-type(2){
               animation-name: centeral;
               animation-duration: 0.6s;
               animation-timing-function: linear;
               animation-iteration-count: infinite;
            }
         `}</style>
      </div>
   }

   const classLists = () => {
      let listString = ''
      props.className && (listString += ` ${props.className} `)
      props.isloading && (listString += ' disabled-button ');
      props.isFullWidth && (listString += ' fullwidth-button ');
      props.noSideMargin && (listString += ' nosidemargin-button ');
      return listString
   }

   return <button onClick={e => !(!!props.isloading) && props.onClick(e)} className={classLists()}> {props.isloading ? loadingLoader() : (props.label || 'Submit')}</button >
}
export default Button