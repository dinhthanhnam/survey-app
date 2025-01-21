'use client';
import React from "react";
import { Survey } from "survey-react-ui";
import { Model } from "survey-core";

const SurveyComponent = ({ surveyJson }) => {
    const survey = new Model(surveyJson);

    // Xử lý sự kiện khi hoàn thành khảo sát
    survey.onComplete.add((sender) => {
        console.log("Survey results:", sender.data);
        // Có thể gửi kết quả đến API tại đây
    });

    return <Survey model={survey} />;
};

export default SurveyComponent;
