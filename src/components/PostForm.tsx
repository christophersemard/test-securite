import { User, Post } from "@prisma/client";
import React, { useEffect, useState } from "react";

const PostForm = ({
    token,
    isAdmin,
    name,
}: {
    token: string | null;
    isAdmin: boolean;
    name: string;
}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!isAdmin) {
            setError("Only admin can create a new post");
            console.error("Only admin can create a new post");
        } else {
            setError("");
            // Faire quelque chose avec les valeurs de title et content
            fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, content }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setPosts([...posts, data]);
                })
                .catch((error) => {
                    // Gérer l'erreur
                });
        }
    };

    const getPosts = async () => {
        try {
            const response = await fetch("/api/posts", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            // Faire quelque chose avec la réponse de l'API
            return data;
        } catch (error) {
            // Gérer l'erreur
            console.error(error);
            return [];
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const retrievedPosts = await getPosts();
            setPosts(retrievedPosts);
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        console.log(posts);
    }, [posts, error]);

    return (
        <div className="py-24 grid lg:grid-cols-2 gap-5">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <h1 className="text-2xl font-bold mb-4">Add a Post</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label htmlFor="title" className="block">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        className="border border-gray-300 px-2 py-1 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block">
                        Content:
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        className="border border-gray-300 px-2 py-1 w-full"
                    />
                </div>
                <button type="submit" className="btn btn-primary px-4 py-2">
                    Submit
                </button>
            </form>

            <div className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mt-0 mb-4">Posts list</h2>

                <ul>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <li key={post.id} className="mb-4 bg-gray-200 p-4">
                                <h3 className="text-lg font-bold">
                                    {post.title}
                                </h3>
                                <p>{post.content}</p>
                            </li>
                        ))
                    ) : (
                        <p>No posts yet</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default PostForm;
