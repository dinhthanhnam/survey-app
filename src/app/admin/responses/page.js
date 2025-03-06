"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { fetchSurveyByStep, fetchUserAnswers, fetchReviewData } from "@/utils/survey";

export default function AdminResponsePage() {
    const [selectedRespondent, setSelectedRespondent] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [respondents, setRespondents] = useState([]);
    const [activeSurvey, setActiveSurvey] = useState(1);
    const [surveyData, setSurveyData] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [userReasons, setUserReasons] = useState({});
    const [loading, setLoading] = useState(false);

    // Hàm lấy danh sách respondent từ API
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

    // Hàm lấy dữ liệu khảo sát và câu trả lời của người dùng
    const fetchSurveyAndAnswers = async (surveyId, respondentId, belongToGroup) => {
        if (!surveyId || !respondentId) return;
        setLoading(true);
        setSurveyData(null);
        setUserAnswers({});
        setUserReasons({});
        try {
            localStorage.setItem("respondent", JSON.stringify({ 
                id: respondentId,
                belong_to_group: belongToGroup
            }));
            
            const survey = await fetchSurveyByStep(surveyId);
            if (survey) {
                setSurveyData(survey);
            } else {
                console.error(`No survey data found for surveyId: ${surveyId}`);
            }

            const { answers, textInputs } = await fetchUserAnswers(respondentId);
            setUserAnswers(answers || {});
            setUserReasons(textInputs || {});
        } catch (error) {
            console.error("Error fetching survey or answers:", error);
            setSurveyData(null);
            setUserAnswers({});
            setUserReasons({});
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRespondents(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        if (selectedRespondent && activeSurvey) {
            fetchSurveyAndAnswers(activeSurvey, selectedRespondent.id, selectedRespondent.belong_to_group);
        }
    }, [selectedRespondent, activeSurvey]);

    const surveys = Array.from({ length: 9 }, (_, i) => ({
        id: i + 1,
        title: `Khảo sát ${i + 1}`,
    }));

    const renderAnswer = (question, options) => {
        const answers = userAnswers[question.id];
        const reasons = userReasons;

        if (question.question_type === "radiogroup") {
            const selectedOption = options.find((opt) => opt.id === answers);
            return selectedOption ? (
                <p className="text-gray-700">
                    <span className="font-medium">{selectedOption.option_text}</span>
                    {selectedOption.option_note && (
                        <span className="text-gray-500 italic text-sm ml-2">
                            ({selectedOption.option_note})
                        </span>
                    )}
                </p>
            ) : (
                <p className="text-gray-400 italic">Chưa trả lời</p>
            );
        } else if (question.question_type === "checkbox") {
            const answerArray = Array.isArray(answers) ? answers : [];
            const selectedOptions = options.filter((opt) => answerArray.includes(opt.id));
            if (selectedOptions.length > 0) {
                return (
                    <ul className="list-disc ml-4 space-y-1">
                        {selectedOptions.map((opt) => (
                            <li key={opt.id} className="text-gray-700">
                                <span className="font-medium">{opt.option_text}</span>
                                {opt.option_note && (
                                    <span className="text-gray-500 italic text-sm ml-2">
                                        ({opt.option_note})
                                    </span>
                                )}
                                {reasons[`${question.id}-${opt.id}`] && (
                                    <p className="text-gray-600 text-sm mt-1">
                                        Lý do: {reasons[`${question.id}-${opt.id}`]}
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                );
            } else {
                return <p className="text-gray-400 italic">Chưa trả lời</p>;
            }
        } else if (question.question_type === "group") {
            const childQuestions = surveyData?.question_survey.filter((qs) =>
                qs.questions.question_name.startsWith(question.question_name + ".")
            );
            return (
                <ul className="ml-4 space-y-4">
                    {childQuestions?.map((childQs, childIndex) => (
                        <li key={childQs.questions.id}>
                            <p className="font-medium text-gray-800">
                                {childIndex + 1}. {childQs.questions.question_text}
                            </p>
                            <div className="ml-4 mt-1">
                                {renderAnswer(childQs.questions, childQs.questions.question_options)}
                            </div>
                        </li>
                    ))}
                </ul>
            );
        }
        return <p className="text-gray-400 italic">Loại câu hỏi không xác định</p>;
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 h-full pb-8">
            {/* Sidebar chứa danh sách người trả lời */}
            <aside className="md:w-1/3 w-full bg-white p-6 rounded-xl shadow-md flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Danh sách người trả lời</h2>
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên hoặc email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                />
                <div className="flex-1 overflow-y-auto max-h-[calc(100vh-16rem)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <ul className="space-y-3">
                        {respondents?.map((respondent) => (
                            <li
                                key={respondent.id}
                                onClick={() => setSelectedRespondent(respondent)}
                                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                                    selectedRespondent?.id === respondent.id
                                        ? "bg-teal-100 border-teal-500 border"
                                        : "bg-gray-50 hover:bg-gray-100"
                                }`}
                            >
                                <p className="font-semibold text-gray-800">{respondent.name}</p>
                                <p className="text-sm text-gray-600">{respondent.email}</p>
                                <p className="text-sm text-gray-500">{respondent.belong_to_group}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            {/* Phần hiển thị câu hỏi và câu trả lời */}
            <section className="md:w-2/3 w-full bg-white p-6 rounded-xl shadow-md flex flex-col">
                {selectedRespondent ? (
                    <>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Câu trả lời của: {selectedRespondent.name}
                        </h2>
                        <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto">
                            {surveys.map((survey) => (
                                <button
                                    key={survey.id}
                                    onClick={() => setActiveSurvey(survey.id)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        activeSurvey === survey.id
                                            ? "bg-teal-600 text-white"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                >
                                    {survey.title}
                                </button>
                            ))}
                        </div>
                        {/* Phần chứa câu trả lời với chiều cao cố định */}
                        <div className="h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                            {loading ? (
                                <p className="text-gray-500 text-center py-8">Đang tải dữ liệu...</p>
                            ) : surveyData ? (
                                <>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 sticky top-0 bg-white z-10 py-2">
                                        {surveyData.survey_title}
                                    </h3>
                                    <ul className="space-y-6">
                                        {surveyData.question_survey
                                            .filter((qs) => {
                                                return !surveyData.question_survey.some(
                                                    (parentQs) =>
                                                        parentQs.questions.question_type === "group" &&
                                                        qs.questions.question_name.startsWith(
                                                            parentQs.questions.question_name + "."
                                                        )
                                                );
                                            })
                                            .map((qs, index) => {
                                                const question = qs.questions;
                                                return (
                                                    <li key={question.id} className="pb-6 border-b last:border-b-0">
                                                        <p className="font-semibold text-lg text-gray-800">
                                                            Câu {index + 1}: {question.question_text}
                                                        </p>
                                                        <div className="mt-2 ml-4">
                                                            <p className="text-sm font-medium text-gray-600">
                                                                Tùy chọn:
                                                            </p>
                                                            <ul className="list-disc ml-4 text-gray-700">
                                                                {question.question_options.map((option) => (
                                                                    <li key={option.id}>{option.option_text}</li>
                                                                ))}
                                                            </ul>
                                                            <p className="text-sm font-medium text-gray-600 mt-2">
                                                                Câu trả lời:
                                                            </p>
                                                            <div className="ml-4 mt-1">
                                                                {renderAnswer(question, question.question_options)}
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                </>
                            ) : (
                                <p className="text-gray-500 text-center py-8">
                                    Không có dữ liệu khảo sát cho {`Khảo sát ${activeSurvey}`}.
                                </p>
                            )}
                        </div>
                    </>
                ) : (
                    <p className="text-gray-500 text-center flex-1 flex items-center justify-center">
                        Vui lòng chọn một người trả lời để xem chi tiết.
                    </p>
                )}
            </section>
        </div>
    );
}