import { glossary, renderWithGlossary } from '@/utils/glossary';

const CheckboxQuestion = ({
    question,
    answers,
    handleChange,
    isReviewMode,
}) => {
    return (
        <div className="mt-3 space-y-2">
            {question.question_options.map((option) => (
                <div
                    key={option.id}
                    className="flex items-center space-x-3 bg-white p-2 rounded-md shadow-sm border border-gray-200"
                >
                    <input
                        type="checkbox"
                        id={`question-${question.id}-option-${option.id}`}
                        name={`question-${question.id}`}
                        value={option.option_value}
                        checked={
                            Array.isArray(answers[question.id]) &&
                            answers[question.id].includes(Number(option.id))
                        }
                        onChange={() => handleChange(question.id, option.id)}
                        disabled={isReviewMode}
                        className="w-5 h-5 flex-shrink-0 text-teal-600 focus:ring-teal-500"
                    />
                    <label
                        htmlFor={`question-${question.id}-option-${option.id}`}
                        className="text-gray-700 font-medium"
                    >
                        {option.option_text}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default CheckboxQuestion;
