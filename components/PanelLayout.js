import { useState, useEffect } from 'react'
import App from './App'
import Head from 'next/head'
import Link from 'next/link'
import { withRouter } from 'next/router'
import PanelLoading from './PanelLoading'
import { withApollo } from '../lib/apollo'
import Router from 'next/router'


const PanelLayout = (props) => {

   const [sideMenuStatus, setSideMenuStatus] = useState('close') // for responsive menu toggle

   return (
      <App>
         <Head>
            <title>{props.pageTitle || 'Dashboard'}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
         </Head>
         <div className="dashboard-overflow-container">
            <div className={(sideMenuStatus == 'open') ? "open-responsive-side-menu dashboard-container" : "dashboard-container"} >
               <section className="dashboard-sidebar-container">
                  <div>
                     <h1>Node React Blog Panel</h1>
                     <Link href="/">
                        <a className={props.router.pathname === '/panel' ? 'is-active' : ''}>Dashboard</a>
                     </Link>
                     <Link href="/">
                        <a className={props.router.pathname === '/panel/add-post' ? 'is-active' : ''}>Add Post</a>
                     </Link>
                     <Link href="/">
                        <a className={props.router.pathname === '/panel/posts' ? 'is-active' : ''}>Posts</a>
                     </Link>
                     <Link href="/">
                        <a className={props.router.pathname === '/panel/add-category' ? 'is-active' : ''}>Add Category</a>
                     </Link>
                     <Link href="/">
                        <a className={props.router.pathname === '/panel/categories' ? 'is-active' : ''}>Categories</a>
                     </Link>
                     <Link href="/">
                        <a className={props.router.pathname === '/panel/add-author' ? 'is-active' : ''}>Add Author</a>
                     </Link>
                     <Link href="/">
                        <a className={props.router.pathname === '/panel/authors' ? 'is-active' : ''}>Authors</a>
                     </Link>
                  </div>
               </section>
               <section className="dashboard-content-container" onClick={() => {
                  if (sideMenuStatus == 'open') {
                     setSideMenuStatus('close')
                  }
               }}>
                  <div>
                     <span className="dashboard-responisve-trigger-button" onClick={() => {
                        (sideMenuStatus == 'open') ? setSideMenuStatus('close') : setSideMenuStatus('open');
                     }}>☰</span>

                  </div>
                  <div>{props.children || ''}</div>
               </section>
            </div>
         </div>

         <style jsx>{`
               .dashboard-overflow-container{
                  width: 100%;
                  overflow: hidden
               }
               .dashboard-container{
                  display: flex;
                  flex-direction: row;
                  justify-content: flex-start;
                  align-items: stretch;
                  align-content: flex-start;
               }
               .dashboard-responisve-trigger-button{
                  font-size: 2rem;
                  width: 3rem;
                  height: 3rem;
                  display: flex;
                  flex-direction: column;
                  flex-wrap: nowrap;
                  justify-content: center;
                  align-items: center;
                  align-content: center;
                  color: #02e;   
                  margin: 0.5rem;         
               }
               @media screen and (max-width: 768px){
                  .dashboard-container{
                     width: calc(100% + 12rem);
                     transition: transform 0.3s;
                     transform: translateX(-12rem);
                  }
                  .open-responsive-side-menu{
                     transform: translateX(0) !important;
                  }
               }
               .dashboard-sidebar-container{
                  width: 12rem;
                  display: block;
                  height: 100vh;
               }
               .dashboard-sidebar-container h1{
                  padding: 0.5rem;
                  margin: 0.5rem 0.5rem 1rem 0.5rem; 
                  // text-align: center;
               }
               .dashboard-sidebar-container >div{
                  background: #02e;
                  background: linear-gradient(229deg, rgba(17,51,255,1) 0%, rgba(0,26,185,1) 100%);
                  color: #fff;
                  display: flex;
                  width: 100%;
                  height: 100vh;
                  // border-radius: 0 1rem 1rem 0;
                  box-shadow: 0 0 2rem -0.5rem rgba(0,0,0,0.3);
                  display: flex;
                  flex-direction: column;
                  flex-wrap: nowrap;
                  justify-content: flex-start;
                  align-items: stretch;            
               }
               .dashboard-sidebar-container a{
                  color: #fff;
                  padding: 0.4rem 0.7rem;
                  margin: 0.3rem 0.5rem;
                  border-radius: 3rem;
                  transition: background 0.2s;
               }
               .dashboard-sidebar-container a:hover{
                  background: rgba(0,0,0,0.1) !important;
               }
               .dashboard-sidebar-container .is-active{
                  background: rgba(0,0,0,0.2);
               }
               .dashboard-content-container{
                  flex-grow: 1;
               }
            

         `}</style>
      </App>
   )
}

export default withRouter(PanelLayout);