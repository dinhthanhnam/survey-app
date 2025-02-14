'use client';
import React, { useState } from 'react';

const Body = () => {
    const [step, setStep] = useState(0);
    const [surveyData, setSurveyData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [answers, setAnswers] = useState({});

    const handleChange = (questionId, value, isCheckbox) => {
        setAnswers((prev) => {
            if (isCheckbox) {
                // Nếu là checkbox, giữ lại các giá trị đã chọn
                const currentValues = prev[questionId] || [];
                return {
                    ...prev,
                    [questionId]: currentValues.includes(value)
                        ? currentValues.filter((v) => v !== value) // Bỏ chọn nếu đã có
                        : [...currentValues, value], // Thêm nếu chưa có
                };
            } else {
                // Nếu là radio hoặc text, chỉ lưu một giá trị duy nhất
                return {
                    ...prev,
                    [questionId]: value,
                };
            }
        });
    };

    const fetchSurvey = async () => {
        const id = answers[1]; // Lấy ID từ câu trả lời
        if (!id) return alert('Vui lòng nhập Tên Quỹ Tín Dụng!');

        setLoading(true);
        try {
            const response = await fetch(`/api/survey/${id}`);
            if (!response.ok) throw new Error('Khảo sát không tồn tại!');

            const data = await response.json();
            setSurveyData(data);
            setStep(1);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (step === 0) {
        return (
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-xl font-semibold text-teal-700">
                    THÔNG TIN QUỸ TÍN DỤNG
                </h2>

                <div className="mt-2 space-y-2">
                    <label className="block text-gray-700 font-medium">
                        1. Tên Quỹ Tín Dụng
                    </label>
                    <input
                        type="text"
                        value={answers[1] || ''}
                        onChange={(e) => handleChange(1, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Nhập 1, 2, 3, ... 8"
                    />
                </div>

                <div className="mt-2 space-y-2">
                    <label className="block text-gray-700 font-medium">
                        2. Email
                    </label>
                    <input
                        type="text"
                        value={answers[2] || ''}
                        onChange={(e) => handleChange(2, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Nhập câu trả lời của bạn..."
                    />
                </div>
                <div className="flex flex-wrap items-center justify-between mt-8 gap-4">
                    <div className="flex items-center space-x-2 w-full sm:w-auto">
                        <span className="text-teal-700 font-medium">
                            Bước {step + 1} trên 2
                        </span>
                        <div className="w-full sm:w-40 bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-teal-600 h-2.5 rounded-full"
                                style={{
                                    width: `${(step + 1 / 2) * 100}%`,
                                }}
                            ></div>
                        </div>
                    </div>
                    <button
                        onClick={fetchSurvey}
                        disabled={loading}
                        className="mt-6 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                    >
                        {loading ? 'Đang tải...' : 'Tiếp theo'}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
            {surveyData ? (
                <form onSubmit={(e) => e.preventDefault()}>
                    <h2 className="text-xl font-semibold text-teal-700">
                        {surveyData.survey_title}
                    </h2>
                    <p className="text-gray-600">
                        {surveyData.survey_description}
                    </p>

                    {surveyData.question_survey.map((question) => (
                        <div key={question.question_id} className="mt-6">
                            <label className="block text-gray-700 font-medium">
                                {question.question_name}.{' '}
                                {question.question_text}
                            </label>

                            <div className="mt-2 space-y-2">
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
                                    // Nếu là radio hoặc checkbox
                                    question.question_options.map((option) => {
                                        const isCheckbox =
                                            question.question_type ===
                                            'checkbox';
                                        return (
                                            <div
                                                key={option.question_options_id}
                                                className="flex items-center space-x-2"
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
                                                    className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                                                />
                                                <label
                                                    htmlFor={`question-${question.question_id}-option-${option.question_options_id}`}
                                                    className="text-gray-700"
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
                            <span className="text-teal-700 font-medium">
                                Bước {step + 1} trên 2
                            </span>
                            <div className="w-full sm:w-40 bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-teal-600 h-2.5 rounded-full"
                                    style={{
                                        width: `${(step + 1 / 2) * 100}%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                        <div className="flex w-full sm:w-auto gap-4">
                            <button
                                type="button"
                                className="w-full sm:w-auto px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                                onClick={() => setStep(0)}
                            >
                                Quay lại
                            </button>
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                            >
                                Gửi khảo sát
                            </button>
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
