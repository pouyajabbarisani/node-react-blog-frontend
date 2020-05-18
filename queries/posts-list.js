import gql from 'graphql-tag'

const POSTS_LIST_QUERY = gql`
   query Posts($limit: Int, $page: Int){
      posts (limit: $limit, page: $page){
         status
         total
         page
         list{
            title
            slug
            author{ 
               fullName 
               username
            }
            categoriesList {
               title
               slug
            }
            content
            featuredImage
            created_at
         }
      }
   }
`
export default POSTS_LIST_QUERY;