import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {MyContext} from '../App'
import { API_URL } from "../consts";

function UpdatePost() {
    const {id} = useParams();
    const navigate = useNavigate();
    const {posts} = useContext(MyContext);
    const [post, setPost] = useState({
        title: '',
        beer: '',
        rating: '',
        review: '',
    });
    
    useEffect(() => {
            if (posts && id) {
                const matchingPost = posts.find((post) => 
                    Number(post.id) === Number(id)
                )
                setPost(matchingPost)
            }
        }, [posts, id])

        const updatePost = async (id, postData) => {
            const response = await fetch(`${API_URL}/posts/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(postData)
            });
            return response.json();
        }

        const handleDelete = () => {
            deleteContact(id).then(() => {
                navigate('/');
            })
            .catch(error => console.error(error));
        };
        
        const deleteContact = async (id) => {
            const response = await fetch(`${API_URL}/posts/${id}`, {
                method: 'DELETE',
            });
            return response.json();
        }
    
        function handleChange(event) {
            const inputName = event.target.name;
            const inputVlaue = event.target.value;
    
            if (inputName === 'title') {
                setPost({...post, title: inputVlaue});
            }
    
            if (inputName === 'beer') {
                setPost({...post, beer: inputVlaue});
            }

            if (inputName === 'rating') {
                setPost({...post, rating: inputVlaue});
            }

            if (inputName === 'review') {
                setPost({...post, review: inputVlaue});
            }
        }
    
        const handleSubmit = (event) => {
            event.preventDefault();
            updatePost(id, post)
                .then (console.log(post))
                .then(() => {
                    navigate('/');
                })
                .catch(error => console.error(error));
        };

        return (
            <div>
            <h1>Update post</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">
                    Title:
                    <input 
                    type="text"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    required />
                </label>
                <label htmlFor="beer">
                    Beer:
                    <input 
                    type="text"
                    name="beer"
                    value={post.beer}
                    onChange={handleChange}
                    required />
                </label>
                <label htmlFor="rating">
                    Rating:
                    <input 
                    type="text"
                    name="rating"
                    value={post.rating}
                    onChange={handleChange}
                    required />
                </label>
                <label htmlFor="review">
                    Review:
                    <input 
                    type="text"
                    name="review"
                    value={post.review}
                    onChange={handleChange}
                    required />
                </label>
                <button type="submit">Save</button>
            </form>
            <button id="delete" onClick={handleDelete}>Delete Post</button>
        </div>
        );
}

export default UpdatePost;