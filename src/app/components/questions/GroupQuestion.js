const GroupQuestion = ({
    groupQuestion,
    childQuestions,
    answers,
    handleRadioChange,
    isReviewMode,
}) => {
    if (!groupQuestion || childQuestions.length === 0) return null;

    // Lấy danh sách lựa chọn từ câu hỏi con đầu tiên
    const options = childQuestions[0]?.questions?.question_options || [];

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 mt-3">
                {/* Header: Các lựa chọn radio */}
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">
                            Nội dung
                        </th>
                        {options.map((option) => (
                            <th
                                key={option.id}
                                className="border border-gray-300 px-4 py-2 text-center"
                            >
                                {option.option_text}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* Body: Hiển thị các câu hỏi con và radio button */}
                <tbody>
                    {childQuestions.map((question) => (
                        <tr
                            key={question.question_id}
                            className="border-t border-gray-200"
                        >
                            <td className="border border-gray-300 px-4 py-2">
                                {question.questions.question_text}
                            </td>
                            {options.map((option) => (
                                <td
                                    key={option.id}
                                    className="border border-gray-300 px-4 py-2 text-center"
                                >
                                    <input
                                        type="radio"
                                        name={`question-${question.question_id}`}
                                        value={option.option_value}
                                        checked={
                                            answers[question.id] === option.id
                                        }
                                        onChange={() =>
                                            handleRadioChange(
                                                question.question_id,
                                                option.id
                                            )
                                        }
                                        disabled={isReviewMode}
                                        className="w-5 h-5 text-teal-600 focus:ring-teal-500"
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GroupQuestion;
