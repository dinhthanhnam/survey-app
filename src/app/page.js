"use client";
import React, { useState } from "react";

export default function SurveyPage() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-100 to-teal-200 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Header */}
        <div className="mb-8">
          <img src="/img/logo.png" alt="Logo" className="h-16 mb-4" />
          <h1 className="text-2xl font-bold text-teal-800">Khảo sát về thực trạng chuyển đổi số tại doanh nghiệp Việt Nam</h1>
          <p className="text-gray-600 mt-2">
            Nghiên cứu này nhằm thu thập ý kiến về thực trạng chuyển đổi số và những khó khăn thách thức trong hành trình này.
          </p>
        </div>

        <form>
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-teal-700">Phần 1: Thông tin chung</h2>
              <div className="mt-4">
                <label className="block text-gray-700">Tên doanh nghiệp *</label>
                <input
                  type="text"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-teal-500"
                  placeholder="Nhập tên doanh nghiệp"
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Ngành nghề kinh doanh chính *</label>
                <select className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-teal-500">
                  <option value="">Chọn ngành nghề</option>
                  <option value="1">Công nghệ thông tin</option>
                  <option value="2">Thương mại</option>
                  <option value="3">Sản xuất</option>
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-teal-700">Phần 2: Thực trạng chuyển đổi số</h2>
              <div className="mt-4">
                <label className="block text-gray-700">Doanh nghiệp bạn đã áp dụng những công nghệ nào? *</label>
                <div className="mt-2 space-y-2">
                  <div>
                    <input type="checkbox" id="cloud" className="mr-2" />
                    <label htmlFor="cloud">Dịch vụ đám mây (Cloud Computing)</label>
                  </div>
                  <div>
                    <input type="checkbox" id="ai" className="mr-2" />
                    <label htmlFor="ai">Trí tuệ nhân tạo (AI)</label>
                  </div>
                  <div>
                    <input type="checkbox" id="iot" className="mr-2" />
                    <label htmlFor="iot">Internet of Things (IoT)</label>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Mức độ hài lòng với kết quả chuyển đổi số hiện tại *</label>
                <select className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-teal-500">
                  <option value="">Chọn mức độ</option>
                  <option value="1">Rất hài lòng</option>
                  <option value="2">Hài lòng</option>
                  <option value="3">Không hài lòng</option>
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-teal-700">Phần 3: Đánh giá và định hướng</h2>
              <div className="mt-4">
                <label className="block text-gray-700">Kế hoạch chuyển đổi số trong 5 năm tới *</label>
                <textarea
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-teal-500"
                  rows="4"
                  placeholder="Nhập kế hoạch chuyển đổi số..."
                ></textarea>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Quay lại
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Tiếp theo
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Gửi khảo sát
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
