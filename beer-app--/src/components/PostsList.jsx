import { useContext } from "react";
import { MyContext } from '../App';
import  Post  from './Post'

function PostsList() {
    const {posts} = useContext(MyContext)

    return (
        <div className="posts"> 
            <h1>Posts: </h1>
            <ul>
                {posts &&
                posts.map((post, index) => {
                    return <Post key={index} post={post} />
                })
                }
            </ul>
        </div>
    );
}

export default PostsList;