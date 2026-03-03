import type { Post } from "../App.tsx";
import {useState} from "react";

interface NewsPageProps {
    posts: Post[];
    isAdmin: boolean;
    onAdd: (post: Omit<Post, 'id' | 'createdAt'>) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

export default function PostsPage({ posts, isAdmin, onAdd, onDelete }: NewsPageProps) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [saving, setSaving] = useState(false)
    const [lightbox, setLightbox] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim()) return
        setSaving(true)
        await onAdd({ title, description, imageUrl, section: 'posts' })
        setTitle('')
        setDescription('')
        setImageUrl('')
        setSaving(false)
    }


    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Posts</h2>

            {isAdmin && (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow mb-8 flex flex-col gap-4">
                    <h3 className="font-semibold">New Post</h3>

                    <input
                        type="text"
                        placeholder="Title *"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-gray-300 p-2 w-full"
                        required
                    />

                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="border border-gray-300 p-2 w-full"
                    />

                    <input
                        type="url"
                        placeholder="image URL (optional)"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="border border-gray-300 p-2 w-full"
                    />

                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-blue-500 text-white px-4 py-2"
                    >
                        {saving ? 'publishing...' : 'publish'}
                    </button>
                </form>
            )}


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
                                    onClick={() => setLightbox(post.imageUrl)}
                                    className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition"
                                />
                            )}
                            <div className="p-4">
                                <h3 className="font-semibold text-lg">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    {post.description}
                                </p>
                                <p className="text-xs text-gray-400 mt-2">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </p>
                                {isAdmin && (
                                    <button
                                        onClick={() => onDelete(post.id)}
                                        className="mt-3 text-red-500 text-sm hover:underline"
                                    >
                                        delete
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {lightbox && (
                <div
                    onClick={() => setLightbox('')}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                >
                    <img
                        src={lightbox}
                        className="max-w-full max-h-full rounded-xl object-contain"
                    />
                </div>
            )}
        </div>
    );
}