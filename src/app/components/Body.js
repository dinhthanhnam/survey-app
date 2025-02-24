'use client';
import React, { useState, useEffect } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import {
    fetchSurveyCount,
    fetchSurveyByStep,
    fetchGroupQuestionIds,
    fetchUserAnswers,
    fetchReviewData,
    saveUserResponse,
} from '@/utils/survey';
import Navigation from './Navigation';
import RadioQuestion from './questions/RadioQuestion';
import CheckboxQuestion from './questions/CheckboxQuestion';
import GroupQuestion from './questions/GroupQuestion';
import { respondents_belong_to_group } from '@prisma/client';

const Body = ({ scrollToTop }) => {
    const [step, setStep] = useState(0);
    const [surveyData, setSurveyData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [answers, setAnswers] = useState({});
    const [totalSurveys, setTotalSurveys] = useState(0);
    const [groupQuestionIds, setGroupQuestionIds] = useState([]);
    const [validCodes, setValidCodes] = useState([]); // Danh sách mã hợp lệ
    const [isValid, setIsValid] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [reviewData, setReviewData] = useState(null);
    const respondentId = 1;

    const handleSubmitSurvey = () => {
        setShowReview(true); // Chuyển sang trang xem lại
    };
    useEffect(() => {
        const loadUserAnswers = async () => {
            const userAnswers = await fetchUserAnswers(respondentId);
            if (userAnswers) setAnswers(userAnswers);
        };
        if (step > 0) loadUserAnswers();
    }, [step]);
    useEffect(() => {
        // Gọi API để lấy danh sách Identity_code từ institutions
        fetch("/api/institutions")
            .then((res) => res.json())
            .then((data) => {
                setValidCodes(data.map((inst) => inst.identity_code));
            })
            .catch((error) => console.error("Error fetching institutions:", error));
    }, []);
    useEffect(() => {
        const loadReviewData = async () => {
            const data = await fetchReviewData(respondentId);
            if (data) {
                setReviewData(data);
                setAnswers(await fetchUserAnswers(respondentId));
            }
        };
        if (showReview) loadReviewData();
    }, [showReview]);

    useEffect(() => {
        const getGroupQuestionIds = async () => {
            const data = await fetchGroupQuestionIds();
            setGroupQuestionIds(data.questionGroup.map((q) => q.question_id));
        };

        getGroupQuestionIds();
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
    const handleChange = (questionId, value) => {
        setAnswers((prev) => ({ ...prev, [questionId]: value }));

        // Kiểm tra nếu giá trị nhập vào có trong danh sách mã hợp lệ
        if (questionId === 1) {
            setIsValid(validCodes.includes(value.trim().toUpperCase()));
        }
    };
    const handleNextStep = () => {
        setStep((prev) => prev + 1);
        scrollToTop(); // Cuộn lên đầu container
    };

    const handleRadioChange = async (questionId, optionId) => {
        setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
        await saveUserResponse(questionId, respondentId, optionId, false);
    };

    const handleCheckboxChange = async (questionId, optionId) => {
        setAnswers((prev) => {
            const currentValues = prev[questionId] || [];
            const newValues = currentValues.includes(optionId)
                ? currentValues.filter((v) => v !== optionId)
                : [...currentValues, optionId];
            return { ...prev, [questionId]: newValues };
        });
        await saveUserResponse(questionId, respondentId, optionId, true);
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
                        1. Mã Quỹ Tín Dụng
                    </label>
                    <input
                        type="text"
                        value={answers[1] || ""}
                        onChange={(e) => handleChange(1, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mt-2"
                        placeholder="Nhập mã quỹ tín dụng..."
                    />
                    {!isValid && answers[1] && (
                        <p className="text-red-500 mt-1">Mã không hợp lệ!</p>
                    )}
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
                {/* Video hướng dẫn thực hiện khảo sát */}
                <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center sm:text-left">
                    HƯỚNG DẪN THỰC HIỆN KHẢO SÁT
                </h2>
                <div className="border border-gray-300 rounded-lg shadow-md p-4 mb-6 bg-gray-50">
                    <div className="relative w-full aspect-video">
                        <iframe
                            src="https://drive.google.com/file/d/1zlcjzi6gEZHADHhNdjAWvjevMzWLmRhh/preview"
                            width="100%"
                            height="100%"
                            allow="autoplay"
                            allowFullScreen
                            className="rounded-lg shadow-md"
                        ></iframe>
                    </div>
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
                        disabled={!isValid || loading}
                        className={`px-6 py-2 rounded-lg transition duration-200 ease-in-out ${
                            isValid
                                ? "bg-teal-600 text-white hover:bg-teal-700"
                                : "bg-gray-400 text-gray-200 cursor-not-allowed"
                        }`}
                    >
                        Tiếp theo
                    </button>
                </div>
            </div>
        );
    }
    if (showReview && reviewData) {
        return (
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center">
                    Xem lại khảo sát
                </h2>

                {reviewData.surveys.map((survey, surveyIndex) => (
                    <div key={survey.id} className="mb-8">
                        <h3 className="text-xl font-semibold text-teal-700">
                            {survey.survey_title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                            {survey.survey_description}
                        </p>

                        {survey.question_survey.map((questionSurvey, index) => {
                            const question = questionSurvey.questions;
                            const childQuestions =
                                survey.question_survey.filter((q) =>
                                    q.questions.question_name.startsWith(
                                        question.question_name + '.'
                                    )
                                );
                            if (groupQuestionIds.includes(question.id))
                                return null;
                            return (
                                <div
                                    key={question.id}
                                    className="border border-gray-300 rounded-lg shadow-md p-4 mb-4 bg-gray-50"
                                >
                                    <label className="block text-gray-700 font-medium">
                                        Câu {index + 1}:{' '}
                                        {question.question_text}
                                    </label>

                                    <div className="mt-3">
                                        {question.question_type ===
                                            'radiogroup' && (
                                            <RadioQuestion
                                                question={question}
                                                answers={answers}
                                                handleChange={handleRadioChange}
                                                groupQuestionIds={
                                                    groupQuestionIds
                                                }
                                                isReviewMode={true}
                                            />
                                        )}
                                        {question.question_type ===
                                            'checkbox' && (
                                            <CheckboxQuestion
                                                question={question}
                                                answers={answers}
                                                handleChange={
                                                    handleCheckboxChange
                                                }
                                                isReviewMode={true}
                                            />
                                        )}
                                        {question.question_type === 'group' && (
                                            <GroupQuestion
                                                key={question.id}
                                                groupQuestion={questionSurvey}
                                                childQuestions={childQuestions}
                                                answers={answers}
                                                handleRadioChange={
                                                    handleRadioChange
                                                }
                                                isReviewMode={true}
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}

                <div className="flex justify-between mt-8">
                    <button
                        className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        onClick={() => setShowReview(false)}
                    >
                        Quay lại
                    </button>
                    <button
                        className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                        onClick={async () => {
                            await fetch('/api/survey/submit', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    respondent_id: 1,
                                    answers,
                                }),
                            });
                            alert('Khảo sát đã được gửi!');
                        }}
                    >
                        Xác nhận gửi khảo sát
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
                        const childQuestions =
                            surveyData.question_survey.filter((q) =>
                                q.questions.question_name.startsWith(
                                    question.question_name + '.'
                                )
                            );
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
                                    {question.question_type ===
                                        'radiogroup' && (
                                        <RadioQuestion
                                            question={question}
                                            answers={answers}
                                            handleChange={handleRadioChange}
                                            groupQuestionIds={groupQuestionIds}
                                            isReviewMode={false}
                                        />
                                    )}
                                    {question.question_type === 'checkbox' && (
                                        <CheckboxQuestion
                                            question={question}
                                            answers={answers}
                                            handleChange={handleCheckboxChange}
                                            isReviewMode={false}
                                        />
                                    )}
                                    {question.question_type === 'group' && (
                                        <GroupQuestion
                                            key={question.id}
                                            groupQuestion={questionSurvey}
                                            childQuestions={childQuestions}
                                            answers={answers}
                                            handleRadioChange={
                                                handleRadioChange
                                            }
                                            isReviewMode={false}
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
                        handleSubmitSurvey={handleSubmitSurvey}
                    />
                </form>
            ) : (
                <p className="text-gray-500">Không tìm thấy khảo sát.</p>
            )}
        </div>
    );
};

export default Body;
