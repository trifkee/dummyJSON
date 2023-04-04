import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { SinglePost } from '../../domain/interfaces/posts/posts'
// HOOKS
import { useFetchUser } from '../../infrastructure/API/queries/useFetchUser'
import { useFetchUserPosts } from '../../infrastructure/API/queries/useFetchUserPosts'
// UI
import Post from '../Components/Post'
import NewPost from './NewPost'
import { Link } from 'react-router-dom'

function User() {
  const currUser = localStorage.getItem('user')
  let { userId:id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    !currUser ? navigate('/login') : refetchAll()
  }, [])

  function refetchAll(){
    userRefetch()
    postRefetch()
  }

  // !currUser && navigate('/login')

  const [active, setActive] = useState(false)

  const handleForm = () => {
    return setActive(false)
  }
  // QUERYING DATA
  const { data:user, isFetching:userFetch, refetch:userRefetch } = useFetchUser('user', `${currUser}`)
  // const { data:user, isFetching:userFetch } = useFetchUser('user', `${localStorage.getItem('user')}`)
  const { data:userPosts, isFetching, refetch:postRefetch } = useFetchUserPosts('userPosts', `${id}`)

  const handleLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  // NAVIGATE TO THE PAGE 'create new post'
  const handleNewPost = (e:React.MouseEvent) => {
    setActive(true)
  }

  // CONDITIONAL RENDERNG
  const showUsersPosts = () => {
    if(isFetching){
      <div>Loading posts...</div>
    }
    
    if(userPosts?.data.posts.length){
      return userPosts?.data.posts.map((post:SinglePost) => {
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
        {currUser === id && <div className='user-cta' style={{display:'flex', gap:"1rem", width:'100%'}}>
          <button  style={{width:'60%'}} onClick={handleLogOut}>Sign out 🔒</button>
          <Link to={`/profile/${id}/edit-profile`} data-name='edit' style={{width:'40%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem', borderRadius:'.3rem'}} className='edit-btn-user' >Edit profile🔧</Link>
        </div>}
        </div>
        {currUser === id && <button data-name='create-post'  onClick={handleNewPost} className='new-post'>Create new post 📤{/*<ion-icon aria-hidden="true" name="add-circle"></ion-icon>*/}</button>}
        <div className="profile-posts">
          {showUsersPosts()}
        </div>
    </section>
  )
}

export default User