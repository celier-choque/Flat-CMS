import {useState} from "react";

type HeaderProps = {
    page: string
    setPage: (page: string) => void
    onLogout: () => void
    onLogin: (username: string, password: string) => boolean
    isAdmin: boolean
}

const Header = ({page, setPage, onLogout, onLogin, isAdmin}: HeaderProps) => {
    const [showForm, setShowForm] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        const logged = onLogin(username, password)
        if (logged) {
            setShowForm(false)
            setUsername('')
            setPassword('')
            setError('')
        } else {
            setError('incorrect credentials')
        }
    }

    return (
        <header className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <h1 className="text-2xl font-bold">FLAT CMS</h1>
                <nav className="flex gap-4">
                    <button
                        onClick={() => {
                            setPage("posts")
                        }}
                    >
                        Posts
                    </button>
                    <button
                        onClick={() => setPage("news")}
                    >
                        News
                    </button>
                </nav>
                <div>
                    <div className="relative">
                        {isAdmin ? (
                            <div className="flex items-center gap-3">
                                <span className="text-sm bg-blue-800 px-3 py-1 rounded-full">
                                session: Admin
                                </span>
                                <button
                                    onClick={onLogout}
                                    className="bg-white text-blue-600 px-4 py-2 rounded font-medium hover:bg-blue-50 transition"
                                >
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <div>
                                <button
                                    onClick={() => setShowForm(!showForm)}
                                    className="bg-white text-blue-600 px-4 py-2 rounded font-medium hover:bg-blue-50 transition"
                                >
                                    Log In
                                </button>

                                {showForm && (
                                    <div
                                        className="absolute mt-2 bg-white text-gray-800 rounded-xl shadow-lg p-6 w-80 z-50
                                            left-1/2 -translate-x-1/2
                                            sm:left-auto sm:translate-x-0 sm:right-0">
                                        <form onSubmit={handleLogin} className="flex flex-col gap-3">
                                            <input
                                                type="text"
                                                placeholder="username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                            <input
                                                type="password"
                                                placeholder="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                            {error && <p className="text-red-500 text-xs">{error}</p>}
                                            <button
                                                type="submit"
                                                className="bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700 transition"
                                            >
                                                Log In
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setShowForm(false)}
                                                className="bg-gray-300 text-gray-800 py-2 rounded text-sm font-medium"
                                            >
                                                Cancel
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;