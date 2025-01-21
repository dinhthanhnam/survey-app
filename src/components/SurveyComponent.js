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
            choices: [
              "Rất hài lòng",
              "Hài lòng",
              "Bình thường",
              "Không hài lòng",
            ],
            isRequired: true,
          },
          {
            type: "text",
            name: "reason",
            title: "Lý do bạn không hài lòng:",
            visible: false, // Ẩn mặc định
            isRequired: true,
          },
        ],
      },
      {
        name: "page2",
        elements: [
          {
            type: "text",
            name: "age",
            title: "Bạn bao nhiêu tuổi?",
            isRequired: true,
          },
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
  
    // Xử lý khi giá trị thay đổi
    survey.onValueChanged.add((sender, options) => {
      if (options.name === "satisfaction") {
        const reasonQuestion = sender.getQuestionByName("reason");
        if (options.value === "Không hài lòng") {
          reasonQuestion.visible = true; // Hiển thị câu hỏi lý do
        } else {
          reasonQuestion.visible = false; // Ẩn câu hỏi lý do
          reasonQuestion.value = null; // Xóa giá trị nếu có
        }
      }
    });
  
    survey.onAfterRenderQuestion.add((sender, options) => {
        const questionElement = options.htmlElement;
      
        // Kiểm tra nếu nút "ℹ️" đã tồn tại
        if (questionElement.querySelector(".info-icon")) return;
      
        // Đảm bảo thẻ câu hỏi có position: relative
        questionElement.style.position = "relative";
      
        // Tạo nút "ℹ️" ở góc trên phải
        const infoContainer = document.createElement("div");
        infoContainer.style.position = "absolute";
        infoContainer.style.top = "10px";
        infoContainer.style.right = "10px";
        infoContainer.style.cursor = "pointer";
        infoContainer.style.zIndex = "10";
      
        const infoIcon = document.createElement("span");
        infoIcon.className = "info-icon";
        infoIcon.innerHTML = "ℹ️";
        infoIcon.style.fontSize = "16px";
        infoIcon.style.color = "#19b394";
      
        const tooltip = document.createElement("div");
        tooltip.className = "info-tooltip";
        tooltip.innerHTML = `${options.question.title}`;
        tooltip.style.position = "absolute";
        tooltip.style.top = "25px";
        tooltip.style.right = "0";
        tooltip.style.backgroundColor = "#f9f9f9";
        tooltip.style.color = "#333";
        tooltip.style.border = "1px solid #ddd";
        tooltip.style.borderRadius = "5px";
        tooltip.style.padding = "8px";
        tooltip.style.boxShadow = "0px 2px 5px rgba(0, 0, 0, 0.2)";
        tooltip.style.whiteSpace = "nowrap";
        tooltip.style.fontSize = "12px";
        tooltip.style.display = "none";
      
        infoContainer.onmouseenter = () => (tooltip.style.display = "block");
        infoContainer.onmouseleave = () => (tooltip.style.display = "none");
      
        infoContainer.appendChild(infoIcon);
        infoContainer.appendChild(tooltip);
        questionElement.appendChild(infoContainer);
      
        // Kiểm tra nếu nút "Xóa câu trả lời" đã tồn tại
        if (questionElement.querySelector(".clear-answer-button")) return;
      
        // Tạo nút "Xóa câu trả lời" ở góc dưới phải
        const clearButton = document.createElement("button");
        clearButton.className = "clear-answer-button";
        clearButton.innerHTML = "Xóa câu trả lời";
        clearButton.style.position = "static";
        clearButton.style.marginTop = "20px"
        clearButton.style.padding = "6px 12px";
        clearButton.style.backgroundColor = "#e74c3c";
        clearButton.style.color = "#fff";
        clearButton.style.border = "none";
        clearButton.style.borderRadius = "5px";
        clearButton.style.cursor = "pointer";
        clearButton.style.fontSize = "12px";
      
        // Xử lý sự kiện khi nhấn nút xóa
        clearButton.onclick = () => {
          options.question.clearValue(); // Xóa giá trị của câu hỏi
        };
      
        questionElement.appendChild(clearButton);
    });
      
    survey.onCurrentPageChanged.add((sender) => {
      setCurrentPage(sender.currentPageNo);
    });
  
    // Lắng nghe sự thay đổi câu trả lời
  survey.onValueChanged.add((sender, options) => {
    // Cập nhật trạng thái câu hỏi khi có thay đổi giá trị
    updateQuestionStatus();
  });

  // Lắng nghe khi câu hỏi được render xong
  survey.onAfterRenderQuestion.add((sender, options) => {
    // Kiểm tra nếu câu hỏi đã được render và có phần tử DOM
    const questionElement = options.htmlElement;

    if (questionElement) {
      // Kiểm tra xem câu hỏi đã có giá trị trả lời hay chưa
      const question = sender.getQuestionByName(options.question.name);
      if (question.value) {
        // Nếu câu hỏi đã có câu trả lời, thêm lớp "answered"
        questionElement.classList.add("answered");
        questionElement.classList.remove("unanswered");
      } else {
        // Nếu câu hỏi chưa có câu trả lời, thêm lớp "unanswered"
        questionElement.classList.add("unanswered");
        questionElement.classList.remove("answered");
      }
    }
  });

  // Hàm cập nhật trạng thái câu hỏi
  const updateQuestionStatus = () => {
    // Lặp qua tất cả các câu hỏi và cập nhật trạng thái
    survey.getAllQuestions().forEach((question) => {
      const questionElement = question.renderedElement;
      if (questionElement) {
        if (question.value) {
          questionElement.classList.add("answered");
          questionElement.classList.remove("unanswered");
        } else {
          questionElement.classList.add("unanswered");
          questionElement.classList.remove("answered");
        }
      }
    });
  };

  // Cập nhật trạng thái câu hỏi ngay khi bắt đầu
  updateQuestionStatus();
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
          borderTop: "2px solid #19b394",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          height: "100%",
          borderRadius: "5px",
          marginTop: "140px",
          marginRight: "20px",

          ...(window.innerWidth < 768 && {
            width: "100px", // Giảm chiều rộng
            padding: "10px", // Giảm padding
          }),
        }}
      >
        <h4
        style={{
            marginBottom: "20px",
            fontSize: "16px", // Nhỏ hơn
            color: "#19b394",
            fontWeight: "700",
            display: window.innerWidth < 768 ? "none" : "block", // Ẩn tiêu đề trên điện thoại
        }}
        >
        Điều hướng
        </h4>

        {/* Thanh tiến trình */}
        <div
          style={{
            width: "90%",
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
                    borderRadius: "5px",
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
                    width: "90%",
                    marginTop: "10px",
                    padding: "10px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "5px",
                    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                    }}
                >
                    {page.elements.map((question, questionIndex) => {
                    const isAnswered = !!surveyModel.getQuestionByName(question.name)?.value;

                    return (
                        <div
                        key={questionIndex}
                        onClick={() => navigateToQuestion(pageIndex, question.name)}
                        style={{
                            fontSize: "14px",
                            marginBottom: "8px",
                            color: isAnswered ? "#19b394" : "#555",
                            fontWeight: isAnswered ? "bold" : "normal",
                            cursor: "pointer",
                            textDecoration: "none",
                            padding: "5px",
                            borderRadius: "5px",
                            backgroundColor: isAnswered ? "#e6fff5" : "transparent",
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
                        {isAnswered ? "✔️ " : "➤ "} {question.title}
                        </div>
                    );
                    })}
                </div>
                )}
            </div>
            ))}
        </div>
      </div>
    </div>
  );
}
