'use client';
import React, { useState, useEffect } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
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
import { useRouter } from 'next/navigation';

const Body = ({ scrollToTop }) => {
    let questionCounter = 0;
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [surveyData, setSurveyData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [answers, setAnswers] = useState({});
    const [totalSurveys, setTotalSurveys] = useState(0);
    const [groupQuestionIds, setGroupQuestionIds] = useState([]);
    // const [validCodes, setValidCodes] = useState([]); // Danh sách mã hợp lệ
    // const [isValid, setIsValid] = useState(false);
    const [tooltipId, setTooltipId] = useState(null);
    const [showReview, setShowReview] = useState(false);
    const [reviewData, setReviewData] = useState(null);
    const [answeredCount, setAnsweredCount] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [showTextBox, setShowTextBox] = useState({});
    const [textInputs, setTextInputs] = useState({});
    const [surveyCounts, setSurveyCounts] = useState([]);

    useEffect(() => {
        if (surveyData) {
            let total = 0;
            surveyCounts.forEach((survey) => {
                total += survey.total;
            });

            const answered = Object.keys(answers).length;
            setTotalQuestions(total);
            setAnsweredCount(answered);
        }
    }, [surveyData, answers]);

    const [respondentId, setRespondentId] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const respondentData = localStorage.getItem('respondent');
        if (respondentData) {
            const respondent = JSON.parse(respondentData);
            setRespondentId(respondent.id);
            setRole(respondent.belong_to_group);
        }
    }, []);

    const handleReviewSurvey = async () => {
        setShowReview(true); // Chuyển sang trang xem lại
        try {
            const response = await axios.get('/api/survey/response/count', {
                params: { respondent_id: respondentId, belong_to_group: role },
            });
            setSurveyCounts(response.data);
        } catch (error) {
            console.error('Error fetching survey counts:', error);
        }
    };
    const handleSubmitSurvey = async () => {
        try {
            const response = await axios.post('/api/survey/submit', {
                respondent_id: respondentId,
            });

            router.push('/thank-you');
        } catch (error) {
            console.error('Lỗi khi gửi khảo sát:', error);
            alert('Đã xảy ra lỗi, vui lòng thử lại!');
        }
    };

    useEffect(() => {
        const loadUserAnswers = async () => {
            const userAnswers = await fetchUserAnswers(respondentId);
            if (userAnswers) setAnswers(userAnswers);
        };
        if (step > 0) loadUserAnswers();
    }, [step]);
    // useEffect(() => {
    //     // Gọi API để lấy danh sách Identity_code từ institutions
    //     fetch("/api/institutions")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setValidCodes(data.map((inst) => inst.identity_code));
    //         })
    //         .catch((error) => console.error("Error fetching institutions:", error));
    // }, []);
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
    };
    const handleNextStep = () => {
        setStep((prev) => prev + 1);
        scrollToTop(); // Cuộn lên đầu container
    };

    const handleRadioChange = async (questionId, optionId) => {
        setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
        await saveUserResponse(questionId, respondentId, optionId, false);
    };

    const handleCheckboxChange = async (
        questionId,
        optionId,
        requireReason
    ) => {
        setAnswers((prev) => {
            const currentValues = Array.isArray(prev[questionId])
                ? prev[questionId]
                : [];
            const newValues = currentValues.includes(optionId)
                ? currentValues.filter((v) => v !== optionId) // Bỏ chọn
                : [...currentValues, optionId]; // Chọn mới

            setShowTextBox((prev) => ({
                ...prev,
                [`${questionId}-${optionId}`]: requireReason
                    ? newValues.includes(optionId)
                    : false,
            }));

            //Fix this
            const isPreviouslyChecked = currentValues.includes(optionId);

            setTextInputs((prev) => ({
                ...prev,
                [`${questionId}-${optionId}`]: isPreviouslyChecked
                    ? 0
                    : prev[`${questionId}-${optionId}`] || 0,
            }));
            return { ...prev, [questionId]: newValues };
            //
        });

        await saveUserResponse(questionId, respondentId, optionId, true, null); //Khác tham số null
    };

    if (step === 0) {
        return (
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
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
                        disabled={loading}
                        className={`px-6 py-2 flex items-center gap-2 rounded-lg transition duration-200 ease-in-out
                            bg-teal-600 text-white hover:bg-teal-700`}
                    >
                        Tiếp theo
                        <FaArrowRight size={18} />
                    </button>
                </div>
            </div>
        );
    }
    if (showReview && reviewData) {
        return (
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-bold text-teal-900 mb-6 text-center">
                    Xác nhận trước khi gửi khảo sát
                </h2>

                {surveyCounts.map((survey) => {
                    // Tìm khảo sát tương ứng trong reviewData.surveys dựa vào survey_id
                    const matchingSurvey = reviewData.surveys.find(
                        (s) => s.id === survey.survey_id
                    );

                    return (
                        <div key={survey.survey_id} className="mb-8">
                            <h3 className="text-xl font-semibold text-teal-700">
                                {matchingSurvey
                                    ? matchingSurvey.survey_title
                                    : `Khảo sát ${survey.survey_id}`}
                            </h3>
                            <p className="text-gray-800">
                                Số câu đã trả lời: {survey.answered} /{' '}
                                {survey.total}
                            </p>
                        </div>
                    );
                })}

                <p className="text-red-900 font-semibold">
                    Đã trả lời: {answeredCount} / {totalQuestions} (
                    {Math.round((answeredCount / totalQuestions) * 100)}% tổng
                    số câu hỏi)
                </p>
                {answeredCount / totalQuestions < 0.7 && totalQuestions > 0 && (
                    <p className="text-red-600 text-sm mt-2">
                        * Bạn cần trả lời ít nhất 70% câu hỏi để gửi khảo sát!
                    </p>
                )}

                <div className="flex justify-between mt-8">
                    <button
                        className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        onClick={() => setShowReview(false)}
                    >
                        Quay lại
                        <FaArrowLeft size={18} />
                    </button>
                    <button
                        className={`px-6 py-2 rounded-lg transition duration-200 ${
                            answeredCount / totalQuestions >= 0.7
                                ? 'bg-teal-600 text-white hover:bg-teal-700'
                                : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        }`}
                        onClick={handleSubmitSurvey}
                        disabled={answeredCount / totalQuestions < 0.7}
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
                        questionCounter++;
                        return (
                            <div
                                key={question.id}
                                className="border border-gray-300 rounded-lg shadow-md p-4 mb-6 bg-gray-50"
                            >
                                <label className="block text-black font-medium text-lg text-justify flex items-center justify-between">
                                    <span>
                                        Câu {questionCounter}.{' '}
                                        {question.question_text}
                                    </span>
                                    {question.question_note && (
                                        <div
                                            className="relative ml-2"
                                            onMouseEnter={() =>
                                                setTooltipId(
                                                    question.question_id
                                                )
                                            } // Chỉ mở tooltip cho đúng câu hỏi
                                            onMouseLeave={() =>
                                                setTooltipId(null)
                                            } // Đóng tooltip khi rời chuột
                                        >
                                            <FaQuestionCircle className="text-teal-500 cursor-pointer" />
                                            {tooltipId ===
                                                question.question_id && ( // Kiểm tra ID câu hỏi
                                                <div className="absolute top-full right-0 mt-1 p-2 bg-gray-200 text-gray-800 rounded-md text-sm shadow-md w-60">
                                                    {question.question_note}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </label>

                                <div className="mt-3 text-base text-justify">
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
                                        <div className="space-y-3 mt-2">
                                            {question.question_options.map(
                                                (option) => (
                                                    <div
                                                        key={option.id}
                                                        className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 transition-all cursor-pointer"
                                                        onClick={() =>
                                                            handleCheckboxChange(
                                                                question.id,
                                                                option.id,
                                                                option.require_reason
                                                            )
                                                        }
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                Array.isArray(
                                                                    answers[
                                                                        question
                                                                            .id
                                                                    ]
                                                                ) &&
                                                                answers[
                                                                    question.id
                                                                ].includes(
                                                                    option.id
                                                                )
                                                            }
                                                            readOnly
                                                            className="w-5 h-5 text-teal-600 bg-gray-200 border-gray-300 rounded-md focus:ring-teal-500"
                                                        />
                                                        <div className="flex-1">
                                                            <div className="inline-flex items-center space-x-2">
                                                                <span className="text-gray-800 font-medium">
                                                                    {
                                                                        option.option_text
                                                                    }
                                                                </span>

                                                                {option.option_note && (
                                                                    <span className="text-gray-500 italic text-sm font-semibold">
                                                                        (
                                                                        {
                                                                            option.option_note
                                                                        }
                                                                        )
                                                                    </span>
                                                                )}
                                                            </div>

                                                            {showTextBox[
                                                                `${question.id}-${option.id}`
                                                            ] && (
                                                                <input
                                                                    type="text"
                                                                    className="border-2 border-gray-300 rounded-lg p-2 mt-2 w-full focus:border-teal-500 focus:outline-none"
                                                                    placeholder="Vui lòng nhập chi tiết..."
                                                                    value={
                                                                        textInputs[
                                                                            `${question.id}-${option.id}`
                                                                        ] || ''
                                                                    }
                                                                    onChange={async (
                                                                        e
                                                                    ) => {
                                                                        setTextInputs(
                                                                            (
                                                                                prev
                                                                            ) => ({
                                                                                ...prev,
                                                                                [`${question.id}-${option.id}`]:
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                            })
                                                                        );
                                                                        //fix this
                                                                        await saveUserResponse(
                                                                            question.id,
                                                                            respondentId,
                                                                            option.id,
                                                                            true,
                                                                            textInputs[
                                                                                `${question.id}-${option.id}`
                                                                            ] ||
                                                                                null
                                                                        );
                                                                        //
                                                                    }}
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        e.stopPropagation()
                                                                    }
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
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
                        handleSubmitSurvey={handleReviewSurvey}
                    />
                </form>
            ) : (
                <p className="text-gray-500">Không tìm thấy khảo sát.</p>
            )}
        </div>
    );
};

export default Body;
