import { createBrowserRouter } from "react-router-dom"
import Layout from "./Layout"
import Home from "./pages/Home"
import About from "./pages/About"
import ArticleDetails from "./pages/ArticleDetails"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import ArticleAdd from "./pages/ArticleAdd"

const router = createBrowserRouter([
    {
        path: "/", element: <Layout />, children: [
            { path: "/", element: <Home /> },
            { path: "/about", element: <About /> },
            { path: "/article/:id", element: <ArticleDetails /> },
            { path: "/article/add", element: <ArticleAdd /> }
        ]
    },
    { path: "/signin", element: <SignIn /> },
    { path: "/signup", element: <SignUp /> }
])

export default router