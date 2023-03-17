import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
// import AppContext from './store/context'
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Nav from "./Components/Nav";
import ProductPage from './Pages/ProductPage'
import Search from "./Pages/Search";
// 

const queryClient = new QueryClient()

function App() {

  const navigate = useNavigate()

  const token = localStorage.getItem('token') || null

  useEffect(() => {

    if(!token || token === undefined){
      navigate('/login')
    }

  }, [navigate, token])

  return (
    <QueryClientProvider client={queryClient} >
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<ProductPage /> }/>
          <Route path="/products/:searchValue" element={<Search />} />
        </Routes>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider >
  );
}

export default App;
