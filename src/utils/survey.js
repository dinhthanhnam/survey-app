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
