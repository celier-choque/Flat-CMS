const Header = () => {
    return (
        <header className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <h1 className="text-2xl font-bold">FLAT CMS</h1>
                <nav className="flex gap-4">
                    <button className="px-4 py-2 rounded font-medium transition">
                        Posts
                    </button>
                </nav>

                <div>
                    <button className="px-4 py-2 rounded font-medium transition">
                        Log In
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;