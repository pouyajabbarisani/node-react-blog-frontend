import App from '../components/App'
import Header from '../components/Header'
import PostList from '../components/PostList'
import { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import Head from 'next/head'
import gql from 'graphql-tag'
import config from '../config'
import Router, { useRouter } from 'next/router'
import { XmlEntities as Entities } from 'html-entities';
import Footer from '../components/Footer'
const entities = new Entities();

import POSTS_LIST_QUERY from '../queries/posts-list'
import { initializeApollo } from '../lib/apolloClient'

const GET_SINGLE_POST = gql`
   query Post($slug: String!){
      post(slug: $slug){
         slug
         title
         content
         featuredImage
         created_at
         categoriesList {
            title
            slug
         }
         author {
            fullName
            username
         }
      }
   }
`

const SinglePost = () => {
   const router = useRouter();
   const { loading, error, data } = useQuery(GET_SINGLE_POST, { variables: { slug: router.query.postslug } })

   const dateTimeLoader = (dateTime) => {
      const createdAt = new Date(parseInt(dateTime))
      return createdAt.getDate() + '/' + (createdAt.getMonth() + 1) + '/' + createdAt.getFullYear()
   }


   return (
      <App>
         <Head>
            <title>{data && data.post && data.post.title ? data.post.title : 'Post'}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         </Head>

         <Header />
         <section className="mainsite-maxwidth">
            {loading && <p>Loading...</p>}
            {error && <p>Error on loading data!</p>}
            {!loading && ((data && data.post) ? <div className="single-post-container">
               {data.post.featuredImage && <div className="single-post-container__featured-image-container">
                  <img src={config.serverURL + data.post.featuredImage} alt={data.post.title} />
               </div>}
               <h1>{data.post.title}</h1>

               {(data.post.author.fullName || data.post.created_at) && <div className="single-post-block-content__date-author"><span>{data.post.author.fullName ? data.post.author.fullName + ' | ' : ''}</span><span>{data.post.created_at ? dateTimeLoader(data.post.created_at) : ''}</span></div>}

               {(data.post.categoriesList && data.post.categoriesList.length) && <div className="single-post-block-content__categories"><span>Categories: {data.post.categoriesList.map((singleCat, index) => <span key={singleCat.slug}>{singleCat.title}</span>)}</span></div>}

               <div className="single-post-container__content-body" dangerouslySetInnerHTML={{ __html: entities.decode(data.post.content) }}></div>
            </div> : <p>Post Not Found! - 404</p>)}
         </section>

         <Footer />
      </App>
   )
}

export async function getServerSideProps(context) {
   const apolloClient = initializeApollo()

   await apolloClient.query({
      query: GET_SINGLE_POST,
      variables: { slug: context.params.postslug },
   })

   return {
      props: {
         initialApolloState: apolloClient.cache.extract(),
      },
   }
}

export default SinglePost
