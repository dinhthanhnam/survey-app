import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
const Navigation = ({
    step,
    totalSurveys,
    setStep,
    handleNextStep,
    handleSubmitSurvey,
}) => {
    return (
        <div className="flex flex-wrap items-center justify-between mt-8 gap-4">
            <div className="flex items-center space-x-2 w-full sm:w-auto">
                <span className="text-teal-700 font-semibold">
                    Bước {step + 1} trên {totalSurveys + 1}
                </span>
                <div className="w-full sm:w-40 bg-gray-200 rounded-full h-2.5">
                    <div
                        className="bg-teal-600 h-2.5 rounded-full"
                        style={{
                            width: `${
                                ((step + 1) / (totalSurveys + 1)) * 100
                            }%`,
                        }}
                    ></div>
                </div>
            </div>
            <div className="flex w-full sm:w-auto gap-4">
            <button
                type="button"
                className="w-full sm:w-auto px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2"
                onClick={() => setStep((prev) => prev - 1)}
            >
                <FaArrowLeft size={18} />
                Quay lại
            </button>

                {step < totalSurveys ? (
                    <button
                        type="button"
                        className="w-full sm:w-auto px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-2"
                        onClick={handleNextStep}
                    >
                        Tiếp theo
                        <FaArrowRight size={18} />
                    </button>
                ) : (
                    <button
                        type="button"
                        className="w-full sm:w-auto px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                        onClick={handleSubmitSurvey}
                    >
                        Gửi khảo sát
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navigation;
