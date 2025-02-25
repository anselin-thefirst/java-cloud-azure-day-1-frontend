import { useEffect, useState } from "react";
import { API_URL } from '../consts'
import { useNavigate } from "react-router-dom";


function Post({post}) {
    const [comments, setComments] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_URL}/${post.id}/comments`)
        .then(res => res.json())
        .then(data => setComments(data.data))
      }, [post]);

    console.log('these are the comments', comments)
    console.log('these are the posts', post)

    return (
        <li>
            <h3>posted by: {post.user.username}</h3>
            <h3>{post.title}</h3>
            <h4>Beer: {post.beer}</h4>
            <h4>Rating: {post.rating}</h4>
            <h4>Review: {post.review}</h4>
            <p>Comments: </p>
            {comments && (
                <ul>
                    {comments.map((comment, index) => (
                        <li id="comments" key={index}>{comment.commenter.username}: {comment.content}</li>
                    ))}
                </ul>
            )}
            <button onClick={() => navigate(`/posts/${post.user.id}`)}>Update post</button>
        </li>
    )
}

export default Post;