import React from "react";
import SurveyComponent from "@/components/SurveyComponent";

const SurveyPage = () => {
    // Dữ liệu khảo sát (JSON) - có thể lấy từ database hoặc API
    const surveyJson = {
        title: "Customer Satisfaction Survey",
        description: "We value your feedback. Please fill out this short survey.",
        elements: [
            { type: "text", name: "name", title: "What is your name?" },
            { type: "radiogroup", name: "satisfaction", title: "How satisfied are you?",
                choices: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied"]
            },
        ],
    };

    return (
        <div className="survey-container">
            <h1>Survey</h1>
            <SurveyComponent surveyJson={surveyJson} />
        </div>
    );
};

export default SurveyPage;
