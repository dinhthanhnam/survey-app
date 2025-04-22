"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function FundsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [funds, setFunds] = useState({ unresponsive: [], responsive: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalUnresponsive, setTotalUnresponsive] = useState(0);
    const [totalResponsive, setTotalResponsive] = useState(0);
    const [totalInstitutions, setTotalInstitutions] = useState(0);

    const fetchFunds = async (query) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("/api/admin/funds", {
                params: { query },
            });
            if (response.data.success) {
                setFunds(response.data.data);
                setTotalUnresponsive(response.data.totalUnresponsive);
                setTotalResponsive(response.data.totalResponsive);
                setTotalInstitutions(response.data.totalInstitutions);
            } else {
                setError(response.data.error || "Lỗi khi lấy dữ liệu quỹ");
            }
        } catch (error) {
            console.error("Error fetching funds:", error);
            setError("Không thể tải dữ liệu quỹ. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFunds(searchQuery);
    }, [searchQuery]);

    return (
        <div className="flex flex-col w-full h-full p-6">
            <section className="w-full bg-white p-6 rounded-xl shadow-md flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Danh sách quỹ</h2>
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên quỹ hoặc mã quỹ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                />
                <div className="flex-1 overflow-y-auto max-h-[calc(100vh-16rem)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {loading ? (
                        <p className="text-gray-500 text-center py-8">Đang tải dữ liệu...</p>
                    ) : error ? (
                        <p className="text-red-500 text-center py-8">{error}</p>
                    ) : (
                        <>
                            <p className="text-sm text-gray-600 mb-4">
                                Tìm thấy {totalUnresponsive} quỹ chưa trả lời / {totalResponsive} quỹ đã trả lời /{" "}
                                {totalInstitutions} quỹ tổng cộng
                            </p>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Cột quỹ chưa trả lời */}
                                <div className="border-r border-gray-200 pr-4">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                                        Quỹ chưa trả lời ({totalUnresponsive})
                                    </h3>
                                    {funds.unresponsive.length > 0 ? (
                                        <ul className="space-y-3">
                                            {funds.unresponsive.map((fund) => (
                                                <li
                                                    key={fund.id}
                                                    className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                                                >
                                                    <p className="font-semibold text-gray-800">{fund.name}</p>
                                                    <p className="text-sm text-gray-600">
                                                        Mã quỹ: {fund.identity_code}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Số người trả lời: {fund.respondentCount}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500 text-center py-4">
                                            {searchQuery
                                                ? `Không tìm thấy quỹ chưa trả lời nào phù hợp với "${searchQuery}".`
                                                : "Tất cả quỹ đều đã có người trả lời."}
                                        </p>
                                    )}
                                </div>

                                {/* Cột quỹ đã trả lời */}
                                <div className="pl-4">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                                        Quỹ đã trả lời ({totalResponsive})
                                    </h3>
                                    {funds.responsive.length > 0 ? (
                                        <ul className="space-y-3">
                                            {funds.responsive.map((fund) => (
                                                <li
                                                    key={fund.id}
                                                    className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                                                >
                                                    <p className="font-semibold text-gray-800">{fund.name}</p>
                                                    <p className="text-sm text-gray-600">
                                                        Mã quỹ: {fund.identity_code}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Số người trả lời: {fund.respondentCount}
                                                    </p>
                                                    {fund.respondents.length > 0 && (
                                                        <div className="mt-2">
                                                            <p className="text-sm font-medium text-gray-700">
                                                                Người trả lời:
                                                            </p>
                                                            <ul className="mt-1 space-y-1">
                                                                {fund.respondents.map((respondent) => (
                                                                    <li
                                                                        key={respondent.id}
                                                                        className="text-sm text-gray-600"
                                                                    >
                                                                        - {respondent.name} ({respondent.email}
                                                                        {respondent.phone !== "Không có"
                                                                            ? `, ${respondent.phone}`
                                                                            : ""})
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500 text-center py-4">
                                            {searchQuery
                                                ? `Không tìm thấy quỹ đã trả lời nào phù hợp với "${searchQuery}".`
                                                : "Chưa có quỹ nào được trả lời."}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}