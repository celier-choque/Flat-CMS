import { useState, useEffect } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import NewsPage from "./pages/NewsPage.tsx";
import PostsPage from "./pages/PostsPage.tsx";
import {getPosts, savePosts} from "./services/storage.ts";

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
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        getPosts().then((data) => {
            setPosts(data)
        })
    }, [])

    const handleLogin = (username: string, password: string): boolean => {
        if (username === ADMIN_USER && password === ADMIN_PASS) {
            setIsAdmin(true)
            return true
        }
        return false
    }

    const handleLogout = () => setIsAdmin(false)

    const handleAddPost = async (post: Omit<Post, 'id' | 'createdAt'>) => {
        const newPost: Post = {
            ...post,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
        }
        const updated = [newPost, ...posts]
        setPosts(updated)
        await savePosts(updated)
    }

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
                {page === "posts" &&
                    <PostsPage
                        posts={posts}
                        isAdmin={isAdmin}
                        onAdd={handleAddPost}
                    />}
                {page === "news" && <NewsPage />}
            </main>

            <Footer />
        </div>
    );
}

export default App