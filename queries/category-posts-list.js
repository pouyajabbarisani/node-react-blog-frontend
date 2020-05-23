import gql from 'graphql-tag'

const CATEGORY_POSTS_LIST_QUERY = gql`
   query Category($slug: String!, $limit: Int, $page: Int){
      category(slug: $slug){
         title
         slug
         pagedPosts (limit: $limit, page: $page){
            status
            total
            page
            list{
               title
               slug
               content
               featuredImage
               created_at
               author{ 
                  fullName 
                  username
               }
               categoriesList {
                  title
                  slug
               }
            }
         }
      }
   }
`
export default CATEGORY_POSTS_LIST_QUERY;