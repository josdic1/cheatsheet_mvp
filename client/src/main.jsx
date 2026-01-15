import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes.jsx'
import './index.css'

const router = createBrowserRouter(routes, {
  basename: '/cheatsheet_mvp/'
})

const root = createRoot(document.getElementById('root'))
root.render(<RouterProvider router={router} />)