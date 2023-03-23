import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
// COMPONENTS & PAGES
import Nav from "./Components/Nav";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ProductPage from './Pages/ProductPage'
import Search from "./Pages/Search";
import User from "./Pages/User";
import SinglePost from "./Pages/SinglePost";
import NewPost from "./Pages/NewPost";
import AllPosts from './Pages/AllPosts';
// CUSTOM HOOKS
import useAuth from "./hooks/useAuth";

const queryClient = new QueryClient()

function App() {

  const navigate = useNavigate()

  const [ logged ] = useAuth()

  useEffect(() => {

    if(!logged){
      navigate('/login')
    }

  }, [])

  return (
    <QueryClientProvider client={queryClient} >
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<ProductPage /> }/>
          <Route path="/products/:searchValue" element={<Search />} />
          <Route path="/profile/:userId" element={<User />} />
          <Route path="/profile/:userId/new-post" element={<NewPost /> }/>
          <Route path="/posts/:postId" element={<SinglePost/> } />
          <Route path="/posts" element={<AllPosts />} />
        </Routes>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider >
  );
}

export default App;
