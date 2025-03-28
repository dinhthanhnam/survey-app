// src/utils/api.js
import axios from 'axios';
export const fetchSurveyCount = async () => {
    try {
        const response = await axios.get('/api/survey/count', {
            withCredentials: true,
        });
        return response.data.total; // Giả sử API trả về { total: số khảo sát }
    } catch (error) {
        console.error('Lỗi khi lấy số lượng khảo sát:', error);
        return 0; // Trả về 0 nếu lỗi
    }
};

export const fetchSurveyByStep = async (step) => {
    try {
        const respondent = localStorage.getItem('respondent');
        if (!respondent) throw new Error('No respondent data in localStorage');

        const response = await axios.get(`/api/survey/${step}`, {
            params: { respondent }, // Gửi respondent lên
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        console.error(
            'Lỗi khi lấy dữ liệu khảo sát:',
            error.response?.data || error.message
        );
        throw error;
    }
};

export const fetchGroupQuestionIds = async () => {
    try {
        const response = await axios.get('/api/survey/group-questions', {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách câu hỏi nhóm:', error);
    }
};

export const fetchUserAnswers = async (respondentId) => {
    try {
        const response = await axios.post(
            '/api/survey/review',
            { respondent_id: respondentId },
            { withCredentials: true }
        );

        const data = response.data;

        const userAnswers = {};
        const textInputs = {}; // Thêm object để lưu lý do
        const questionCount = {};

        // Đếm số lần xuất hiện của mỗi question_id
        data.responses.forEach((response) => {
            questionCount[response.question_id] =
                (questionCount[response.question_id] || 0) + 1;
        });

        // Xử lý dữ liệu responses
        data.responses.forEach((response) => {
            const questionId = response.question_id;
            const optionId = Number(response.question_option_id);
            const reasonText = response.question_option_answer || ''; // Lấy lý do, mặc định là chuỗi rỗng nếu không có

            // Xử lý userAnswers
            if (questionCount[questionId] > 1) {
                if (!userAnswers[questionId]) {
                    userAnswers[questionId] = [];
                }
                userAnswers[questionId].push(optionId);
            } else {
                userAnswers[questionId] = optionId;
            }

            // Lưu lý do nếu có
            if (reasonText) {
                textInputs[`${questionId}-${optionId}`] = reasonText;
            }
        });

        // Trả về cả answers và textInputs
        return { answers: userAnswers, textInputs };
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu câu trả lời:', error);
        return { answers: {}, textInputs: {} };
    }
};

export const fetchReviewData = async (respondentId) => {
    try {
        const response = await axios.post(
            '/api/survey/review',
            { respondent_id: respondentId },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu xem lại:', error);
        return null;
    }
};
export const saveUserResponse = async (
    questionId,
    respondentId,
    optionId,
    isCheckbox,
) => {
    try {
        await fetch('/api/survey/response', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                question_id: questionId,
                respondent_id: respondentId,
                question_option_id: optionId,
                isCheckbox,
            }),
        })
    } catch (error) {
        console.error('Lỗi khi lưu câu trả lời:', error);
    }
};

export const saveReasonResponse = async (questionId, respondentId, optionId, reasonText) => {
    try {
        const response = await axios.post('/api/survey/reason', {
            question_id: questionId,
            respondent_id: respondentId,
            question_option_id: optionId,
            question_option_answer: reasonText,
        });
        return response.data;
    } catch (error) {
        console.error('Error saving reason response:', error);
        throw error;
    }
};

// const respondentData = localStorage.getItem('respondent');
// const respondent = respondentData ? JSON.parse(respondentData) : null;

// if (respondent) {
//     axios
//         .get(`/api/survey/response/count`, {
//             params: { respondent_id: respondent.id }, // Truyền tham số vào query
//         })
//         .then((response) => {
//             console.log(response.data);
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
// } else {
//     console.error('Respondent data not found in localStorage');
// }
