import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
// HOOKS
import { useFetchUser } from '../../infrastructure/API/queries/useFetchUser'
import { useFetchComments } from '../../infrastructure/API/queries/useFetchComments'
import { useFetchPost } from '../../infrastructure/API/queries/useFetchPost'
import usePost from '../../infrastructure/API/mutations/usePost'

function SinglePost() {

    let { postId:id } = useParams()
    let localUserId = localStorage.getItem('user')

    const [comment, setComment] = useState('')

    const handleComment = (e) => {
        setComment(e.target.value)
    }

    let body = {
        body:comment,
        postId: id,
        userId: localUserId,
    }
    
    // CUSTOM HOOKS
    const { mutate, posted } = usePost(`https://dummyjson.com/auth/comments/add`, body)
    const { data } = useFetchPost('Post', `${id}`)
    const { data:user } = useFetchUser('PostUser', `${localUserId}`)
    const { data:comments } = useFetchComments('PostComments', `${id}`)

    useEffect(() => {
        if(posted){
            return setComment('')
        }
    }, [posted])

    // ADD COMMENT Fn
    const postComments = () => {
        if(comments?.data.comments.length){
            return comments?.data.comments.map(comment => {
                return (
                    <div style={{borderRadius:'.4rem'}} key={comment.id} className='post-comment'>
                        <p>{comment?.user.username}</p>
                        <h3>{comment?.body}</h3>
                    </div>
                )
            })
        }
        return <p><ion-icon name="chatbubbles"></ion-icon> No comments yet.</p>
    }

    return (
        <section style={{marginTop:'4rem'}} className='margins'>
            <div>
                <div className='post-user'>
                    <img src={user?.data.image || 'https://i1.wp.com/www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg?ssl=1'} alt={user?.data.username} />
                    <div className="post-header">
                        <h3>{data?.data.title}</h3>
                        <div className="tags">
                            {data?.data.tags?.map(tag => {
                                return <p key={tag}>{tag}</p>
                            })}
                        </div>
                    </div>
                </div>
                <p>{data?.data.body}</p>
                <p className='post-reaction'><ion-icon name="happy-outline"></ion-icon> {data?.data.reactions}</p>
            </div>

            <div className='allComments' style={{marginTop:'1rem'}}>
                <h2>Comments</h2>
                <p style={{fontSize:'.85rem'}}>Reply to this post</p>
                <div className="post-add-comment">                    
                    <div className="post-add-comment-field">
                        <input value={comment} onChange={handleComment} placeholder='Add comment...' type="text" />
                        <button onClick={mutate} className='submit-comment-btn'><ion-icon name="add-circle-outline"></ion-icon></button>
                    </div>
                </div>
                {postComments()}
            </div>
        </section>
    )
}

export default SinglePost