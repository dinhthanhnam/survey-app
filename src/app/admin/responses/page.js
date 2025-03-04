"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminResponsePage() {
    const [selectedRespondent, setSelectedRespondent] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [respondents, setRespondents] = useState([]);
    const [activeSurvey, setActiveSurvey] = useState(1);

    // Hàm lấy danh sách respondent từ API bằng axios
    const fetchRespondents = async (query) => {
        try {
            const response = await axios.get("/api/admin/respondents/search", {
                params: { query },
            });
            if (response.data.success) {
                setRespondents(response.data.data);
            } else {
                console.error(response.data.error);
            }
        } catch (error) {
            console.error("Error fetching respondents:", error);
        }
    };

    // Gọi API khi searchQuery thay đổi
    useEffect(() => {
        fetchRespondents(searchQuery);
    }, [searchQuery]);

    // 9 khảo sát cố định
    const surveys = Array.from({ length: 9 }, (_, i) => ({
        id: i + 1,
        title: `Khảo sát ${i + 1}`,
    }));

    return (
        <div className="flex h-full gap-4">
            <div className="md:w-1/4 w-full bg-gray-50 p-4 rounded-lg shadow-md h-full overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Danh sách người trả lời</h2>
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên hoặc email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ul className="space-y-2">
                    {respondents?.map((respondent) => (
                        <li
                            key={respondent.id}
                            onClick={() => setSelectedRespondent(respondent)}
                            className={`p-2 rounded-lg cursor-pointer hover:bg-blue-100 ${
                                selectedRespondent?.id === respondent.id ? "bg-blue-200" : ""
                            }`}
                        >
                            <p className="font-medium">{respondent.name}</p>
                            <p className="text-sm text-gray-600">{respondent.email}</p>
                            <p className="text-sm text-gray-600">{respondent.belong_to_group}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="md:w-3/4 w-full bg-white p-6 rounded-lg shadow-md h-full overflow-y-auto">
                {selectedRespondent ? (
                    <>
                        <h2 className="text-xl font-semibold mb-4">
                            Câu trả lời của: {selectedRespondent.name}
                        </h2>
                        <div className="flex space-x-2 mb-4 overflow-x-auto">
                            {surveys.map((survey) => (
                                <button
                                    key={survey.id}
                                    onClick={() => setActiveSurvey(survey.id)}
                                    className={`px-4 py-2 rounded-lg ${
                                        activeSurvey === survey.id
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                >
                                    {survey.title}
                                </button>
                            ))}
                        </div>
                        <div className="border p-4 rounded-lg">
                            <h3 className="text-lg font-medium mb-2">
                                {surveys[activeSurvey - 1].title}
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <p className="font-medium">Câu hỏi 1: [Question Text]</p>
                                    <p className="text-gray-700">Trả lời: [Answer]</p>
                                </li>
                            </ul>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-500 text-center">
                        Vui lòng chọn một người trả lời để xem chi tiết.
                    </p>
                )}
            </div>
        </div>
    );
}