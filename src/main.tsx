import { initializeApp } from 'firebase/app'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const firebaseConfig = {
  apiKey: 'AIzaSyD0LApjVOmTZ4PEtXcreqCHvD6gnimj0Ds',
  authDomain: 'image-uploader-86053.firebaseapp.com',
  projectId: 'image-uploader-86053',
  storageBucket: 'image-uploader-86053.appspot.com',
  messagingSenderId: '1060588979393',
  appId: '1:1060588979393:web:daa16db3127dd0e8644040',
  measurementId: 'G-QC5CL8DDJS',
}

initializeApp(firebaseConfig)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
