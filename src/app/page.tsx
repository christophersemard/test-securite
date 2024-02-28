import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className=" min-h-screen p-24">
            <h1 className="font-bold">Welcome to the app</h1>
            <p className="mb-4">Please login or register to continue</p>
            <div className="flex gap-4">
                <Link href="/login" className="btn btn-red">
                    {" "}
                    Login{" "}
                </Link>
                <Link href="/register" className="btn btn-white">
                    {" "}
                    Register{" "}
                </Link>
            </div>
        </main>
    );
}
