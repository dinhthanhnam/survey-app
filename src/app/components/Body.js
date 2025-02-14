"use client";
import React, { useState } from "react";
import { surveyData } from "@/data/data";

const Body = () => {
  const [step, setStep] = useState(surveyData[0].survey_id);
  const [answers, setAnswers] = useState({});

  const currentSurvey = surveyData.find((survey) => survey.survey_id === step);

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const nextStep = () => {
    const nextSurvey = surveyData.find((s) => s.survey_id === step + 1);
    if (nextSurvey) setStep(nextSurvey.survey_id);
  };

  const prevStep = () => {
    const prevSurvey = surveyData.find((s) => s.survey_id === step - 1);
    if (prevSurvey) setStep(prevSurvey.survey_id);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <form onSubmit={(e) => e.preventDefault()}>
        {currentSurvey ? (
          <div>
            <h2 className="text-xl font-semibold text-teal-700">{currentSurvey.survey_title}</h2>
            <p className="text-gray-600">{currentSurvey.survey_description}</p>

            {/* Questions */}
            {currentSurvey?.question_survey?.map((question) => (
              <div key={question.question_id} className="mt-6">
                <label className="block text-gray-700 font-medium">
                  {question.question_id}. {question.question_text}
                </label>

                <div className="mt-2 space-y-2">
                  {question.question_type === "text" ? (
                    // Input for text questions
                    <input
                      type="text"
                      value={answers[question.question_id] || ""}
                      onChange={(e) => handleChange(question.question_id, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Nhập câu trả lời của bạn..."
                    />
                  ) : (
                    // Radio options for multiple-choice questions
                    question.question_options.map((option) => (
                      <div key={option.question_options_id} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`question-${question.question_id}-option-${option.question_options_id}`}
                          name={`question-${question.question_id}`}
                          value={option.option_value}
                          checked={answers[question.question_id] === option.option_value}
                          onChange={() => handleChange(question.question_id, option.option_value)}
                          className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                        />
                        <label htmlFor={`question-${question.question_id}-option-${option.question_options_id}`} className="text-gray-700">
                          {option.option_text}
                        </label>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Không có dữ liệu khảo sát.</p>
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-between mt-8 gap-4">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <span className="text-teal-700 font-medium">Bước {step} trên {surveyData.length}</span>
            <div className="w-full sm:w-40 bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-teal-600 h-2.5 rounded-full"
                style={{ width: `${(step / surveyData.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="flex w-full sm:w-auto gap-4">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="w-full sm:w-auto px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Quay lại
              </button>
            )}
            {step < surveyData.length ? (
              <button
                type="button"
                onClick={nextStep}
                className="w-full sm:w-auto px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Tiếp theo
              </button>
            ) : (
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Gửi khảo sát
              </button>
            )}
          </div>
        </div>

      </form>
    </div>
  );
};

export default Body;
