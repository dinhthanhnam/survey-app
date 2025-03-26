// components/visualize/visualize.js
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Radar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";
import { useRouter, usePathname } from "next/navigation";

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function SurveyReport({ }) {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pillarAverages, setPillarAverages] = useState([]);
    const [respondent_Institution_Id, setRespondent_Institution_Id] = useState(null); 
    const router = useRouter();

    useEffect(() => {
        const respondentData = localStorage.getItem('respondent');
        if (respondentData) {
            const respondent = JSON.parse(respondentData);
            setRespondent_Institution_Id(respondent.institution_id);
        }
    }, []);

    // Define the structure of surveys (pillars) and their sub-labels
    const pillars = [
        {
            name: "NHÂN LỰC VÀ NĂNG LỰC NHẬN THỨC CHUYỂN ĐỔI SỐ",
            surveyId: 1,
            color: "rgba(255, 147, 96, 0.2)", // Orange
            borderColor: "rgba(255, 147, 96, 1)",
            subLabels: [
                { label: "Hiểu biết về CĐS", questions: [1] },
                { label: "Thành thạo công cụ số", questions: [2, 3] },
                { label: "Sẵn sàng học tập & đào tạo", questions: [4, 5, 6, 7] },
                { label: "Nhân sự & hỗ trợ CNTT", questions: [8, 9] },
                { label: "Hành động thực tế về CĐS", questions: [10, 11, 12] },
            ],
        },
        {
            name: "HIỆN TRẠNG QUY TRÌNH NGHIỆP VỤ & MÔ HÌNH QUẢN TRỊ SỐ",
            surveyId: 2,
            color: "rgba(255, 105, 180, 0.2)", // Pink
            borderColor: "rgba(255, 105, 180, 1)",
            subLabels: [
                { label: "Chuẩn bị số hóa quy trình & quản trị số", questions: [1, 2] },
                { label: "Số hóa nghiệp vụ cốt lõi", questions: [3, 4] },
                { label: "Tích hợp công nghệ vào dịch vụ khách hàng", questions: [5] },
                { label: "Liên thông & tích hợp hệ thống", questions: [6] },
                { label: "Tự động hóa quy trình", questions: [7] },
                { label: "Tuân thủ tiêu chuẩn ngành", questions: [8] },
                { label: "Rào cản & kế hoạch khắc phục", questions: [9, 11] },
                { label: "Ứng dụng công nghệ vào hệ thống Co-opBank", questions: [12, 13, 14] },
            ],
        },
        {
            name: "CƠ SỞ HẠ TẦNG CNTT & MỨC ĐỘ ỨNG DỤNG CÔNG NGHỆ",
            surveyId: 3,
            color: "rgba(54, 162, 235, 0.2)", // Blue
            borderColor: "rgba(54, 162, 235, 1)",
            subLabels: [
                { label: "Hiện trạng hạ tầng", questions: [1, 2, 3] },
                { label: "Nâng cấp & kế hoạch phát triển", questions: [4, 5, 6, 9] },
                { label: "Ứng dụng công nghệ hiện đại", questions: [7, 8, 10] },
                { label: "Mức độ tích hợp hệ thống", questions: [11, 12] },
                { label: "Sẵn sàng vận hành công nghệ mới", questions: [13] },
            ],
        },
        {
            name: "AN NINH THÔNG TIN & QUẢN TRỊ RỦI RO CÔNG NGHỆ",
            surveyId: 4,
            color: "rgba(75, 192, 192, 0.2)", // Green
            borderColor: "rgba(75, 192, 192, 1)",
            subLabels: [
                { label: "Hiện trạng an toàn CNTT", questions: [1, 2] },
                { label: "Nhận thức & đào tạo về an ninh mạng", questions: [3, 4] },
                { label: "Ứng phó với sự cố an ninh mạng", questions: [5, 6, 7, 8, 9] },
                { label: "Công cụ & giám sát bảo mật", questions: [10, 11] },
                { label: "Tuân thủ & hỗ trợ an ninh mạng", questions: [12, 13] },
            ],
        },
        {
            name: "QUẢN LÝ & KHAI THÁC DỮ LIỆU SỐ",
            surveyId: 5,
            color: "rgba(153, 102, 255, 0.2)", // Purple
            borderColor: "rgba(153, 102, 255, 1)",
            subLabels: [
                { label: "Mức độ số hóa dữ liệu", questions: [1] },
                { label: "Hệ thống lưu trữ dữ liệu", questions: [2] },
                { label: "Ứng dụng công cụ phân tích dữ liệu", questions: [3, 4] },
                { label: "Khai thác dữ liệu khách hàng", questions: [5, 6, 7] },
                { label: "Mức độ liên thông dữ liệu", questions: [8, 9] },
                { label: "Quản lý và sử dụng dữ liệu", questions: [10, 11, 12] },
                { label: "Khó khăn trong khai thác dữ liệu", questions: [13, 14] },
            ],
        },
        {
            name: "PHÁT TRIỂN SẢN PHẨM & DỊCH VỤ NGÂN HÀNG SỐ",
            surveyId: 6,
            color: "rgba(255, 206, 86, 0.2)", // Yellow
            borderColor: "rgba(255, 206, 86, 1)",
            subLabels: [
                { label: "Mức độ ứng dụng dịch vụ ngân hàng số", questions: [1] },
                { label: "Kế hoạch triển khai các dịch vụ ngân hàng số", questions: [2, 3, 4] },
                { label: "Mức độ hài lòng của khách hàng", questions: [5, 9] },
                { label: "Kế hoạch hợp tác và mở rộng hệ sinh thái số", questions: [6, 7, 8] },
            ],
        },
        {
            name: "NGUỒN LỰC TÀI CHÍNH & KHẢ NĂNG HỢP TÁC",
            surveyId: 7,
            color: "rgba(255, 99, 132, 0.2)", // Red
            borderColor: "rgba(255, 99, 132, 1)",
            subLabels: [
                { label: "Ngân sách & Đầu tư CNTT", questions: [1, 2, 4] },
                { label: "Sẵn sàng đầu tư & mở rộng tài chính", questions: [3, 5] },
                { label: "Hợp tác tài chính với NHNN/NHHTX & TCTD", questions: [6, 7] },
            ],
        },
        {
            name: "LỘ TRÌNH CHUYỂN ĐỔI SỐ ĐỒNG BỘ & THỐNG NHẤT",
            surveyId: 8,
            color: "rgba(54, 54, 54, 0.2)", // Gray
            borderColor: "rgba(54, 54, 54, 1)",
            subLabels: [
                { label: "Tầm nhìn & mục tiêu chuyển đổi số", questions: [1, 2] },
                { label: "Số hóa nghiệp vụ ngân hàng", questions: [3, 4] },
                { label: "Lộ trình & kế hoạch triển khai", questions: [5] },
                { label: "Mức độ phối hợp với NHHTX & TCTD", questions: [6, 7] },
                { label: "Hợp tác với tổ chức công nghệ & mở rộng hệ sinh thái", questions: [8] },
            ],
        },
    ];
    const fetchChartData = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                "/api/survey/response/institution-response",
                { institution_id: respondent_Institution_Id },
                { withCredentials: true }
            );

            const data = response.data;
            console.log("Raw API Response:", data);
    
            if (!data.surveys || !data.responses) {
                throw new Error("Dữ liệu từ API không đầy đủ: Thiếu surveys hoặc responses");
            }
    
            const allLabels = pillars.flatMap(pillar => pillar.subLabels.map(sub => sub.label));
    
            // Hàm tính điểm phần trăm cho một câu hỏi (0-100%)
            const calculateQuestionPercentage = (question, responses) => {
                const questionType = question.question_type;
                const userAnswers = responses.filter(response => response.question_id === question.id);
    
                if (!userAnswers.length) {
                    console.log(`No responses for question "${question.question_name}"`);
                    return 0;
                }
    
                if (questionType === "radiogroup") {
                    const maxWeightedValue = Math.max(
                        ...question.question_options.map(opt => opt.weighted_value || 0)
                    );
                    let totalWeightedValue = 0;
                    let responseCount = 0;
    
                    userAnswers.forEach(answer => {
                        const selectedOption = question.question_options.find(
                            opt => opt.id === answer.question_option_id
                        );
                        totalWeightedValue += selectedOption?.weighted_value || 0;
                        responseCount++;
                    });
    
                    const avgWeightedValue = responseCount > 0 ? totalWeightedValue / responseCount : 0;
                    return maxWeightedValue > 0
                        ? (avgWeightedValue / maxWeightedValue) * 100
                        : 0;
                } else if (questionType === "checkbox") {
                    const totalPossibleWeightedValue = question.question_options.reduce(
                        (sum, opt) => sum + (opt.weighted_value || 0),
                        0
                    );
                    let totalSelectedWeightedValue = 0;
    
                    userAnswers.forEach(answer => {
                        const selectedOption = question.question_options.find(
                            opt => opt.id === answer.question_option_id
                        );
                        totalSelectedWeightedValue += selectedOption?.weighted_value || 0;
                    });
    
                    return totalPossibleWeightedValue > 0
                        ? Math.min((totalSelectedWeightedValue / totalPossibleWeightedValue) * 100, 100)
                        : 0;
                } else if (questionType === "group") {
                    const childQuestions = data.surveys
                        .flatMap(survey => survey.question_survey)
                        .map(qs => qs.questions)
                        .filter(q => q.parent_id === question.id);
    
                    if (!childQuestions.length) {
                        console.log(`No child questions for group "${question.question_name}"`);
                        return 0;
                    }
    
                    const childScores = childQuestions.map(child => calculateQuestionPercentage(child, responses));
                    return childScores.length
                        ? childScores.reduce((sum, score) => sum + score, 0) / childScores.length
                        : 0;
                }
    
                return 0; // Trường hợp không xác định
            };
    
            const datasetsWithAllScores = pillars.map(pillar => {
                const scores = allLabels.map(label => {
                    const subLabel = pillar.subLabels.find(sub => sub.label === label);
                    if (!subLabel) return 0;
    
                    let totalPercentage = 0;
                    const questions = subLabel.questions;
    
                    // Tính trung bình điểm phần trăm của các câu hỏi trong label
                    questions.forEach(questionNum => {
                        const expectedQuestionName = `Câu ${pillar.surveyId}.${questionNum}`;
                        const questionSurvey = data.surveys
                            .find(survey => survey.id === pillar.surveyId)
                            ?.question_survey.find(qs => qs.questions.question_name === expectedQuestionName);
    
                        if (!questionSurvey) {
                            console.log(`Question "${expectedQuestionName}" not found`);
                            return;
                        }
    
                        const question = questionSurvey.questions;
                        const percentageScore = calculateQuestionPercentage(question, data.responses);
                        totalPercentage += percentageScore;
                    });
    
                    const questionCount = questions.length;
                    return questionCount > 0 ? Math.round(totalPercentage / questionCount) : 0;
                });
    
                // Tính điểm trung bình của trụ cột dựa trên weighted_percentage
                let totalPillarScore = 0;
                let totalWeight = 0;
    
                allLabels.forEach((label, index) => {
                    const subLabel = pillar.subLabels.find(sub => sub.label === label);
                    if (!subLabel || scores[index] === 0) return;
    
                    const firstQuestionName = `Câu ${pillar.surveyId}.${subLabel.questions[0]}`;
                    const firstQuestionSurvey = data.surveys
                        .find(survey => survey.id === pillar.surveyId)
                        ?.question_survey.find(qs => qs.questions.question_name === firstQuestionName);
                    const weight = firstQuestionSurvey?.questions.weighted_percentage || 0;
    
                    totalPillarScore += scores[index] * weight;
                    totalWeight += weight;
                });
    
                const average = totalWeight > 0 ? Math.round(totalPillarScore / totalWeight) : 0;
    
                return {
                    label: pillar.name,
                    data: scores, // Điểm của sub-label (0-100%)
                    backgroundColor: pillar.color,
                    borderColor: pillar.borderColor,
                    borderWidth: 2,
                    pointBackgroundColor: pillar.borderColor,
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: pillar.borderColor,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    average: average, // Điểm trung bình của trụ cột
                };
            });
    
            const labelScores = allLabels.map((label, labelIndex) => {
                const scoresForLabel = datasetsWithAllScores.map(dataset => dataset.data[labelIndex]);
                const maxScore = Math.max(...scoresForLabel);
                return { label, maxScore };
            });
    
            const nonZeroLabels = labelScores
                .filter(item => item.maxScore > 0)
                .map(item => item.label);
    
            if (nonZeroLabels.length === 0) {
                console.log("No non-zero scores found.");
                setChartData(null);
                setPillarAverages([]);
                return;
            }
    
            const filteredDatasets = datasetsWithAllScores.map(dataset => ({
                ...dataset,
                data: allLabels
                    .map((label, index) => ({ label, score: dataset.data[index] }))
                    .filter(item => nonZeroLabels.includes(item.label))
                    .map(item => item.score),
            }));
    
            setChartData({
                labels: nonZeroLabels,
                datasets: filteredDatasets,
            });
    
            setPillarAverages(datasetsWithAllScores.map(dataset => ({
                name: dataset.label,
                average: dataset.average,
                color: dataset.borderColor,
            })));
        } catch (error) {
            console.error("Error fetching chart data:", error.response?.status, error.message);
            setChartData(null);
            setPillarAverages([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (respondent_Institution_Id) {
            fetchChartData();
        }
    }, [respondent_Institution_Id]);

    const chartOptions = {
        scales: {
            r: {
                angleLines: {
                    display: true,
                    color: "rgba(0, 0, 0, 0.1)",
                    lineWidth: 1,
                },
                grid: {
                    color: "rgba(0, 0, 0, 0.1)",
                },
                ticks: {
                    display: true,
                    stepSize: 20,
                    callback: (value) => `${value}%`,
                    font: {
                        size: 12,
                    },
                    color: "#333",
                },
                pointLabels: {
                    font: {
                        size: 8,
                        weight: "bold",
                    },
                    color: (context) => {
                        const label = context.label;
                        const pillar = pillars.find(p => p.subLabels.some(sub => sub.label === label));
                        return pillar ? pillar.borderColor : "#333";
                    },
                },
                suggestedMin: 0,
                suggestedMax: 100,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                titleFont: {
                    size: 14,
                },
                bodyFont: {
                    size: 12,
                },
                titleColor: "#fff",
                bodyColor: "#fff",
                padding: 10,
                cornerRadius: 5,
                callbacks: {
                    label: (context) => {
                        return `${context.dataset.label}: ${context.raw}%`;
                    },
                },
            },
        },
        maintainAspectRatio: false,
    };

    const handleLogout = async () => {
        try {
          await axios.post("/api/logout", {}, { withCredentials: true });
          localStorage.removeItem("respondent");
          router.push("/auth");
        } catch (error) {
          console.error("Lỗi khi đăng xuất:", error);
        }
      };

      return (
        <>
            <style jsx>{`
                @media (max-width: 2048px) {
                    .container-report {
                        padding: 8px;
                        max-height: 100vh;
                        overflow-y: auto;
                        scroll-padding-top: 8px;
                    }
                    .report-content {
                        margin-top: 0;
                        max-height: 100%;
                        overflow-y: auto;
                    }
                }
                @media (max-width: 768px) {
                    .container-report {
                        padding: 8px;
                        max-height: 100vh;
                        overflow-y: auto;
                    }
                    .report-content {
                        min-height: 0;
                    }
                    .pillars-container {
                        max-height: 200px;
                        overflow-y: auto;
                    }
                }
            `}</style>
            <div className="bg-custom-wave bg-cover bg-repeat flex items-start justify-center p-4 container-report">
                <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6 md:p-8 report-content">
                    <h2 className="text-xl md:text-2xl font-bold text-teal-700 mb-6 text-center">
                        Báo cáo khảo sát chuyển đổi số
                    </h2>
    
                    {loading ? (
                        <p className="text-gray-500 text-center">Đang tải dữ liệu...</p>
                    ) : chartData ? (
                        <div className="flex flex-col gap-6">
                            {/* Radar Chart */}
                            <div className="w-full border border-gray-300 rounded-lg shadow-md p-4 bg-gray-50 chart-container">
                                <div className="h-[400px] md:h-[700px]">
                                    <Radar data={chartData} options={chartOptions} />
                                </div>
                            </div>
    
                            {/* Pillars Section */}
                            <div className="w-full bg-gray-100 p-4 rounded-lg pillars-container">
                                <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-4 text-center md:text-left">
                                    Trụ cột
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {pillarAverages.map((pillar, index) => (
                                        <div key={index} className="mb-4">
                                            <div className="flex items-center">
                                                <div
                                                    className="w-4 h-4 rounded-full mr-2"
                                                    style={{ backgroundColor: pillar.color }}
                                                ></div>
                                                <span className="text-xs md:text-sm font-medium text-gray-600">
                                                    {pillar.name}
                                                </span>
                                            </div>
                                            <div className="ml-6 mt-1">
                                                <span className="text-lg font-bold text-gray-800">
                                                    {pillar.average}%
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">Không có dữ liệu để hiển thị.</p>
                    )}
    
                    <button
                        onClick={handleLogout}
                        className="mt-6 w-full md:w-auto inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 print-button"
                    >
                        Đăng xuất
                    </button>
                </div>
            </div>
        </>
    );
}