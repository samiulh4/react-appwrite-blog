import Layout from "./Layouts/Layout"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"

const router = createBrowserRouter([
  {path: "/", element: <Layout />, children: [
    {path: "/", element: <Home />},
    {path: "/about", element: <About />}
  ]}
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App

