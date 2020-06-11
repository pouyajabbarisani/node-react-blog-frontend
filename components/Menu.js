import Link from 'next/link'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { withRouter, useRouter } from 'next/router'

const GET_CATEGORIES = gql`
   query categories {
      categories {
         title
         slug
      }
   }
`


const Menu = (props) => {
   const { pathname, query } = useRouter()

   const { loading, error, data } = useQuery(GET_CATEGORIES)
   return (
      <ul className={props.responsiveMenuStatus ? 'menu-container open-responsive-menu' : 'menu-container'} >
         <li>
            <Link href="/">
               <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
            </Link>
         </li>
         {error && 'Error in loading menu!'}
         {!loading && data && data.categories && data.categories.map((singleCategory, index) => <li key={singleCategory.slug}>
            <Link href={`/categories/${singleCategory.slug}`}>
               <a className={query && query.catslug && (`/categories/${query.catslug}` === `/categories/${singleCategory.slug}` ? 'is-active' : '')}>{singleCategory.title}</a>
            </Link>
         </li>)}

         <style jsx>{`
            .menu-container{
               list-style: none;
               margin: 0;
               padding: 0;
            }
            @media screen and (max-width: 768px){
               .menu-container{
                  position: absolute;
                  width: 100%;
                  left: 0;
                  top: 100%;
                  display: none;
                  background: #fff;
               }
               .open-responsive-menu{
                  display: block !important;
                  box-shadow: 0 0.5rem 1.5rem -0.5rem rgba(0,0,0,0.1);
                  border-top: 1px solid #eee;
               }
               .menu-container > li {
                  display: block !important;
                  width: 100% !important;
                  text-align: center;
               }
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
            .menu-container .is-active {
               color: #02e !important;
            }
         `}</style>
      </ul>
   )
}
export default Menu
