"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function SurveyStatsPage() {
    const [surveys, setSurveys] = useState([]);
    const [selectedSurveyId, setSelectedSurveyId] = useState(null);
    const [surveyStats, setSurveyStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSurveyList = async () => {
        try {
            const response = await axios.get("/api/survey");
            console.log("Survey list response:", response.data);
            const surveyList = Array.isArray(response.data) ? response.data : [];
            setSurveys(surveyList);
            setSelectedSurveyId(surveyList[0]?.id || null);
        } catch (err) {
            console.error("Lỗi khi lấy danh sách khảo sát:", err.response?.data || err.message);
            setError(err.response?.data?.error || "Không thể tải danh sách khảo sát.");
        }
    };

    const fetchSurveyStats = async (surveyId) => {
        if (!surveyId) return;
        setLoading(true);
        setError(null);
        setSurveyStats(null);

        try {
            const response = await axios.get(`/api/admin/survey-stats/${surveyId}`);
            console.log("Survey stats response:", response.data);
            if (!response.data.survey_id) {
                throw new Error("Dữ liệu khảo sát không hợp lệ");
            }
            setSurveyStats(response.data);
        } catch (err) {
            console.error("Lỗi khi lấy dữ liệu thống kê:", {
                message: err.message,
                status: err.response?.status,
                data: err.response?.data
            });
            const errorMessage = err.response?.data?.error || err.message || "Lỗi không xác định từ server";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSurveyList();
    }, []);

    useEffect(() => {
        if (selectedSurveyId) {
            fetchSurveyStats(selectedSurveyId);
        }
    }, [selectedSurveyId]);

    const renderQuestionStats = (question) => {
        return (
            <div className="mt-3">
                <p className="text-sm font-medium text-gray-600 mb-1">
                    Thống kê đáp án (Tổng: {question.total_responses} lượt trả lời):
                </p>
                <ul className="space-y-2">
                    {question.options.map((option) => (
                        <li key={option.option_id} className="flex items-center">
                            <span className="w-32 text-gray-700">{option.option_text}:</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                                <div
                                    className="bg-teal-500 h-full"
                                    style={{ width: `${option.response_percentage}%` }}
                                ></div>
                            </div>
                            <span className="ml-3 text-gray-700">
                                {option.response_count} ({option.response_percentage}%)
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Thống kê khảo sát</h1>

                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                        Chọn khảo sát:
                    </label>
                    <select
                        value={selectedSurveyId || ""}
                        onChange={(e) => setSelectedSurveyId(parseInt(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        <option value="">-- Chọn khảo sát --</option>
                        {surveys.map((survey) => (
                            <option key={survey.id} value={survey.id}>
                                {survey.survey_title}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-6">
                    {loading ? (
                        <p className="text-center text-gray-500 py-4">Đang tải dữ liệu...</p>
                    ) : error ? (
                        <p className="text-center text-red-500 py-4">Lỗi: {error}</p>
                    ) : surveyStats ? (
                        <>
                            <h2 className="text-xl font-semibold text-gray-800">
                                {surveys.find(s => s.id === surveyStats.survey_id)?.survey_title || "Không xác định"}
                            </h2>
                            {surveyStats.questions.length > 0 ? (
                                <ul className="space-y-8">
                                    {surveyStats.questions.map((question, index) => (
                                        <li
                                            key={question.question_id}
                                            className="border-b pb-6 last:border-b-0"
                                        >
                                            <p className="text-lg font-semibold text-gray-800">
                                                Câu {index + 1}: {question.question_text}
                                            </p>
                                            {renderQuestionStats(question)}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center text-gray-500 py-4">
                                    Survey này chưa có câu hỏi nào.
                                </p>
                            )}
                        </>
                    ) : (
                        <p className="text-center text-gray-500 py-4">
                            Vui lòng chọn một khảo sát để xem thống kê.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}