import { createContext, useEffect, useState } from 'react'
import './App.css'
import { API_URL } from './consts'
import { Link, Route, Routes } from 'react-router-dom'
import PostsList from './components/PostsList'
import CreatePost from './components/CreatePost'
import UpdatePost from './components/UpdatePost'

const MyContext = createContext()

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(`${API_URL}/posts`)
    .then(res => res.json())
    .then(data => setPosts(data.data))
  }, []);

  console.log(posts)

  return (
    <div className='app'>
      <MyContext.Provider value={{posts: posts, setPosts: setPosts}}>
        <header className='dashboard'>
          <h1>Dashboard</h1>
          <nav>
            <ul>
              <Link to="/">Home</Link>
              <Link to="/create">Create post</Link>
            </ul>
          </nav>
        </header>
        <main className='content'>
          <Routes>
            <Route path='/' element={<PostsList />} />
            <Route path='/create' element={<CreatePost />} />
            <Route path='/posts/:id' element={<UpdatePost />} />
          </Routes>
        </main>
      </MyContext.Provider>
    </div>
  );
}

export {App, MyContext}
