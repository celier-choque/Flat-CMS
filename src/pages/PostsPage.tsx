import type { Post } from "../App.tsx";

interface NewsPageProps {
    posts: Post[];
}

export default function PostsPage({ posts }: NewsPageProps) {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Posts</h2>

            {posts.length === 0 ? (
                <p>No posts yet</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white rounded-xl shadow overflow-hidden">
                            {post.imageUrl && (
                                <img
                                    src={post.imageUrl}
                                    alt={post.title}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div>
                                <h3 className="font-semibold text-lg">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    {post.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}