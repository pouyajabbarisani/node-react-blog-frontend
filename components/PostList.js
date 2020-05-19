import { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import config from '../config'
import ErrorMessage from './ErrorMessage'
import POSTS_LIST_QUERY from '../queries/posts-list'
import htmlToText from 'html-to-text';
import { XmlEntities as Entities } from 'html-entities';
const entities = new Entities();


export default function PostList() {
  const { loading, error, data
  } = useQuery(
    POSTS_LIST_QUERY,
    {
      notifyOnNetworkStatusChange: true,
    }
  )
  useEffect(() => { console.log(error) })
  const dateTimeLoader = (dateTime) => {
    const createdAt = new Date(parseInt(dateTime))
    return createdAt.getDate() + '/' + (createdAt.getMonth() + 1) + '/' + createdAt.getFullYear()
  }

  if (error) return <ErrorMessage message="Error loading posts." />
  if (loading) return <div>Loading</div>
  // const areMorePosts = allPosts.length < _allPostsMeta.count
  return (
    <section className="mainsite-maxwidth">
      {data && data.posts && data.posts.list && data.posts.list.map((post, index) => (
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
    </section>
  )
}
