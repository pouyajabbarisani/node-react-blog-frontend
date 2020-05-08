export default ({ children }) => (
  <main>
    {children}
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Muli:wght@400;900&display=swap');
      * {
        font-family: 'Muli', sans-serif;
      }
      body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      a {
        text-decoration: none;
        color:initial;
      }
      a:hover {
        color: #02e;        
      }
      p {
        font-size: 1rem;
        line-height: 24px;
      }
      .maxwidth{
        width: 60rem;
        max-width: 95%;
        margin: auto;
      }
      .narrow-block{
        width: 20rem;
        max-width: 100%;
        box-shadow: 0 0.3rem 1.3rem -0.3rem rgba(0,0,0,0.1);
        border-radius: 0.5rem;
        padding: 1rem;
        margin: 10vh auto 5vh;
        text-align: center;
      }
      article {
        margin: 0 auto;
        max-width: 650px;
      }
      button {
        text-align: center;
        background: #02e;
        background: linear-gradient(229deg, rgba(17,51,255,1) 0%, rgba(0,26,185,1) 100%);
        border: 0;
        color: white;
        font-size: 1.2rem;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        margin: 1rem 0.5rem;
        transition: background-color 0.3s;
        outline: none !important;
        cursor: pointer;
        transition: box-shadow 0.3s;
      }
      button:hover {
        box-shadow: 0 0.2rem 1rem -0.3rem rgba(0,0,0,0.4);
      }
      .fullwidth-button{
        width: 100%;
        margin: 1rem 0 !important;
      }

      .input-container{
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: stretch;
        align-content: flex-start;
        margin: 1rem 0;
      }
      .input-container label{
        diplay: block;
        font-size: 0.8rem;
        width: 100%;
        text-align: left;
        margin-bottom: 0.1rem;
        color: #444;
      }
      .input-container input{
        diplay: block;
        border: 1px solid #d4d4d4 !important;
        outline: none;
        font-size: 1rem;
        padding: 0.5rem;
        box-sizing: border-box;
        border-radius: 0.3rem;
        width: 100%;
        text-align: left;
      }
      .input-container input:focus {
        border-color: #02e !important;
      }
      
      ::placeholder {
        color: #bbb;
        opacity: 1;
      }
      :-ms-input-placeholder { 
       color: #bbb;
      }
      ::-ms-input-placeholder { 
       color: #bbb;
      }
    `}</style>
  </main>
)
