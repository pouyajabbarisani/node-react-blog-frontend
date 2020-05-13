import App from './App'
import Head from 'next/head'

const PanelLoading = (props) => {
   return (
      <App>
         <Head>
            <title>Loading...</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
         </Head>

         <div className="page-loading-container">
            <div className="loading-container">
               <div className="loading-bullet"></div>
               <div className="loading-bullet"></div>
               <div className="loading-bullet"></div>
            </div>
         </div>
         <style jsx>{`
               .page-loading-container{
                  width: 100%;
                  height: 100vh;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
               }
               .loading-bullet{
                  width: 1rem;
                  height: 1rem;
                  display: inline-block;
                  margin: 0 0.2rem;
                  background: #02e;
                  border-radius: 1rem;
               }
               @keyframes sides {
                  0%   {transform: translateY(-0.2rem)}
                  50% {transform: translateY(0.2rem)}
                  100%  {transform: translateY(-0.2rem)}
               }
               @keyframes centeral {
                  0%   {transform: translateY(0.2rem)}
                  50% {transform: translateY(-0.2rem)}
                  100%   {transform: translateY(0.2rem)}
               }
   
               .loading-bullet:nth-of-type(1),
               .loading-bullet:nth-of-type(3){
                  animation-name: sides;
                  animation-duration: 0.6s;
                  animation-timing-function: linear;
                  animation-iteration-count: infinite;
               }
               .loading-bullet:nth-of-type(2){
                  animation-name: centeral;
                  animation-duration: 0.6s;
                  animation-timing-function: linear;
                  animation-iteration-count: infinite;
               }
               
               `}</style>

      </App>
   )
}

export default PanelLoading;