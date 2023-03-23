import React from 'react'
import { Link } from 'react-router-dom'

function Post(props) {

    return (
        <div>
            <div className="post-header">
            <Link to={`/posts/${props.props.id}`} className='post-main-link'>
                <h3>{props.props.title}</h3>
            </Link>
            <div className="tags">
                {props.props.tags?.map(tag => {
                    return <p key={tag}>{tag}</p>
                })}
            </div>
            </div>
            <p>{props.props.body}</p>
            <div className="post-bottom" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <p className='post-reaction'><ion-icon name="happy-outline"></ion-icon> {props.props.reactions}</p>
                <Link to={`/posts/${props.props.id}`} className="post-readmore">
                    <ion-icon name="arrow-forward"></ion-icon>
                </Link>
            </div>
        </div>
    )
}

export default Post