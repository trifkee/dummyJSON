import React, { useEffect, useState } from 'react'
import usePost from '../hooks/usePost'

function NewPost({handleForm}) {

    // SETTING INITIAL POST DATA
    const [post, setPost] = useState({
        title:'',
        body:''
    })

    const preventSubmit = e => {
        e.preventDefault()
    }
    
    // CUSTOM HOOK TO POST
    let body = {
        ...post,
        userId: JSON.parse(localStorage.getItem('user'))
    }
    const { mutate:handleSubmit, posted } = usePost(`https://dummyjson.com/auth/posts/add`, body)
    
    useEffect(() => {
        if(posted){
            return handleForm()
        }
    }, [posted])

    // HANDLING VALUES FOR INPUTS
    const handleChange = (e) => {
        setPost(prevPost => {
            return {
                ...prevPost,
                [e.target.name]: e.target.value
            }
        })
    }

    // FINAL RENDER
    return (
        <div className='new-post-modal'>
            <form className='newpost-form margins' onSubmit={preventSubmit}>
                <h2>Create new post</h2>
                <p style={{fontWeight:'300', marginTop:'-1rem'}}>Release your creativity</p>
                    <div className="image-close" onClick={() => handleForm()}>
                        <ion-icon name="close-circle"></ion-icon>
                    </div>
                    <div className="newpost-input inputs">
                    <p>Title</p>
                    <input name='title' placeholder='Some creative title here' value={post.title} onChange={handleChange} required type="text" />
                </div>
                <div className="newpost-input inputs">
                    <p>Post</p>
                    <textarea name='body' placeholder='Creative body of the post' value={post.body} onChange={handleChange} required cols="70" rows="10"></textarea>
                </div>
                <button onClick={handleSubmit}>Add new post</button>
            </form>
            <div className="modal" onClick={() => handleForm()}></div>
        </div>
    )
}

export default NewPost 