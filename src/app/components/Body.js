'use client';
import React, { useState, useEffect } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import { fetchSurveyCount, fetchSurveyByStep } from '@/utils/survey';
import Navigation from './Navigation';
import TextQuestion from './questions/TextQuestion';
import RadioQuestion from './questions/RadioQuestion';
import CheckboxQuestion from './questions/CheckboxQuestion';

const Body = ({ scrollToTop }) => {
    const [step, setStep] = useState(0);
    const [surveyData, setSurveyData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [answers, setAnswers] = useState({});
    const [totalSurveys, setTotalSurveys] = useState(0);
    const [tooltip, setTooltip] = useState(null);

    const [groupQuestionIds, setGroupQuestionIds] = useState([]);

    useEffect(() => {
        const fetchGroupQuestionIds = async () => {
            try {
                const response = await fetch('/api/survey/group-questions');
                const data = await response.json();
                setGroupQuestionIds(
                    data.questionGroup.map((q) => q.question_id)
                );
            } catch (error) {
                console.error('Lỗi khi lấy danh sách câu hỏi nhóm:', error);
            }
        };

        fetchGroupQuestionIds();
    }, []);

    useEffect(() => {
        const getSurveyCount = async () => {
            const total = await fetchSurveyCount();
            setTotalSurveys(total);
        };

        getSurveyCount();
    }, []);

    useEffect(() => {
        const getSurvey = async () => {
            if (step === 0 || step > totalSurveys) return;
            setLoading(true);
            try {
                const data = await fetchSurveyByStep(step);
                setSurveyData(data);
            } catch (error) {
                alert(error.message);
            } finally {
                setLoading(false);
            }
        };
        if (step > 0) getSurvey();
    }, [step]);

    const handleNextStep = () => {
        setStep((prev) => prev + 1);
        scrollToTop(); // Cuộn lên đầu container
    };

    const handleChange = (questionId, value, isCheckbox) => {
        setAnswers((prev) => {
            if (isCheckbox) {
                const currentValues = prev[questionId] || [];
                return {
                    ...prev,
                    [questionId]: currentValues.includes(value)
                        ? currentValues.filter((v) => v !== value)
                        : [...currentValues, value],
                };
            } else {
                return {
                    ...prev,
                    [questionId]: value,
                };
            }
        });
    };

    if (step === 0) {
        return (
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center sm:text-left">
                    THÔNG TIN QUỸ TÍN DỤNG
                </h2>

                {/* Tên Quỹ Tín Dụng */}
                <div className="border border-gray-300 rounded-lg shadow-md p-4 mb-6 bg-gray-50">
                    <label className="block text-gray-700 font-semibold text-lg">
                        1. Tên Quỹ Tín Dụng
                    </label>
                    <input
                        type="text"
                        value={answers[1] || ''}
                        onChange={(e) => handleChange(1, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mt-2"
                        placeholder="Nhập câu trả lời của bạn..."
                    />
                </div>

                {/* Email */}
                <div className="border border-gray-300 rounded-lg shadow-md p-4 mb-6 bg-gray-50">
                    <label className="block text-gray-700 font-semibold text-lg">
                        2. Email
                    </label>
                    <input
                        type="text"
                        value={answers[2] || ''}
                        onChange={(e) => handleChange(2, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mt-2"
                        placeholder="Nhập câu trả lời của bạn..."
                    />
                </div>

                {/* Thanh tiến trình và nút bấm */}
                <div className="flex flex-wrap items-center justify-between mt-8 gap-4">
                    <div className="flex items-center space-x-2 w-full sm:w-auto">
                        <span className="text-teal-600 font-semibold">
                            Bước {step + 1} trên {totalSurveys + 1}
                        </span>
                        <div className="w-full sm:w-40 bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-teal-600 h-2.5 rounded-full"
                                style={{
                                    width: `${
                                        ((step + 1) / (totalSurveys + 1)) * 100
                                    }%`,
                                }}
                            ></div>
                        </div>
                    </div>
                    <button
                        onClick={() => setStep(1)}
                        disabled={loading || totalSurveys === 0}
                        className="mt-6 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-200 ease-in-out"
                    >
                        Tiếp theo
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
            {surveyData ? (
                <form onSubmit={(e) => e.preventDefault()}>
                    <h2 className="text-lg sm:text-2xl font-bold text-teal-700 mb-4 text-center sm:text-left">
                        {surveyData.survey_title}
                    </h2>
                    <p className="text-gray-600 mb-6 text-justify">
                        {surveyData.survey_description}
                    </p>

                    {surveyData.question_survey.map((questionSurvey, index) => {
                        const question = questionSurvey.questions;
                        if (groupQuestionIds.includes(question.id)) return null;
                        return (
                            <div
                                key={question.id}
                                className="border border-gray-300 rounded-lg shadow-md p-4 mb-6 bg-gray-50"
                            >
                                <label className="block text-gray-700 font-medium">
                                    Câu {index + 1}. {question.question_text}
                                </label>

                                <div className="mt-3">
                                    {question.question_type === 'text' && (
                                        <TextQuestion
                                            question={question}
                                            answers={answers}
                                            handleChange={handleChange}
                                        />
                                    )}
                                    {question.question_type ===
                                        'radiogroup' && (
                                        <RadioQuestion
                                            question={question}
                                            answers={answers}
                                            handleChange={handleChange}
                                            groupQuestionIds={groupQuestionIds}
                                        />
                                    )}
                                    {question.question_type === 'checkbox' && (
                                        <CheckboxQuestion
                                            question={question}
                                            answers={answers}
                                            handleChange={handleChange}
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    <Navigation
                        step={step}
                        totalSurveys={totalSurveys}
                        setStep={setStep}
                        handleNextStep={handleNextStep}
                    />
                </form>
            ) : (
                <p className="text-gray-500">Không tìm thấy khảo sát.</p>
            )}
        </div>
    );
};

export default Body;
