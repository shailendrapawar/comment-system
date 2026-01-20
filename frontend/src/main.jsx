import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { UserProvider } from "./contexts/UserContext.jsx"

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import Landing from './pages/Landing.jsx'
import Home from './pages/home/Home.jsx'

import SinglePost from './pages/singlePost/SinglePost.jsx'

import ProtectedRoute from './components/ProtectedRoutes.jsx'

import { Toaster } from "react-hot-toast"

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route index element={<Landing />}></Route>
    <Route path='/login' element={<Login />}></Route>
    <Route path='/register' element={<Register />}></Route>

    <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>}> </Route>

    <Route path='/posts/:id' element={<ProtectedRoute><SinglePost /></ProtectedRoute>}></Route>
  </Route>
))
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <Toaster />

      <UserProvider>
        <RouterProvider router={router}>

        </RouterProvider>
      </UserProvider>

    </ThemeProvider>
  </StrictMode>,
)
