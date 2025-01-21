"use client";

import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { useState } from "react";

export default function SurveyForm() {
  const [currentPage, setCurrentPage] = useState(0); // Lưu trữ trạng thái trang hiện tại

  const surveyJson = {
    title: "Khảo sát ý kiến",
    description: "Hãy giúp chúng tôi cải thiện bằng cách trả lời các câu hỏi sau.",
    showQuestionNumbers: "onPage",
    pages: [
      {
        elements: [
          { type: "text", name: "name", title: "Họ và tên:", isRequired: true },
          {
            type: "radiogroup",
            name: "satisfaction",
            title: "Bạn hài lòng với dịch vụ của chúng tôi không?",
            choices: ["Rất hài lòng", "Hài lòng", "Bình thường", "Không hài lòng"],
            isRequired: true,
          },
          { type: "text", name: "improvement", title: "Bạn muốn chúng tôi cải thiện điều gì?" },
          {
            type: "rating",
            name: "quality",
            title: "Bạn đánh giá chất lượng sản phẩm của chúng tôi như thế nào?",
            rateValues: [1, 2, 3, 4, 5],
          },
          {
            type: "checkbox",
            name: "services",
            title: "Bạn đã sử dụng những dịch vụ nào của chúng tôi?",
            choices: ["Dịch vụ A", "Dịch vụ B", "Dịch vụ C", "Dịch vụ D"],
          },
          {
            type: "checkbox",
            name: "services",
            title: "Bạn đã sử dụng những dịch vụ nào của chúng tôi?",
            choices: ["Dịch vụ A", "Dịch vụ B", "Dịch vụ C", "Dịch vụ D"],
          },
          {
            type: "checkbox",
            name: "services",
            title: "Bạn đã sử dụng những dịch vụ nào của chúng tôi?",
            choices: ["Dịch vụ A", "Dịch vụ B", "Dịch vụ C", "Dịch vụ D"],
          },
        ],
      },
      {
        elements: [
          { type: "text", name: "age", title: "Bạn bao nhiêu tuổi?", isRequired: true },
          {
            type: "dropdown",
            name: "frequency",
            title: "Bạn sử dụng dịch vụ của chúng tôi bao lâu một lần?",
            choices: ["Hàng tuần", "Hàng tháng", "Hàng quý", "Hiếm khi"],
          },
          { type: "text", name: "feedback", title: "Nhận xét thêm của bạn về dịch vụ?" },
          {
            type: "matrix",
            name: "productFeedback",
            title: "Đánh giá các sản phẩm của chúng tôi:",
            columns: ["Tốt", "Bình thường", "Kém"],
            rows: ["Sản phẩm A", "Sản phẩm B", "Sản phẩm C"],
          },
          {
            type: "boolean",
            name: "recommend",
            title: "Bạn có giới thiệu dịch vụ của chúng tôi cho người khác không?",
          },
        ],
      },
      // Thêm các trang khác
    ],
  };

  const survey = new Model(surveyJson);

  survey.onComplete.add((sender) => {
    console.log("Dữ liệu khảo sát:", sender.data);
  });

  survey.onCurrentPageChanged.add((sender) => {
    setCurrentPage(sender.currentPageNo);
  });

  const totalPages = surveyJson.pages.length;

return (
  <div style={{ display: "flex", height: "100%" }}>
    {/* Phần khảo sát */}
    <div style={{ flex: 1, padding: "20px" }}>
      <Survey model={survey} />
    </div>

    {/* Thanh điều hướng bên phải */}
    <div
      style={{
        width: "250px",
        backgroundColor: "#f9f9f9",
        borderLeft: "1px solid #ddd",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        height: "100%",
        borderRadius: "10px",
        marginTop: "140px",
      }}
    >
      <h4 style={{ marginBottom: "20px", fontSize: "23px", color: "#19b394", fontWeight: "700" }}>Điều hướng</h4>

      {/* Thanh tiến trình */}
      <div
        style={{
          width: "80%",
          height: "10px",
          backgroundColor: "#ddd",
          borderRadius: "5px",
          overflow: "hidden",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: `${((currentPage + 1) / totalPages) * 100}%`,
            height: "100%",
            backgroundColor: "#19b394",
            transition: "width 0.3s ease",
          }}
        ></div>
      </div>

      {/* Nút điều hướng */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {Array.from({ length: totalPages }).map((_, index) => (
          <div
            key={index}
            onClick={() => (survey.currentPageNo = index)}
            style={{
              width: "80%",
              padding: "10px 15px",
              textAlign: "center",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundColor: index === currentPage ? "#19b394" : "#fff",
              color: index === currentPage ? "#fff" : "#333",
              fontWeight: index === currentPage ? "bold" : "normal",
              border: index === currentPage ? "2px solid #19b394" : "1px solid #ddd",
              boxShadow: index === currentPage ? "0px 4px 8px rgba(0, 0, 0, 0.2)" : "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor =
                index === currentPage ? "#17a087" : "#f0f0f0")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor =
                index === currentPage ? "#19b394" : "#fff")
            }
          >
            Trang {index + 1}
          </div>
        ))}
      </div>
    </div>
  </div>
);

}
