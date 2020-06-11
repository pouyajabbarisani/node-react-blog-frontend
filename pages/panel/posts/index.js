import { useEffect } from 'react'
import AuthPanelLayout from "../../../components/AuthPanelLayout"
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'
import Pagination from '../../../components/Pagination'
import Button from '../../../components/Button'
import { useAlert } from 'react-alert'
import { useRouter } from 'next/router'
import POSTS_LIST_QUERY from '../../../queries/posts-list'

const DELETE_POST = gql`
   mutation DeletePost($slug: String!) {
      deletePost (slug: $slug){
         status
      }
   }
`

const Posts = () => {

   const alert = useAlert()
   const router = useRouter()
   const [getPosts, { called, loading, data, error }] = useLazyQuery(POSTS_LIST_QUERY,
      { notifyOnNetworkStatusChange: true, variables: { limit: 10, page: 1 } }
   );

   // const { loading, error, data: deleteData } = useQuery(POSTS_LIST_QUERY, { notifyOnNetworkStatusChange: true })
   const [deletePost] = useMutation(DELETE_POST);
   const onDeletePost = (slug) => {
      deletePost({
         variables: { slug }, refetchQueries: [{ query: POSTS_LIST_QUERY, variables: { limit: 10, page: 1 } }],
      }).then(({ data }) => {
         (data && data.deletePost && data.deletePost.status) ? alert.success('Post deleted!') : alert.error('Error in deleting the category!')
      }).catch(err => alert.error(err.toString()));
   }

   useEffect(() => {
      getPosts({ variables: { page: 1 } });
      (router.query && router.query.create && router.query.create == "success") && alert.success('Post created!');
      (router.query && router.query.update && router.query.update == "success") && alert.success('Post updated!');
   }, [])

   const getPostsTrigger = (page) => getPosts({ variables: { page } });

   const dateLoader = (date) => {
      const createdAt = new Date(parseInt(date))
      return createdAt.getDate() + '/' + (createdAt.getMonth() + 1) + '/' + createdAt.getFullYear()
   }

   return (
      <AuthPanelLayout pageTitle="Posts">
         <section className="panel-list-container">
            {loading && <p>Loading...</p>}
            {error && <p>error!</p>}
            {data && <div><h2 className="inline-page-headline panel-page-title">Posts</h2></div>}
            {!loading && data && ((data.posts && data.posts.status && data.posts.list && data.posts.list.length) ? data.posts.list.map((singlePost, index) => <div className="single-post-row" key={singlePost.slug}>
               <div>
                  <span className="large-text">{singlePost.title}</span>
               </div>
               <div>
                  <span>Author: <Link href={'/panel/authors/' + singlePost.author.username}><a>{singlePost.author.fullName}</a></Link></span>
               </div>
               <div>
                  Categories: {(singlePost.categoriesList && singlePost.categoriesList.length) ? singlePost.categoriesList.map((singleCat, index) => <span key={singleCat.slug} > <span>{singleCat.title}</span>, </span>) : '-'}
               </div>
               <div>
                  Create at: {dateLoader(singlePost.created_at)}
               </div>
               <div>
                  <Link href={`/panel/posts/${singlePost.slug}`}>
                     <a className="button">Edit</a>
                  </Link>
                  <Button label="Delete" className="button red-button" onClick={() => onDeletePost(singlePost.slug)} />
               </div>
            </div>) : 'Posts list is empty!')}
            {!loading && data && <Pagination getNewPage={(page) => getPostsTrigger(page)} currentPage={(data.posts && data.posts.page) || 1} resultPerPage={10} resultCount={(data.posts && data.posts.total) || 10} />}

            <style jsx>{`
            .single-post-row{
               padding: 0.5rem 1rem;
               box-shadow: 0 0.2rem 1.3rem -0.3rem rgba(0,0,0,0.15);
               margin-bottom: 1.5rem;
               border-radius: 0.5rem;
               overflow: hidden;
               display: flex;
               flex-direction: row;
               flex-wrap: nowrap;
               justify-content: space-between;
               align-items: center;                           
            }
            @media screen and (max-width: 767px){
               .single-post-row{
                  display: flex;
                  flex-direction: column;
                  flex-wrap: nowrap;
                  justify-content: flex-start;
               }
               .single-post-row >div:first-of-type{
                  display: block;
                  margin-bottom: 1rem;
                  margin-top: 0.3rem;
               }
            }
            .single-post-row >div:nth-of-type(3){
               display: flex;
               flex-direction: row;
               flex-wrap: nowrap;
               justify-content: space-between;
               align-items: flex-start;                           
            }

         `}</style>
         </section>
      </AuthPanelLayout >
   )
}

export default Posts