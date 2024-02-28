"use client";
import PostForm from "@/components/PostForm";
import { User } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogged, setIsLogged] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ email, password });

        fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response data
                console.log(data);
                if (!data.error) {
                    setIsLogged(true);
                    setUserToken(data.token);
                    setIsAdmin(data.isAdmin);
                    setName(data.name);
                }
            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
            });
    };

    useEffect(() => {
        let comment = document.querySelector("#comment");

        if (comment) {
            comment.innerHTML =
                "<!-- Logs admin@admin.com | password : 123 ––>";
        }
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {isLogged ? (
                <div className="mb-5">
                    <h1 className="text-2xl font-bold mb-5">
                        You are logged in
                    </h1>
                    <p>
                        Welcome <strong>{name}</strong>
                    </p>
                    <p>
                        Your token to use API<br></br>
                        <code className="break-all">{userToken}</code>
                    </p>

                    <PostForm token={userToken} isAdmin={isAdmin} name={name} />
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                    <div id="comment"></div>
                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium"
                        >
                            Your email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="name@flowbite.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium"
                        >
                            Your password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>
                </form>
            )}
        </main>
    );
}
