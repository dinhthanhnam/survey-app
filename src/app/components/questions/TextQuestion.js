const TextQuestion = ({ question, answers, handleChange }) => {
    return (
        <input
            type="text"
            value={answers[question.id] || ''}
            onChange={(e) => handleChange(question.id, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Nhập câu trả lời của bạn..."
        />
    );
};

export default TextQuestion;
