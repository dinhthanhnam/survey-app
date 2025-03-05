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
                    - Đã chọn: <span className="font-medium">{selectedOption.option_text}</span>
                    {selectedOption.option_note && (
                        <span className="text-gray-500 italic text-sm ml-2">
                            ({selectedOption.option_note})
                        </span>
                    )}
                </p>
            ) : (
                <p className="text-gray-500">Chưa trả lời</p>
            );
        } else if (question.question_type === "checkbox") {
            const answerArray = Array.isArray(answers) ? answers : [];
            const selectedOptions = options.filter((opt) => answerArray.includes(opt.id));
            if (selectedOptions.length > 0) {
                return (
                    <div>
                        {selectedOptions.map((opt) => (
                            <div key={opt.id} className="text-gray-700 mb-2">
                                - Đã chọn: <span className="font-medium">{opt.option_text}</span>
                                {opt.option_note && (
                                    <span className="text-gray-500 italic text-sm ml-2">
                                        ({opt.option_note})
                                    </span>
                                )}
                                {reasons[`${question.id}-${opt.id}`] && (
                                    <p className="ml-4 text-gray-600">
                                        Lý do: {reasons[`${question.id}-${opt.id}`]}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                );
            } else {
                return <p className="text-gray-500">Chưa trả lời</p>;
            }
        } else if (question.question_type === "group") {
            const childQuestions = surveyData?.question_survey.filter((qs) =>
                qs.questions.question_name.startsWith(question.question_name + ".")
            );
            return (
                <div>
                    <p className="text-gray-500 font-semibold">Nhóm câu hỏi:</p>
                    <ul className="ml-4 space-y-2">
                        {childQuestions?.map((childQs, childIndex) => (
                            <li key={childQs.questions.id}>
                                <p className="font-medium">
                                    Câu hỏi {childIndex + 1}: {childQs.questions.question_text}
                                </p>
                                <div className="ml-4">
                                    {renderAnswer(childQs.questions, childQs.questions.question_options)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        return <p className="text-gray-500">Không xác định loại câu hỏi</p>;
    };

    return (
        <div className="flex h-screen gap-4">
            {/* Sidebar chứa danh sách người trả lời */}
            <div className="md:w-1/4 w-full bg-gray-50 p-4 rounded-lg shadow-md h-full">
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

            {/* Phần hiển thị câu hỏi và câu trả lời */}
            <div className="md:w-3/4 w-full bg-white p-6 rounded-lg shadow-md overflow-y-auto">
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
                            {loading ? (
                                <p className="text-gray-500">Đang tải dữ liệu...</p>
                            ) : surveyData ? (
                                <>
                                    <h3 className="text-lg font-medium mb-2">{surveyData.survey_title}</h3>
                                    <ul className="space-y-4">
                                        {surveyData.question_survey.map((qs, index) => {
                                            const question = qs.questions;
                                            return (
                                                <li
                                                    key={question.id}
                                                    className="border-b pb-4 last:border-b-0"
                                                >
                                                    <p className="font-medium text-lg">
                                                        Câu hỏi {index + 1}: {question.question_text}
                                                    </p>
                                                    <div className="ml-4 mt-2">
                                                        <p className="font-semibold">Tùy chọn:</p>
                                                        <ul className="ml-4 space-y-1">
                                                            {question.question_options.map((option) => (
                                                                <li
                                                                    key={option.id}
                                                                    className="text-gray-700"
                                                                >
                                                                    - {option.option_text}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        <p className="font-semibold mt-2">
                                                            Câu trả lời:
                                                        </p>
                                                        <div className="ml-4">
                                                            {renderAnswer(
                                                                question,
                                                                question.question_options
                                                            )}
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </>
                            ) : (
                                <p className="text-gray-500">Không có dữ liệu khảo sát cho {`Khảo sát ${activeSurvey}`}.</p>
                            )}
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