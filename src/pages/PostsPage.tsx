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
                <div className="space-y-4">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="border rounded-lg p-4 shadow-sm"
                        >
                            <h3 className="font-semibold text-lg">
                                {post.title}
                            </h3>

                            <p className="text-gray-600 mt-2">
                                {post.description}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}