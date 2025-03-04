import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const Navigation = ({
  step,
  totalSurveys,
  setStep,
  handleNextStep,
  handleSubmitSurvey,
}) => {
  const progressWidth = ((step + 1) / (totalSurveys + 1)) * 100;
  const isFirstStep = step === 0;
  const isLastStep = step >= totalSurveys;

  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
      {/* Thanh tiến trình và nút điều hướng */}
      <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-teal-700">
            Bước {step + 1} / {totalSurveys + 1}
          </span>
          <div className="h-2.5 w-40 rounded-full bg-gray-200">
            <div
              className="h-2.5 rounded-full bg-teal-600 transition-all duration-300"
              style={{ width: `${progressWidth}%` }}
            />
          </div>
        </div>

        {/* Nút điều hướng */}
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => setStep((prev) => prev - 1)}
            disabled={isFirstStep}
          >
            <FaArrowLeft size={18} />
            Quay lại
          </button>

          {!isLastStep && (
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-white transition-colors hover:bg-teal-700"
              onClick={handleNextStep}
            >
              Tiếp theo
              <FaArrowRight size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Nút Gửi khảo sát (desktop) */}
      <button
        type="button"
        className="hidden rounded-lg bg-teal-600 px-6 py-2 text-white transition-colors hover:bg-teal-700 sm:block"
        onClick={handleSubmitSurvey}
      >
        Gửi khảo sát
      </button>

      {/* Nút điều hướng (mobile) */}
      <div className="grid w-full grid-cols-3 gap-2 sm:hidden">
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-lg bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => setStep((prev) => prev - 1)}
          disabled={isFirstStep}
        >
          <FaArrowLeft size={18} />
          Quay lại
        </button>

        <button
          type="button"
          className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-white transition-colors ${
            isLastStep
              ? "cursor-not-allowed bg-gray-400"
              : "bg-teal-600 hover:bg-teal-700"
          }`}
          onClick={handleNextStep}
          disabled={isLastStep}
        >
          Tiếp theo
          <FaArrowRight size={18} />
        </button>

        <button
          type="button"
          className="rounded-lg bg-teal-600 px-4 py-2 text-white transition-colors hover:bg-teal-700"
          onClick={handleSubmitSurvey}
        >
          Gửi khảo sát
        </button>
      </div>
    </div>
  );
};

export default Navigation;