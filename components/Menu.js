import Link from 'next/link'
import { withApollo } from '../lib/apollo'
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


const Menu = () => {
   const { pathname, query } = useRouter()

   const { loading, error, data } = useQuery(GET_CATEGORIES)
   return (
      <ul className="menu-container">
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
export default withApollo({ ssr: true })(Menu)
