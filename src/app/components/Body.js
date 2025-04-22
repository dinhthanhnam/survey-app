// body.js
'use client';
import React, { useState, useEffect } from 'react';
import { FaQuestionCircle, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import {
    fetchSurveyCount,
    fetchSurveyByStep,
    fetchGroupQuestionIds,
    fetchUserAnswers,
    fetchReviewData,
    saveUserResponse,
    saveReasonResponse,
} from '@/utils/survey';
import Navigation from './Navigation';
import RadioQuestion from './questions/RadioQuestion';
import { useRouter } from 'next/navigation';
import CheckboxQuestion from './questions/CheckboxQuestion';
import GroupQuestion from './questions/GroupQuestion';
import Visualize from './visualize/visualize'; // Import component Visualize
import { glossary, renderWithGlossary } from '@/utils/glossary';
import QuestionNoteTooltip from './QuestionNoteTooltip';
const Body = ({ scrollToTop }) => {
    let questionCounter = 0;
    const [step, setStep] = useState(0);
    const [surveyData, setSurveyData] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [answers, setAnswers] = useState({});
    const [totalSurveys, setTotalSurveys] = useState(0);
    const [groupQuestionIds, setGroupQuestionIds] = useState([]);
    const [tooltipId, setTooltipId] = useState(null);
    const [showReview, setShowReview] = useState(false);
    const [reviewData, setReviewData] = useState(null);
    const [answeredCount, setAnsweredCount] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [showTextBox, setShowTextBox] = useState({});
    const [textInputs, setTextInputs] = useState({});
    const [surveyCounts, setSurveyCounts] = useState([]);
    const [isReviewLoading, setIsReviewLoading] = useState(false);
    const [respondentId, setRespondentId] = useState(null);
    const [role, setRole] = useState(null);
    const [surveyProgress, setSurveyProgress] = useState([]);
    const [showChart, setShowChart] = useState(false); // Trạng thái để hiển thị biểu đồ

    useEffect(() => {
        const respondentData = localStorage.getItem('respondent');
        if (respondentData) {
            const respondent = JSON.parse(respondentData);
            setRespondentId(respondent.id);
            setRole(respondent.belong_to_group);
        }
    }, []);

    const fetchSurveyProgress = async (respondentId, role) => {
        try {
            const countResponse = await axios.get(
                '/api/survey/response/count',
                {
                    params: {
                        respondent_id: respondentId,
                        belong_to_group: role,
                    },
                }
            );
            const { surveys, totalQuestions, answeredCount } =
                countResponse.data;
            setTotalQuestions(totalQuestions);
            setAnsweredCount(answeredCount);
            setSurveyProgress(countResponse.data?.surveys || []);
        } catch (error) {
            console.error('Error preparing review data:', error);
            alert('Có lỗi khi tải dữ liệu xem lại, vui lòng thử lại!');
        }
    };

    useEffect(() => {
        if (respondentId && role) {
            fetchSurveyProgress(respondentId, role);
        }
    }, [respondentId, role]);

    const handleReviewSurvey = async () => {
        setIsReviewLoading(true);
        try {
            const [countResponse, reviewResponse] = await Promise.all([
                axios.get('/api/survey/response/count', {
                    params: {
                        respondent_id: respondentId,
                        belong_to_group: role,
                    },
                }),
                fetchReviewData(respondentId),
            ]);

            const { surveys, totalQuestions, answeredCount } =
                countResponse.data;
            setSurveyCounts(surveys);
            setTotalQuestions(totalQuestions);
            setAnsweredCount(answeredCount);

            if (reviewResponse) {
                setReviewData(reviewResponse);
                const { answers } = await fetchUserAnswers(respondentId);
                setAnswers(answers || {});
            }
            setStep(totalSurveys + 1);
        } catch (error) {
            console.error('Error preparing review data:', error);
            alert('Có lỗi khi tải dữ liệu xem lại, vui lòng thử lại!');
        } finally {
            setIsReviewLoading(false);
        }
    };

    // Hàm xử lý gửi khảo sát và hiển thị biểu đồ
    const handleSubmitSurvey = async () => {
        try {
            // Gửi khảo sát
            await axios.post('/api/survey/submit', {
                respondent_id: respondentId,
            });

            // Sau khi gửi thành công, hiển thị biểu đồ
            router.push(`/survey-report`);
        } catch (error) {
            console.error('Lỗi khi gửi khảo sát:', error);
            alert('Đã xảy ra lỗi, vui lòng thử lại!');
        }
    };

    useEffect(() => {
        const loadUserAnswers = async () => {
            const { answers, textInputs } = await fetchUserAnswers(
                respondentId
            );
            if (answers) {
                setAnswers(answers);
            }
            if (textInputs) {
                setTextInputs(textInputs);
            }
        };
        if (step > 0) loadUserAnswers();
    }, [step, respondentId]);

    useEffect(() => {
        const loadReviewData = async () => {
            const data = await fetchReviewData(respondentId);
            if (data) {
                setReviewData(data);
                const { answers, textInputs } = await fetchUserAnswers(
                    respondentId
                );
                setAnswers(answers || {});
                if (textInputs) setTextInputs(textInputs);
            }
        };
        if (step === totalSurveys + 1) {
            loadReviewData();
        }
    }, [step, totalSurveys, respondentId]);

    useEffect(() => {
        const getGroupQuestionIds = async () => {
            const data = await fetchGroupQuestionIds();
            setGroupQuestionIds(data.questionGroup.map((q) => q.id));
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
        scrollToTop();
    };

    const handleRadioChange = async (questionId, optionId) => {
        setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
        await saveUserResponse(questionId, respondentId, optionId, false);
        fetchSurveyProgress(respondentId, role);
    };

    const handleCheckboxChange = async (
        questionId,
        optionId,
        requireReason
    ) => {
        setAnswers((prev) => {
            let currentValues = prev[questionId];
            if (!currentValues) {
                currentValues = [];
            } else if (!Array.isArray(currentValues)) {
                currentValues = [currentValues];
            }

            const newValues = currentValues.includes(optionId)
                ? currentValues.filter((v) => v !== optionId)
                : [...currentValues, optionId];

            setShowTextBox((prev) => ({
                ...prev,
                [`${questionId}-${optionId}`]: requireReason
                    ? newValues.includes(optionId)
                    : false,
            }));

            if (!newValues.includes(optionId)) {
                setTextInputs((prev) => ({
                    ...prev,
                    [`${questionId}-${optionId}`]: '',
                }));
            }

            return { ...prev, [questionId]: newValues };
        });

        await saveUserResponse(questionId, respondentId, optionId, true);
        fetchSurveyProgress(respondentId, role);
    };

    if (step === 0) {
        return (
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
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

    if (step === totalSurveys + 1 && !showChart) {
        if (isReviewLoading) {
            return (
                <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 text-center">
                    <p className="text-teal-600">Đang tải dữ liệu xem lại...</p>
                </div>
            );
        }

        if (!reviewData || !surveyCounts.length) {
            return (
                <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 text-center">
                    <p className="text-red-600">
                        Không thể tải dữ liệu xem lại.
                    </p>
                </div>
            );
        }

        return (
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-bold text-teal-900 mb-6 text-center">
                    Xác nhận trước khi gửi khảo sát
                </h2>

                {surveyCounts.map((survey, index) => {
                    const matchingSurvey = reviewData.surveys.find(
                        (s) => s.id === survey.survey_id
                    );
                    const surveyStep = index + 1;

                    const handleTitleClick = () => {
                        setStep(surveyStep);
                        setShowReview(false);
                        scrollToTop();
                    };

                    return (
                        <div key={survey.survey_id} className="mb-8">
                            <h3
                                className="text-xl font-semibold text-teal-700 cursor-pointer hover:underline"
                                onClick={handleTitleClick}
                            >
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
                    {totalQuestions > 0
                        ? Math.round((answeredCount / totalQuestions) * 100)
                        : 0}
                    % tổng số câu hỏi)
                </p>
                {answeredCount / totalQuestions < 0.7 && totalQuestions > 0 && (
                    <p className="text-red-600 text-sm mt-2">
                        * Bạn cần trả lời ít nhất 70% câu hỏi để gửi khảo sát!
                    </p>
                )}

                <div className="flex justify-between mt-8">
                    <button
                        className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2"
                        onClick={() => {
                            setStep(step - 1);
                            scrollToTop();
                        }}
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

    if (showChart) {
        return <Visualize respondentId={respondentId} />;
    }

    const currentSurveyProgress = surveyProgress.find(
        (s) => s.survey_id === step
    );

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
                    {currentSurveyProgress && (
                        <p className="sticky top-0 bg-white z-10 p-4 shadow text-gray-700 font-semibold mb-6">
                            Đã trả lời {currentSurveyProgress.answered} /{' '}
                            {currentSurveyProgress.total} câu của trang này
                            <br />
                            Tổng trả lời {answeredCount} / {totalQuestions} (
                            {totalQuestions > 0
                                ? Math.round(
                                      (answeredCount / totalQuestions) * 100
                                  )
                                : 0}
                            % tổng số câu hỏi)
                        </p>
                    )}
                    {surveyData.question_survey.map((questionSurvey, index) => {
                        const question = questionSurvey.questions;
                        const childQuestions =
                            surveyData.question_survey.filter((q) =>
                                q.questions.question_name.startsWith(
                                    question.question_name + '.'
                                )
                            );
                        if (groupQuestionIds.includes(question.parent_id))
                            return null;

                        // Logic điều kiện: Ẩn câu 6 nếu câu 5 chọn phương án 1
                        const shouldDisplayQuestion = () => {
                            if (question.id === 6) {
                                // Câu 6
                                const question5Answers = answers[5] || []; // Câu trả lời của câu 5
                                // Nếu không có câu trả lời cho câu 5 hoặc phương án 1 không được chọn, hiển thị câu 6
                                return !question5Answers.includes(21);
                            }
                            return true; // Các câu hỏi khác hiển thị bình thường
                        };

                        if (!shouldDisplayQuestion()) return null;

                        questionCounter++;
                        return (
                            <div
                                key={question.id}
                                className="border border-gray-300 rounded-lg shadow-md p-4 mb-6 bg-gray-50"
                            >
                                <label className=" text-black font-medium text-lg text-justify flex items-center justify-between">
                                    <span>
                                        Câu {questionCounter}.{' '}
                                        {renderWithGlossary(
                                            question.question_text
                                        )}
                                    </span>
                                    {question.question_note && (
                                        <QuestionNoteTooltip note={question.question_note} />
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
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                answers[
                                                                    question.id
                                                                ]
                                                                    ? Array.isArray(
                                                                          answers[
                                                                              question
                                                                                  .id
                                                                          ]
                                                                      )
                                                                        ? answers[
                                                                              question
                                                                                  .id
                                                                          ].includes(
                                                                              option.id
                                                                          )
                                                                        : answers[
                                                                              question
                                                                                  .id
                                                                          ] ===
                                                                          option.id
                                                                    : false
                                                            }
                                                            onChange={() =>
                                                                handleCheckboxChange(
                                                                    question.id,
                                                                    option.id,
                                                                    option.require_reason
                                                                )
                                                            }
                                                            className="w-5 h-5 text-teal-600 bg-gray-200 border-gray-300 rounded-md focus:ring-teal-500"
                                                        />
                                                        <div className="flex-1">
                                                            <div className="inline-flex items-center space-x-2">
                                                                <span className="text-gray-800 font-medium">
                                                                    {renderWithGlossary(
                                                                        option.option_text
                                                                    )}
                                                                </span>
                                                                {option.option_note && (
                                                                    <span className="text-gray-500 italic text-sm font-semibold">
                                                                        {renderWithGlossary(
                                                                            option.option_note
                                                                        )}
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
                                                                        const newText =
                                                                            e
                                                                                .target
                                                                                .value;
                                                                        setTextInputs(
                                                                            (
                                                                                prev
                                                                            ) => ({
                                                                                ...prev,
                                                                                [`${question.id}-${option.id}`]:
                                                                                    newText,
                                                                            })
                                                                        );
                                                                    }}
                                                                    onBlur={async () => {
                                                                        await saveReasonResponse(
                                                                            question.id,
                                                                            respondentId,
                                                                            option.id,
                                                                            textInputs[
                                                                                `${question.id}-${option.id}`
                                                                            ] ||
                                                                                null
                                                                        );
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
