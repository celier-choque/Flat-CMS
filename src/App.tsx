import { useState } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import NewsPage from "./pages/NewsPage.tsx";
import PostsPage from "./pages/PostsPage.tsx";

function App() {
    const [page, setPage] = useState("posts")

    return (
        <div className="min-h-screen flex flex-col">
            <Header page={page} setPage={setPage} />

            <main className="flex-grow p-6 text-center">
                {page === "posts" && <PostsPage />}
                {page === "news" && <NewsPage />}
            </main>

            <Footer />
        </div>
    );
}

export default App