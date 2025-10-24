import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import SidebarRight from "../components/Sidebar/SidebarRight"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Main Content Area */}
                    <div className="flex-grow">
                        <Outlet />
                    </div>
                    {/* Sidebar */}
                    <div className="md:w-64 flex-shrink-0">
                        <SidebarRight />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Layout