"use client";

import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { useState, useEffect } from "react";

export default function SurveyForm() {
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const [selectedPage, setSelectedPage] = useState(null); // Trang được chọn để hiển thị câu hỏi
  const [surveyModel, setSurveyModel] = useState(null); // Mô hình khảo sát

  const surveyJson = {
    title: "Khảo sát ý kiến",
    description: "Hãy giúp chúng tôi cải thiện bằng cách trả lời các câu hỏi sau.",
    showQuestionNumbers: "onPage",
    pages: [
      {
        name: "page1",
        elements: [
          { type: "text", name: "name", title: "Họ và tên:", isRequired: true },
          {
            type: "radiogroup",
            name: "satisfaction",
            title: "Bạn hài lòng với dịch vụ của chúng tôi không?",
            choices: ["Rất hài lòng", "Hài lòng", "Bình thường", "Không hài lòng"],
            isRequired: true,
          },
        ],
      },
      {
        name: "page2",
        elements: [
          { type: "text", name: "age", title: "Bạn bao nhiêu tuổi?", isRequired: true },
          {
            type: "dropdown",
            name: "frequency",
            title: "Bạn sử dụng dịch vụ của chúng tôi bao lâu một lần?",
            choices: ["Hàng tuần", "Hàng tháng", "Hàng quý", "Hiếm khi"],
          },
        ],
      },
    ],
  };

  useEffect(() => {
    const survey = new Model(surveyJson);
    survey.onCurrentPageChanged.add((sender) => {
      setCurrentPage(sender.currentPageNo);
    });
    survey.onComplete.add((sender) => {
      console.log("Dữ liệu khảo sát:", sender.data);
    });
    setSurveyModel(survey);
  }, []);

  const navigateToPage = (pageIndex) => {
    if (surveyModel) {
      surveyModel.currentPageNo = pageIndex;
      setCurrentPage(pageIndex);
      setSelectedPage((prev) => (prev === pageIndex ? null : pageIndex)); // Toggle danh sách câu hỏi
    }
  };

  const navigateToQuestion = (pageIndex, questionName) => {
    if (surveyModel) {
      surveyModel.currentPageNo = pageIndex; // Chuyển đến trang chứa câu hỏi
      setCurrentPage(pageIndex);
      surveyModel.getQuestionByName(questionName)?.focus(); // Đưa câu hỏi vào tiêu điểm
    }
  };

  if (!surveyModel) return null; // Đợi SurveyJS khởi tạo

  return (
    <div style={{ display: "flex", height: "100%" }}>
      {/* Phần khảo sát */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Survey model={surveyModel} />
      </div>

      {/* Thanh điều hướng */}
      <div
        style={{
          width: "300px",
          backgroundColor: "#f9f9f9",
          borderLeft: "1px solid #ddd",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          height: "100%",
        }}
      >
        <h4 style={{ marginBottom: "20px", fontSize: "18px", color: "#19b394", fontWeight: "700" }}>Điều hướng</h4>

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
              width: `${((currentPage + 1) / surveyJson.pages.length) * 100}%`,
              height: "100%",
              backgroundColor: "#19b394",
              transition: "width 0.3s ease",
            }}
          ></div>
        </div>

        {/* Nút chuyển trang và danh sách câu hỏi */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {surveyJson.pages.map((page, pageIndex) => (
            <div key={pageIndex} style={{ width: "100%" }}>
              {/* Nút chuyển trang */}
              <div
                onClick={() => navigateToPage(pageIndex)}
                style={{
                  width: "90%",
                  padding: "12px 15px",
                  textAlign: "center",
                  borderRadius: "10px",
                  cursor: "pointer",
                  backgroundColor: pageIndex === currentPage ? "#19b394" : "#fff",
                  color: pageIndex === currentPage ? "#fff" : "#333",
                  fontWeight: pageIndex === currentPage ? "bold" : "normal",
                  border: pageIndex === currentPage ? "2px solid #19b394" : "1px solid #ddd",
                  transition: "all 0.3s ease",
                  boxShadow: pageIndex === currentPage ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
                }}
              >
                Trang {pageIndex + 1}
              </div>

              {/* Danh sách câu hỏi của trang */}
              {selectedPage === pageIndex && (
                <div
                  style={{
                    marginTop: "10px",
                    padding: "10px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "10px",
                    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {page.elements.map((question, questionIndex) => (
                    <div
                      key={questionIndex}
                      onClick={() => navigateToQuestion(pageIndex, question.name)}
                      style={{
                        fontSize: "14px",
                        marginBottom: "8px",
                        color: "#555",
                        cursor: "pointer",
                        textDecoration: "none",
                        padding: "5px",
                        borderRadius: "5px",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#e0f7f4";
                        e.currentTarget.style.color = "#19b394";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#555";
                      }}
                    >
                      ➤ {question.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
