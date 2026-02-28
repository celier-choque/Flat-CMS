import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow p-6 text-center">
                <h2 className="text-lg">
                    content
                </h2>
            </main>

            <Footer />
        </div>
    );
}

export default App