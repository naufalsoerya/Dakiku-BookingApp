import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './router.jsx'
import { RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId="155566357791-j3vna54ebf74gcqg3dhmt4o8u8csa7dp.apps.googleusercontent.com">
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
  // </React.StrictMode>,
)
