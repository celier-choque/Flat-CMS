import type {Post} from "../App.tsx";

const BIN_ID = import.meta.env.VITE_JSONBIN_BIN_ID
const MASTER_KEY = '$2a$10$bwoWUdgRD2z7368edHlTY.8EPx4E4Ct4CynLOkRpjtDW/Biccwyf6'
const URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`

export async function getPosts(): Promise<Post[]> {
    try {
        const res = await fetch(`${URL}/latest`)
        const data = await res.json()
        return data.record.posts
    } catch {
        return []
    }
}

export async function savePosts(posts: Post[]): Promise<void> {
    await fetch(URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': MASTER_KEY,
        },
        body: JSON.stringify({ posts }),
    })
}