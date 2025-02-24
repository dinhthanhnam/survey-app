// src/utils/api.js
export const fetchSurveyCount = async () => {
    try {
        const response = await fetch('/api/survey/count');
        if (!response.ok) throw new Error('Không thể lấy số lượng khảo sát');
        const data = await response.json();
        return data.total; // Giả sử API trả về { total: số khảo sát }
    } catch (error) {
        console.error('Lỗi khi lấy số lượng khảo sát:', error);
        return 0; // Trả về 0 nếu lỗi
    }
};

export const fetchSurveyByStep = async (step) => {
    try {
        const response = await fetch(`/api/survey/${step}`);
        if (!response.ok) throw new Error('Khảo sát không tồn tại!');
        return await response.json();
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu khảo sát:', error);
        throw error;
    }
};

export const fetchGroupQuestionIds = async () => {
    try {
        const response = await fetch('/api/survey/group-questions');
        return await response.json();
    } catch (error) {
        console.error('Lỗi khi lấy danh sách câu hỏi nhóm:', error);
    }
};

export const fetchUserAnswers = async (respondentId) => {
    try {
        const response = await fetch('/api/survey/review', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ respondent_id: respondentId }),
        });

        const data = await response.json();

        const userAnswers = {};
        const questionCount = {};

        // Đếm số lần xuất hiện của mỗi question_id
        data.responses.forEach((response) => {
            questionCount[response.question_id] =
                (questionCount[response.question_id] || 0) + 1;
        });

        data.responses.forEach((response) => {
            if (questionCount[response.question_id] > 1) {
                if (!userAnswers[response.question_id]) {
                    userAnswers[response.question_id] = [];
                }
                userAnswers[response.question_id].push(
                    Number(response.question_option_id)
                );
            } else {
                userAnswers[response.question_id] = Number(
                    response.question_option_id
                );
            }
        });

        return userAnswers;
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu câu trả lời:', error);
        return null;
    }
};

export const fetchReviewData = async (respondentId) => {
    try {
        const response = await fetch('/api/survey/review', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ respondent_id: respondentId }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu xem lại:', error);
        return null;
    }
};
export const saveUserResponse = async (
    questionId,
    respondentId,
    optionId,
    isCheckbox
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
        });
    } catch (error) {
        console.error('Lỗi khi lưu câu trả lời:', error);
    }
};
