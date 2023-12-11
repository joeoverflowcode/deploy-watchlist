import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import App from './App.jsx';
import ErrorPage from './pages/ErrorPage.jsx'
import IndexPage from './pages/Index.jsx';

import LoginPage from './pages/LoginPage.jsx';
import UserProfilePage from './pages/UserProfilePage.jsx';
import axios from 'axios'
import SignUpPage from './pages/SignUpPage.jsx';

import store from './store.js'
import { Provider } from 'react-redux';

import WatchlistPage from './pages/WatchlistPage.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(

    <Route
    path='/'
    element={<App />}
    errorElement={<ErrorPage />}
    >

    {/* Index Page */}
      <Route
    index element={<IndexPage />}
    loader={ async () => {
      const res = await axios.get('/stock')
      console.log(res.data)
      return {stock: res.data}
    }}
      />

    {/* Login Page  */}
    <Route 
    path='login' 
    element={<LoginPage />} 
    />

    {/* Signup Page  */}
    <Route
    path='signup'
    element={<SignUpPage />}
    />


    {/* User Profile page  */}
    <Route
    path='me'
    element={<UserProfilePage />}
    loader={ async () => {
      const res = await axios.get('/stock')
      const {data} = await axios.get('/userstock')
      console.log(data) 
      console.log(res.data)
      return {
        stock: res.data, 
        userStocks: data
      }
    }}
    />


<Route
path='watchlist'
element={<WatchlistPage/>}
loader={ async () => {
  const stocks = await axios.get('/api/watchlist')
  console.log(stocks.data)
  return { myStock: stocks.data}
}}
/>

    </Route>
  )
)



ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)