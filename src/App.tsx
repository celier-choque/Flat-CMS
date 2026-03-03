import { useState } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import NewsPage from "./pages/NewsPage.tsx";
import PostsPage from "./pages/PostsPage.tsx";

export interface Post {
    id: string
    title: string
    description: string
    imageUrl: string
    section: 'posts'
    createdAt: string
}

const ADMIN_USER = 'admin'
const ADMIN_PASS = 'admin123'

function App() {
    const [page, setPage] = useState("posts")
    const [isAdmin, setIsAdmin] = useState(false)

    const handleLogin = (username: string, password: string): boolean => {
        if (username === ADMIN_USER && password === ADMIN_PASS) {
            setIsAdmin(true)
            return true
        }
        return false
    }

    const handleLogout = () => setIsAdmin(false)

    return (
        <div className="min-h-screen flex flex-col">
            <Header
                page={page}
                setPage={setPage}
                onLogout={handleLogout}
                onLogin={handleLogin}
                isAdmin={isAdmin}
            />

            <main className="flex-grow p-6 text-center">
                {page === "posts" && <PostsPage />}
                {page === "news" && <NewsPage />}
            </main>

            <Footer />
        </div>
    );
}

export default App