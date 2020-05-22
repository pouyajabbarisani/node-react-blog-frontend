import Link from 'next/link'
import { withApollo } from '../lib/apollo'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { withRouter } from 'next/router'

const GET_CATEGORIES = gql`
   query categories {
      categories {
         title
         slug
      }
   }
`


const Menu = ({ router: { pathname } }) => {
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
               <a className={pathname === '/' ? 'is-active' : ''}>{singleCategory.title}</a>
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
         `}</style>
      </ul>
   )
}
export default withApollo({ ssr: true })(withRouter(Menu))
