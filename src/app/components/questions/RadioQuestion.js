import { glossary, renderWithGlossary } from '@/utils/glossary';

const RadioQuestion = ({
    question,
    answers,
    handleChange,
    groupQuestionIds,
    isReviewMode,
}) => {
    if (groupQuestionIds.includes(question.id)) {
        return null;
    }
    return (
        <div className="mt-3 space-y-2">
            {question.question_options.map((option) => (
                <div
                    key={option.id}
                    className="flex items-center space-x-3 bg-white p-2 rounded-md shadow-sm border border-gray-200"
                >
                    <input
                        type="radio"
                        id={`question-${question.id}-option-${option.id}`}
                        name={`question-${question.id}`}
                        value={option.option_value}
                        checked={answers[question.id] === option.id}
                        onChange={() => handleChange(question.id, option.id)}
                        disabled={isReviewMode}
                        className="w-5 h-5 flex-shrink-0 text-teal-600 focus:ring-teal-500"
                    />
                    <label
                        htmlFor={`question-${question.id}-option-${option.id}`}
                        className="text-gray-700 font-medium"
                    >
                        {renderWithGlossary(option.option_text)}{' '}
                        {option.option_note && (
                            <span className="text-gray-500 italic text-sm">
                                ({renderWithGlossary(option.option_note)})
                            </span>
                        )}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default RadioQuestion;
