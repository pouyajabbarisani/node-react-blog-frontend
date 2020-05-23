import { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import config from '../config'
import ErrorMessage from './ErrorMessage'
import POSTS_LIST_QUERY from '../queries/posts-list'
import CATEGORY_POSTS_LIST_QUERY from '../queries/category-posts-list'
import htmlToText from 'html-to-text';
import { XmlEntities as Entities } from 'html-entities';
import Router from 'next/router'
import Pagination from './Pagination'
import { useRouter } from 'next/router'
const entities = new Entities();


export default function PostList(props) {
  const router = useRouter();

  const { loading, error, data
  } = useQuery(
    props.categorized ? CATEGORY_POSTS_LIST_QUERY : POSTS_LIST_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        slug: (props.categorized && router && router.query && props.slug) ? props.slug : null,
        page: parseInt(props.page) || 1
      }
    }
  )

  const dateTimeLoader = (dateTime) => {
    const createdAt = new Date(parseInt(dateTime))
    return createdAt.getDate() + '/' + (createdAt.getMonth() + 1) + '/' + createdAt.getFullYear()
  }

  if (error) return <ErrorMessage message="Error loading posts." />
  if (loading) return <div>Loading</div>
  // const areMorePosts = allPosts.length < _allPostsMeta.count


  return (
    <section className="mainsite-maxwidth">
      {(props.categorized && data.category && data.category.title) && <h1>Category: {data.category.title}</h1>}

      {props.categorized ? data && data.category && data.category.pagedPosts && data.category.pagedPosts.list && data.category.pagedPosts.list.map((post, index) => (
        <div className="single-post-block" key={index}>
          <div className="single-post-block-image">
            <a href={post.slug}><img alt={post.title} src={post.featuredImage ? config.serverURL + post.featuredImage : '/no-image.jpg'} /></a>
          </div>
          <div className="single-post-block-content">
            <a href={post.slug}><h2>{post.title}</h2></a>

            {(post.author.fullName || post.created_at) && <div className="single-post-block-content__date-author"><span>{post.author.fullName ? post.author.fullName + ' | ' : ''}</span><span>{post.created_at ? dateTimeLoader(post.created_at) : ''}</span></div>}

            <p>{htmlToText.fromString(entities.decode(post.content), { ignoreImage: true }).slice(0, 220).split(' ').slice(0, -1).join(' ') + '...'}</p>
          </div>
        </div>
      )) : data && data.posts && data.posts.list && data.posts.list.map((post, index) => (
        <div className="single-post-block" key={index}>
          <div className="single-post-block-image">
            <a href={post.slug}><img alt={post.title} src={post.featuredImage ? config.serverURL + post.featuredImage : '/no-image.jpg'} /></a>
          </div>
          <div className="single-post-block-content">
            <a href={post.slug}><h2>{post.title}</h2></a>

            {(post.author.fullName || post.created_at) && <div className="single-post-block-content__date-author"><span>{post.author.fullName ? post.author.fullName + ' | ' : ''}</span><span>{post.created_at ? dateTimeLoader(post.created_at) : ''}</span></div>}

            <p>{htmlToText.fromString(entities.decode(post.content), { ignoreImage: true }).slice(0, 220).split(' ').slice(0, -1).join(' ') + '...'}</p>
          </div>
        </div>
      ))}
      {!loading && data && <Pagination
        getNewPage={(page) => Router.push(props.categorized ? `/categories/${props.slug}/pages/${page}` : `/page/${page}`)}
        currentPage={(props.categorized ? (data && data.category && data.category.pagedPosts && data.category.pagedPosts.page) : (data && data.posts && data.posts.page)) || 1}
        resultPerPage={10}
        resultCount={(props.categorized ? (data && data.category && data.category.pagedPosts && data.category.pagedPosts.total) : (data.posts && data.posts.total)) || 10} />
      }
    </section>
  )
}
