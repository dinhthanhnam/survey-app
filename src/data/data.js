export const surveyData = 
[{
  survey_id: 1,
  survey_title: "THÔNG TIN QUỸ TÍN DỤNG",
  survey_description: "Khảo sát chuyển đổi số",
  question_survey: [
    {
      question_id: 1,
      question_type: "text",
      question_text: "Tên Quỹ Tín Dụng",
    },
    {
      question_id: 2,
      question_text: "Email",
      question_type: "text",
    },
  ]
},
{
  "survey_id": 2,
  "survey_title": "NHÂN LỰC VÀ NĂNG LỰC NHẬN THỨC CHUYỂN ĐỔI SỐ",
  "survey_description": "Khảo sát chuyển đổi số",
  "question_survey": [
    {
      "question_id": 1,
      "question_type": "select",
      "question_text": "Mức độ ứng dụng công nghệ trong phát triển sản phẩm/dịch vụ ngân hàng số tại đơn vị như thế nào?",
      "question_options": [
        { "question_options_id": 1, "option_text": "Không ứng dụng", "option_value": 1 },
        { "question_options_id": 2, "option_text": "Ứng dụng thử nghiệm", "option_value": 2 },
        { "question_options_id": 3, "option_text": "Ứng dụng một phần", "option_value": 3 },
        { "question_options_id": 4, "option_text": "Ứng dụng gần hoàn chỉnh", "option_value": 4 },
        { "question_options_id": 5, "option_text": "Ứng dụng hoàn chỉnh và mang lại hiệu quả", "option_value": 5 }
      ]
    },
    {
      "question_id": 2,
      "question_type": "select",
      "question_text": "Mức độ thành thạo của Anh/Chị trong việc sử dụng phần mềm nghiệp vụ (ngân hàng, quản lý dữ liệu và bảo mật thông tin) như thế nào?",
      "question_options": [
        { "question_options_id": 1, "option_text": "Hoàn toàn không thể sử dụng", "option_value": 1 },
        { "question_options_id": 2, "option_text": "Có thể sử dụng nhưng cần hỗ trợ nhiều", "option_value": 2 },
        { "question_options_id": 3, "option_text": "Có thể sử dụng ở mức cơ bản", "option_value": 3 },
        { "question_options_id": 4, "option_text": "Sử dụng tốt và có thể làm việc độc lập", "option_value": 4 },
        { "question_options_id": 5, "option_text": "Thành thạo và có thể hướng dẫn người khác", "option_value": 5 }
      ]
    },
    {
      "question_id": 3,
      "question_type": "select",
      "question_text": "Anh/Chị có sẵn sàng tham gia các chương trình đào tạo nâng cao kỹ năng CNTT trong thời gian tới không?",
      "question_options": [
        { "question_options_id": 1, "option_text": "Hoàn toàn không sẵn sàng", "option_value": 1 },
        { "question_options_id": 2, "option_text": "Không sẵn sàng", "option_value": 2 },
        { "question_options_id": 3, "option_text": "Phân vân/Chưa quyết định", "option_value": 3 },
        { "question_options_id": 4, "option_text": "Sẵn sàng", "option_value": 4 },
        { "question_options_id": 5, "option_text": "Hoàn toàn sẵn sàng", "option_value": 5 }
      ]
    },
    {
      "question_id": 4,
      "question_type": "multi-select",
      "question_text": "Bộ phận nào hiện đang phụ trách các công việc liên quan đến CNTT tại đơn vị? (Chọn nhiều đáp án nếu cần)",
      "question_options": [
        { "question_options_id": 1, "option_text": "Không có nhân sự phụ trách", "option_value": 1 },
        { "question_options_id": 2, "option_text": "Nhân viên kiêm nhiệm CNTT", "option_value": 2 },
        { "question_options_id": 3, "option_text": "Nhân sự chuyên trách CNTT", "option_value": 3 },
        { "question_options_id": 4, "option_text": "Hợp tác với đối tác bên ngoài", "option_value": 4 },
        { "question_options_id": 5, "option_text": "Khác", "option_value": 5 }
      ]
    },
    {
      "question_id": 5,
      "question_type": "select",
      "question_text": "Lãnh đạo tại đơn vị có chủ động thúc đẩy chuyển đổi số không?",
      "question_options": [
        { "question_options_id": 1, "option_text": "Hoàn toàn không", "option_value": 1 },
        { "question_options_id": 2, "option_text": "Ít quan tâm", "option_value": 2 },
        { "question_options_id": 3, "option_text": "Quan tâm vừa phải", "option_value": 3 },
        { "question_options_id": 4, "option_text": "Chủ động", "option_value": 4 },
        { "question_options_id": 5, "option_text": "Rất chủ động", "option_value": 5 }
      ]
    },
    {
      "question_id": 6,
      "question_type": "select",
      "question_text": "Hiện tại, đơn vị đã triển khai chương trình đào tạo về CNTT và chuyển đổi số như thế nào?",
      "question_options": [
        { "question_options_id": 1, "option_text": "Chưa có chương trình nào", "option_value": 1 },
        { "question_options_id": 2, "option_text": "Đã triển khai sơ bộ", "option_value": 2 },
        { "question_options_id": 3, "option_text": "Đang triển khai", "option_value": 3 },
        { "question_options_id": 4, "option_text": "Đã triển khai nhưng chưa hiệu quả", "option_value": 4 },
        { "question_options_id": 5, "option_text": "Đã triển khai đầy đủ và hiệu quả", "option_value": 5 }
      ]
    },
    {
      "question_id": 7,
      "question_type": "select",
      "question_text": "Anh/Chị đánh giá mức độ hỗ trợ từ NHNN/Co-opBank trong đào tạo nhân lực CNTT tại đơn vị như thế nào?",
      "question_options": [
        { "question_options_id": 1, "option_text": "Không hỗ trợ", "option_value": 1 },
        { "question_options_id": 2, "option_text": "Hỗ trợ hạn chế", "option_value": 2 },
        { "question_options_id": 3, "option_text": "Hỗ trợ trung bình", "option_value": 3 },
        { "question_options_id": 4, "option_text": "Hỗ trợ tốt", "option_value": 4 },
        { "question_options_id": 5, "option_text": "Hỗ trợ rất tốt", "option_value": 5 }
      ]
    },
    {
      "question_id": 8,
      "question_type": "select",
      "question_text": "Đơn vị có gặp khó khăn trong việc tuyển dụng nhân sự CNTT chuyên trách không?",
      "question_options": [
        { "question_options_id": 1, "option_text": "Rất khó khăn (Không thể tuyển)", "option_value": 1 },
        { "question_options_id": 2, "option_text": "Khó khăn (Tuyển dụng ít, thiếu ứng viên phù hợp)", "option_value": 2 },
        { "question_options_id": 3, "option_text": "Trung bình (Có thể tuyển nhưng không đủ số lượng/chất lượng)", "option_value": 3 },
        { "question_options_id": 4, "option_text": "Dễ dàng (Tuyển đủ số lượng nhưng cần đào tạo thêm)", "option_value": 4 },
        { "question_options_id": 5, "option_text": "Rất dễ dàng (Có thể tuyển ngay nhân sự đáp ứng yêu cầu)", "option_value": 5 }
      ]
    },
    {
      "question_id": 9,
      "question_type": "select",
      "question_text": "Anh/Chị đánh giá mức độ thành thạo của nhân sự tại đơn vị trong việc sử dụng phần mềm ngân hàng lõi và các công cụ liên quan như thế nào?",
      "question_options": [
        { "question_options_id": 1, "option_text": "Rất kém (Không sử dụng được)", "option_value": 1 },
        { "question_options_id": 2, "option_text": "Kém (Sử dụng được nhưng cần nhiều hỗ trợ)", "option_value": 2 },
        { "question_options_id": 3, "option_text": "Khá (Sử dụng cơ bản, cần hỗ trợ một số chức năng)", "option_value": 3 },
        { "question_options_id": 4, "option_text": "Tốt (Sử dụng tốt, ít cần hỗ trợ)", "option_value": 4 },
        { "question_options_id": 5, "option_text": "Rất tốt (Thành thạo, có thể hướng dẫn người khác)", "option_value": 5 }
      ]
    },
    {
      "question_id": 10,
      "question_type": "select",
      "question_text": "Mức độ hiệu quả của các chương trình nâng cao nhận thức về chuyển đổi số tại đơn vị Anh/Chị như thế nào?",
      "question_options": [
        { "question_options_id": 1, "option_text": "Rất kém (Chưa có chương trình nào)", "option_value": 1 },
        { "question_options_id": 2, "option_text": "Kém (Có chương trình nhưng chưa hiệu quả)", "option_value": 2 },
        { "question_options_id": 3, "option_text": "Khá (Có chương trình, hiệu quả chưa cao)", "option_value": 3 },
        { "question_options_id": 4, "option_text": "Tốt (Có chương trình, hiệu quả tốt)", "option_value": 4 },
        { "question_options_id": 5, "option_text": "Rất tốt (Chương trình hiệu quả, tạo tác động tích cực)", "option_value": 5 }
      ]
    },
    {
      "question_id": 11,
      "question_type": "select",
      "question_text": "Anh/Chị đánh giá mức độ hỗ trợ từ NHNN, Co-opBank, các đơn vị đào tạo trong việc nâng cao nhận thức về chuyển đổi số tại đơn vị như thế nào?",
      "question_options": [
        { "question_options_id": 1, "option_text": "Không hỗ trợ", "option_value": 1 },
        { "question_options_id": 2, "option_text": "Hỗ trợ hạn chế", "option_value": 2 },
        { "question_options_id": 3, "option_text": "Hỗ trợ trung bình", "option_value": 3 },
        { "question_options_id": 4, "option_text": "Hỗ trợ tốt", "option_value": 4 },
        { "question_options_id": 5, "option_text": "Hỗ trợ rất tốt", "option_value": 5 }
      ]
    },
    {
      "question_id": 12,
      "question_type": "select",
      "question_text": "Hiện tại, đơn vị đã triển khai chương trình đào tạo nội bộ về chuyển đổi số như thế nào?",
      "question_options": [
        { "question_options_id": 1, "option_text": "Không có kế hoạch nào", "option_value": 1 },
        { "question_options_id": 2, "option_text": "Có kế hoạch sơ bộ nhưng chưa thực hiện", "option_value": 2 },
        { "question_options_id": 3, "option_text": "Đã có kế hoạch nhưng chưa hoàn chỉnh", "option_value": 3 },
        { "question_options_id": 4, "option_text": "Kế hoạch hoàn chỉnh, đang triển khai", "option_value": 4 },
        { "question_options_id": 5, "option_text": "Đã triển khai đầy đủ & có đánh giá hiệu quả", "option_value": 5 }
      ]
    },
    {
      "question_id": 13,
      "question_type": "select",
      "question_text": "Anh/Chị đánh giá mức độ sẵn sàng của đội ngũ lãnh đạo trong việc tiếp cận và ứng dụng công nghệ số như thế nào?",
      "question_options": [
        { "question_options_id": 1, "option_text": "Hoàn toàn không sẵn sàng (Không quan tâm)", "option_value": 1 },
        { "question_options_id": 2, "option_text": "Không sẵn sàng (Quan tâm nhưng chưa có hành động)", "option_value": 2 },
        { "question_options_id": 3, "option_text": "Khá sẵn sàng (Có nhận thức nhưng cần thêm hỗ trợ)", "option_value": 3 },
        { "question_options_id": 4, "option_text": "Sẵn sàng (Đã có hành động ban đầu)", "option_value": 4 },
        { "question_options_id": 5, "option_text": "Hoàn toàn sẵn sàng (Đang tích cực triển khai & mở rộng)", "option_value": 5 }
      ]
    },
    
  ]
}]

                