import { createBrowserRouter } from "react-router-dom"
import Layout from "../layouts/Layout.jsx"
import Home from "../pages/Home.jsx"
import About from "../pages/About.jsx"
import ArticleDetails from "../pages/ArticleDetails.jsx"
import SignIn from "../pages/SignIn.jsx"
import SignUp from "../pages/SignUp.jsx"

const router = createBrowserRouter([
    {
        path: "/", element: <Layout />, children: [
            { path: "/", element: <Home /> },
            { path: "/about", element: <About /> },
            { path: "/article/:id", element: <ArticleDetails /> }
        ]
    },
    { path: "/signin", element: <SignIn /> },
    { path: "/signup", element: <SignUp /> }
])

export default router