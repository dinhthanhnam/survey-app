"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminAuthPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleLogin(e) {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("/api/admin-login", { email, password });
            router.push("/admin");
        } catch (err) {
            setError("Sai thông tin đăng nhập!");
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4">Xác thực Admin</h2>
                {error && <p className="text-red-500">{error}</p>}
                <input
                    type="email"
                    placeholder="Admin Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 w-full mb-2"
                    required
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full mb-2"
                    required
                />
                <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded">
                    Đăng nhập
                </button>
            </form>
        </div>
    );
}
