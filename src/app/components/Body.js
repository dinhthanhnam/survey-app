"use client";
import React, { useState } from "react";
import { Question } from "survey-core";
import { surveyData } from "@/data/data";

const Body = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <form
        onSubmit={(e) => {
            e.preventDefault(); // Ngăn form reload
        }}
        >
        {/* Step 1: Thông tin chung */}
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

        {/* Step 2: Thực trạng chuyển đổi số */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold text-teal-700">Phần 2: Thực trạng chuyển đổi số {surveyData.survey_title}</h2>
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

        {/* Step 3: Đánh giá và định hướng */}
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
        <div className="flex items-center justify-between mt-8">
            <div className="flex items-center space-x-2">
                <span className="text-teal-700 font-medium">Trang {step} trên 3</span>
                <div className="w-40 bg-gray-200 rounded-full h-2.5">
                <div
                    className="bg-teal-600 h-2.5 rounded-full"
                    style={{ width: `${(step / 3) * 100}%` }}
                ></div>
                </div>
            </div>
            <div className="space-x-4">
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
        </div>
        

      </form>
    </div>
    
  );
};

export default Body;
