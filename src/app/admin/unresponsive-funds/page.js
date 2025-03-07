"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function UnresponsiveFundsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [unresponsiveFunds, setUnresponsiveFunds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [totalInstitutions, setTotalInstitutions] = useState(0);

    const fetchUnresponsiveFunds = async (query) => {
        setLoading(true);
        try {
            const response = await axios.get("/api/admin/unresponsive-funds", {
                params: { query },
            });
            if (response.data.success) {
                setUnresponsiveFunds(response.data.data);
                setTotal(response.data.total);
                setTotalInstitutions(response.data.totalInstitutions);
            } else {
                console.error(response.data.error);
            }
        } catch (error) {
            console.error("Error fetching unresponsive funds:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUnresponsiveFunds(searchQuery);
    }, [searchQuery]);

    return (
        <div className="flex flex-col w-full h-full p-6">
            <section className="w-full bg-white p-6 rounded-xl shadow-md flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Danh sách quỹ chưa trả lời</h2>
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên quỹ hoặc mã định danh..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                />
                <div className="flex-1 overflow-y-auto max-h-[calc(100vh-16rem)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {loading ? (
                        <p className="text-gray-500 text-center py-8">Đang tải dữ liệu...</p>
                    ) : unresponsiveFunds.length > 0 ? (
                        <>
                            <p className="text-sm text-gray-600 mb-2">
                                Tìm thấy {total} quỹ chưa trả lời / {totalInstitutions} quỹ tổng cộng
                            </p>
                            <ul className="space-y-3">
                                {unresponsiveFunds.map((fund) => (
                                    <li
                                        key={fund.id}
                                        className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                                    >
                                        <p className="font-semibold text-gray-800">{fund.name}</p>
                                        <p className="text-sm text-gray-600">Mã định danh: {fund.identity_code}</p>
                                        <p className="text-sm text-gray-500">
                                            Số người trả lời: {fund.respondentCount}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p className="text-gray-500 text-center py-8">
                            {searchQuery
                                ? `Không tìm thấy quỹ nào phù hợp với "${searchQuery}" trong số quỹ chưa trả lời.`
                                : "Tất cả quỹ đều đã có người trả lời."}
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
}