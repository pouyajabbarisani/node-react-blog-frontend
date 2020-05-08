import Link from 'next/link'
import { withRouter } from 'next/router'

const Menu = ({ router: { pathname } }) => {
   return (
      <ul className="menu-container">
         <li>
            <Link href="/register">
               <a className={pathname === '/' ? 'is-active' : ''}>reg</a>
            </Link>
         </li>
         <li>
            <Link href="/">
               <a className={pathname === '/' ? 'is-active' : ''}>category</a>
            </Link>
         </li>
         <li>
            <Link href="/">
               <a className={pathname === '/' ? 'is-active' : ''}>category</a>
            </Link>
         </li>
         <style jsx>{`
            .menu-container{
               list-style: none;
               margin: 0;
               padding: 0;
            }
            .menu-container > li {
               display: inline-block;
               margin: 0 0.5rem;
               position: relative;
            }
            .menu-container > li > a{ 
               display: block;
               padding: 1rem 0.5rem;
            }
         `}</style>
      </ul>
   )
}
export default withRouter(Menu)
