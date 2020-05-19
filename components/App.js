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
        overflow-x: hidden;
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
      button ,
      .button {
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
      .red-button{
        background: linear-gradient(229deg, rgba(255,17,96,1) 0%, rgba(162,0,51,1) 100%) !important;
      }
      a.button:hover{
        color: #fff !important;
      }
      button:hover,
      .button:hover {
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
      .ck-editor {
        width: 100% !important;
        margin: 1rem 0 !important;
      }
      .ck-toolbar {
        border-radius: 0.3rem 0.3rem 0 0 !important;
      }
      .ck-content {
        border-radius: 0 0 0.3rem 0.3rem !important;
        min-height: 15rem;
        max-height: 25rem;
        overflow: scroll;
      }
      .fullwidth-input-container{
        width: 100%;
      }
      .fullwidth-input-container input,
      .fullwidth-input-container select{
        width: 100%;
      }
      .input-container label,
      .input-label{
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
      .input-container .input-on-error{
        border-color: #a00 !important;
      }
      .input-container input:focus {
        border-color: #02e !important;
      }
      .input-container .input-error{
        color: #a00;
        font-size: 0.8rem;
        display: block;
        width: 100%;
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
      .dropzone-container{
        margin: 1rem 0;
        outline: none !important;
      }
      .dropzone-container>div{
        margin: 0.2rem 0 !important;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: rgb(241, 241, 241);
        border-radius: 0.3rem;
        padding: 1rem;
        border: 1px dashed rgb(187, 187, 187);
        cursor: pointer;
        outline: none !important;
      }
      .dropzone-container>div p{
        color: #656565 !important;
      }
      .dropzone-container>div:hover{
        border: 1px solid rgb(187, 187, 187) !important;
        background: rgb(245,245,245) !important;
      }
      .dropzone-container aside img{
        width: 16rem;
        max-width: 100%;
        height: auto;
        border-radius: 0.3rem;
      }
      .select-category-container{
        margin: 1rem 0;
      }
      .disabled-button{
        opacity: 0.7;
        cursor: not-allowed;
      }
      .nosidemargin-button{
        margin: 1rem 0 !important;
      }
      .panel-centered-content{
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        width: 40rem;
        max-width: 90%;
        margin: auto auto 3rem auto;
      }
      .panel-list-container{
        width: calc(100% - 4rem);
        margin: 0 auto 2rem;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        background: #fff;
      }
      @media screen and (max-width: 767px){
        .panel-centered-content{
          width: 90% !important;
        }
      }
      .float-to-right{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-end;
        align-items: baseline;
        align-content: flex-start;
      }
      .panel-page-title{
        font-size: 2rem;
        text-align: left !important;
        background: -webkit-linear-gradient(45deg, #000, #02e,  #02e);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .inline-page-headline{
        display: inline-block !important;
      }
      .large-text{
        font-size: 110% !important;
      }
      .light-text{
        color: #777 !important;
      }
      .pagination-container{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        align-content: center;
      }
      .pagination-container button{
        background: #eee;
        color: #333;
        font-size: 0.9rem !important; 
        margin: 0.5rem 0.3rem !important;
        transition: color 0.2s background 0.2s;
      }
      .pagination-container .pagination-btn-active{
        background: #02e !important;
        color: #fff !important;
      }
      .pagination-container button:hover{
        background: #02e !important;
        color: #fff !important;
      }
      .mainsite-maxwidth{
        width: 50rem;
        max-width: 90%;
        margin: auto
      }
      .single-post-block{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: flex-start;     
        background: #fff; 
        padding: 0.5rem 1rem;
        box-shadow: 0 0.2rem 1.3rem -0.3rem rgba(0,0,0,0.15);
        margin-bottom: 1.5rem;
        border-radius: 0.5rem;
      }
      .single-post-block-image{
        width: 30%;
        height: 11rem;
        max-width: 100%;
        margin: 0.5rem 0;
        margin-right: 1rem !important;
        overflow: hidden;
        border-radius: 0.5rem;
      }
      .single-post-block-image img{ 
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        transition: opacity 0.2s;
      }
      .single-post-block-image img:hover{
        opacity: 0.95 !important; 
      }
      .single-post-block-content{
        width: 70%;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: flex-start;
      
      }
      .single-post-block-content p{
        color: #555 !important;
        margin-top: 0.7rem !important;
      }
      .single-post-block-content h2{
        margin-bottom: 0.7rem !important;
      }
      .single-post-block-content__date-author{
        font-size: 0.8rem;
        color: #888;
        margin: 0;
      }
      @media screen and (max-width: 640px){
        .single-post-block{
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          justify-content: space-between;
          align-items: flex-start;     
          background: #fff; 
          padding: 0.5rem 1rem;
          box-shadow: 0 0.2rem 1.3rem -0.3rem rgba(0,0,0,0.15);
          margin-bottom: 1.5rem;
          border-radius: 0.5rem;
        }        
        .single-post-block-image{
          width: 100% !important;
          margin-right: 0 !important;
        }
        .single-post-block-content{
          width: 100% !important;
          max-width: 100%;
        }  
      }

    `}</style>
  </main>
)

