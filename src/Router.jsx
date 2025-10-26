import { createBrowserRouter } from "react-router-dom"
import Layout from "./Layout"
import Home from "./pages/Home"
import About from "./pages/About"
import ArticleDetail from "./pages/ArticleDetail"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import ArticleAdd from "./pages/ArticleAdd"
import ArticleEdit from "./pages/ArticleEdit"

const router = createBrowserRouter([
    {
        path: "/", element: <Layout />, children: [
            { path: "/", element: <Home /> },
            { path: "/about", element: <About /> },
            { path: "/article/add", element: <ArticleAdd /> },
            { path: "/article/:id/edit", element: <ArticleEdit /> },
            { path: "/article/:id", element: <ArticleDetail /> }
        ]
    },
    { path: "/signin", element: <SignIn /> },
    { path: "/signup", element: <SignUp /> }
])

export default router