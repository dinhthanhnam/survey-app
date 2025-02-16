'use client';
import React, { useState, useEffect } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import { fetchSurveyCount, fetchSurveyByStep } from '@/utils/survey';
const Body = () => {
    const [step, setStep] = useState(0);
    const [surveyData, setSurveyData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [answers, setAnswers] = useState({});
    const [totalSurveys, setTotalSurveys] = useState(0);
    const [tooltip, setTooltip] = useState(null);

    // Gọi API để lấy số lượng khảo sát
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
                        <span className="text-teal-700 font-semibold">
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
                    <h2 className="text-2xl font-bold text-teal-700 mb-4 text-center sm:text-left">
                        {surveyData.survey_title}
                    </h2>
                    <p className="text-gray-600 mb-6">
                        {surveyData.survey_description}
                    </p>

                    {surveyData.question_survey.map((question, index) => (
                        <div
                            key={question.question_id}
                            className="border border-gray-300 rounded-lg shadow-md p-4 mb-6 bg-gray-50"
                        >
                            <div className="relative">
                                <label className="block text-gray-700 font-medium flex items-center">
                                    <span className="break-words">
                                        Câu {index + 1}.{' '}
                                        {question.question_text}
                                    </span>
                                    {question.question_note && (
                                        <div className="relative ml-2">
                                            <FaQuestionCircle
                                                className="text-teal-500 cursor-pointer"
                                                onMouseEnter={() =>
                                                    setTooltip(
                                                        question.question_id
                                                    )
                                                }
                                                onMouseLeave={() =>
                                                    setTooltip(null)
                                                }
                                            />
                                            {tooltip ===
                                                question.question_id && (
                                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 p-2 bg-gray-200 text-gray-800 rounded-md text-sm shadow-md w-60">
                                                    {question.question_note}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </label>
                            </div>

                            <div className="mt-3 space-y-2">
                                {question.question_type === 'text' ? (
                                    <input
                                        type="text"
                                        value={
                                            answers[question.question_id] || ''
                                        }
                                        onChange={(e) =>
                                            handleChange(
                                                question.question_id,
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        placeholder="Nhập câu trả lời của bạn..."
                                    />
                                ) : (
                                    question.question_options.map((option) => {
                                        const isCheckbox =
                                            question.question_type ===
                                            'checkbox';
                                        return (
                                            <div
                                                key={option.question_options_id}
                                                className="flex items-center space-x-3 bg-white p-2 rounded-md shadow-sm border border-gray-200"
                                            >
                                                <input
                                                    type={
                                                        isCheckbox
                                                            ? 'checkbox'
                                                            : 'radio'
                                                    }
                                                    id={`question-${question.question_id}-option-${option.question_options_id}`}
                                                    name={
                                                        isCheckbox
                                                            ? `question-${question.question_id}-${option.question_options_id}`
                                                            : `question-${question.question_id}`
                                                    }
                                                    value={option.option_value}
                                                    checked={
                                                        isCheckbox
                                                            ? (
                                                                  answers[
                                                                      question
                                                                          .question_id
                                                                  ] || []
                                                              ).includes(
                                                                  option.option_value
                                                              )
                                                            : answers[
                                                                  question
                                                                      .question_id
                                                              ] ===
                                                              option.option_value
                                                    }
                                                    onChange={() =>
                                                        handleChange(
                                                            question.question_id,
                                                            option.option_value,
                                                            isCheckbox
                                                        )
                                                    }
                                                    className="w-5 h-5 text-teal-600 focus:ring-teal-500"
                                                />
                                                <label
                                                    htmlFor={`question-${question.question_id}-option-${option.question_options_id}`}
                                                    className="text-gray-700 font-medium"
                                                >
                                                    {option.option_text}{' '}
                                                    {option.option_note && (
                                                        <i className="text-gray-400 text-sm">
                                                            (
                                                            {option.option_note}
                                                            )
                                                        </i>
                                                    )}
                                                </label>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    ))}

                    <div className="flex flex-wrap items-center justify-between mt-8 gap-4">
                        <div className="flex items-center space-x-2 w-full sm:w-auto">
                            <span className="text-teal-700 font-semibold">
                                Bước {step + 1} trên {totalSurveys + 1}
                            </span>
                            <div className="w-full sm:w-40 bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-teal-600 h-2.5 rounded-full"
                                    style={{
                                        width: `${
                                            ((step + 1) / (totalSurveys + 1)) *
                                            100
                                        }%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                        <div className="flex w-full sm:w-auto gap-4">
                            <button
                                type="button"
                                className="w-full sm:w-auto px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                                onClick={() => setStep((prev) => prev - 1)}
                            >
                                Quay lại
                            </button>

                            {step < totalSurveys ? (
                                <button
                                    type="button"
                                    className="w-full sm:w-auto px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                                    onClick={() => setStep((prev) => prev + 1)}
                                >
                                    Tiếp theo
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                                    onClick={() =>
                                        alert('Gửi khảo sát thành công!')
                                    }
                                >
                                    Gửi khảo sát
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            ) : (
                <p className="text-gray-500">Không tìm thấy khảo sát.</p>
            )}
        </div>
    );
};

export default Body;
