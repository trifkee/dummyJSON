import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Post from '../Components/Post'

function AllPosts() {
    const [page, setPage] = useState(1)

    const { data:allUsers } = useFetch('users', `https://dummyjson.com/auth/users`)
    const { data:allPosts, refetch, isFetching } = useFetch('post', `https://dummyjson.com/auth/posts?limit=4&skip=${page*4}`)

    // PAGINATION
    const handlePagination = (e) => {
        switch(e.target.name){
            case 'next':
                if(page === 25){
                    return
                }

                setPage(prevPage => prevPage + 1)
                refetch()
                break;

            case 'prev':
                if(page === 1){
                    return
                }
                
                setPage(prevPage => prevPage - 1)
                refetch()
                break

            default:
                return;
        }
    }

    // SHOWING ALL POSTS + isFetching
    const fetchPosts = () => {
        if(isFetching){
            return <h2 style={{marginTop:'3rem'}}>LOADING...</h2>
        }
        return allPosts?.data.posts.map(post => <Post key={post.id} props={post} />)
    }

    return (
        <>
        <section className='posts-section' style={{display:'flex', marginBottom:'2rem'}}>
                <div className="users-list">
                    {allUsers?.data.users.map(user => <Link className='user-list' to={`/profile/${user.id}`} key={user.id}><img src={user.image} alt={user.username}/> <p>{user.username}</p></Link>)}
                </div>
                <div className="post-list" style={{marginInline:'auto'}}>
                    <div className="profile-posts">
                        {fetchPosts()}
                    </div>
                </div>

            </section>
            <div style={{width:'100%', display:'flex', justifyContent:'center', gap:'1rem', paddingBottom:'3rem'}} className="post-pagination">
                <button onClick={handlePagination} name='prev'> backward </button>
                <button onClick={handlePagination} name='next' > forward </button>
            </div>
        </>
    )
}

export default AllPosts