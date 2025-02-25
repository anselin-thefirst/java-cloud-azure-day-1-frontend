import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../consts";

function CreatePost() {
    const [postData, setPostData] = useState({
        title: '',
        beer: '',
        rating: '',
        review: '',
    })

    const navigate = useNavigate();

    function handleChange(event) {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        if (inputName === 'title') {
            setPostData({...postData, title: inputValue});
        }

        if (inputName === 'beer') {
            setPostData({...postData, beer: inputValue});
        }

        if (inputName === 'rating') {
            setPostData({...postData, rating: inputValue});
        }

        if (inputName === 'review') {
            setPostData({...postData, review: inputValue});
        }
    }

    const createPost = async (id, post) => {
        console.log('this is the id', id)
        const response = await fetch(`${API_URL}/posts/${id}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(post)
        });
        if (!response.ok) throw new Error('Failed to create new post');
        return await response.json();
    }

    // initially planned to support multiple users, only hardcoded user id temporarily to test functionality 
    const id = 2;

    const handleSubmit = (event) => {
        event.preventDefault();
        createPost(id, postData)
        .then(console.log('this is your post', postData))
        .then(() => navigate('/'))
        .then(error => console.error(error));
    };

    return (
        <div>
            <h1>Post something</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">
                    Title:
                    <input
                    type="text"
                    name="title"
                    value={postData.title}
                    onChange={handleChange}
                    required />
                </label>
                <label htmlFor="beer">
                    Beer:
                    <input
                    type="text"
                    name="beer"
                    value={postData.beer}
                    onChange={handleChange}
                    required />
                </label>
                <label htmlFor="rating">
                    Rating:
                    <input
                    type="number"
                    name="rating"
                    value={postData.rating}
                    onChange={handleChange}
                    required />
                </label>
                <label htmlFor="review">
                    Review:
                    <input
                    type="text"
                    name="review"
                    value={postData.review}
                    onChange={handleChange}
                    required />
                </label>
                <button type="submit">Post</button>
            </form>
        </div>
    );
}

export default CreatePost;