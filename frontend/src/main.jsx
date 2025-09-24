import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import SignIn from './AuthPages/SignIn.jsx'
import SignUp from './AuthPages/SignUp.jsx'
import EditNote from './EditNote.jsx'
import Error from './Error.jsx'
import AddNote from './AddNote.jsx'
import Home from './Home.jsx';
import Note from './Note.jsx'
import "./output.css"

const router = createBrowserRouter([
  {path:"/", element: <Home/>},
  {path:"/notes", element: <Note/>},
  {path:"/notes/:id", element : <EditNote/>},
  {path:"/notes/new", element : <AddNote/>},
  {path:"/signin", element: <SignIn/>},
  {path:"/signup", element: <SignUp/>},
  {path:"/*", element: <Error/>}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
