"use client"

import { useEffect } from "react";
import { Routes, Route, redirect } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
// COMPONENTS & PAGES
import Nav from "./ui/Components/Nav";
import Home from "./ui/Pages/Home";
import Login from "./ui/Pages/Login";
import ProductPage from './ui/Pages/ProductPage'
import Search from "./ui/Pages/Search";
import User from "./ui/Pages/User";
import SinglePost from "./ui/Pages/SinglePost";
import NewPost from "./ui/Pages/NewPost";
import AllPosts from './ui/Pages/AllPosts';
// CUSTOM HOOKS
import useAuth from "./hooks/useAuth";
import { EditProfil } from "./ui/Pages/EditProfile";

const queryClient = new QueryClient()

function App() {

  const { logged } = useAuth()

  useEffect(() => {

    if(!logged){
      redirect('/login')
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
          <Route path="/profile/:userId/edit-profile" element={<EditProfil/>} />
          <Route path="/posts/:postId" element={<SinglePost/> } />
          <Route path="/posts" element={<AllPosts />} />
        </Routes>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider >
  );
}

export default App;
