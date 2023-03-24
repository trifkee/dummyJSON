import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
// HOOKS
import { useFetchUser } from '../../infrastructure/API/queries/useFetchUser'
import { useFetchUserPosts } from '../../infrastructure/API/queries/useFetchUserPosts'
// UI
import Post from '../Components/Post'
import NewPost from '../Pages/NewPost'

function User() {
  const currUser = localStorage.getItem('user')
  let { userId:id } = useParams()

  const navigate = useNavigate()

  const [active, setActive] = useState(false)

  const handleForm = () => {
    return setActive(false)
  }
  // QUERYING DATA
  const { data:user, isFetching:userFetch } = useFetchUser('user', `${currUser}`)
  const { data:userPosts, isFetching } = useFetchUserPosts('userPosts', `${id}`)

  const handleLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  // NAVIGATE TO THE PAGE 'create new post'
  const handleNewPost = () => {
    setActive(true)
  }

  // CONDITIONAL RENDERNG
  const showUsersPosts = () => {
    if(isFetching){
      <div>Loading posts...</div>
    }
    
    if(userPosts?.data.posts.length){
      return userPosts?.data.posts.map(post => {
        return (
          <Post key={post.id} props={post} />
        )
      })
    }

    // CHECK FOR LOGGED USER ID
    if(id === currUser) {
      return(
        <>
          <h2 style={{marginTop:'1rem'}}>You haven't created any post yet.</h2>
          <p>Create new post now</p>
        </>
      )
    } else {
      return <h2 style={{marginTop:'1rem'}}>This user doesn't have any posts created yet</h2>
    }
  }

  if(userFetch || user?.data === undefined){
    return <section className='modal' style={{marginTop:'10rem'}}>LOADING...</section>
  }

  return (
    <section className='margins'>
      {active && (
         <NewPost handleForm={handleForm} />
      )}
        <div className="profile">
          <img src={user?.data.image || 'https://i1.wp.com/www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg?ssl=1'} alt={user?.data.username} />
          <div className="profile-info">
            {/* <p>{user?.data.email}</p> */}
            <h2>{user?.data.username}</h2>
            <p style={{fontSize:'.9rem'}}>{`${user?.data.firstName} ${user?.data.lastName}`}</p>
          </div>
        {currUser === id && <button onClick={handleLogOut}>Sign out <ion-icon style={{fontSize:'1.2rem'}} name="log-out-outline"></ion-icon></button>}
        </div>
        {currUser === id && <button onClick={handleNewPost} className='new-post'>Create new post <ion-icon name="add-circle"></ion-icon></button>}
        <div className="profile-posts">
          {showUsersPosts()}
        </div>
    </section>
  )
}

export default User