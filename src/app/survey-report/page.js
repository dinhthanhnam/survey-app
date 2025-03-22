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

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function SurveyReport({ }) {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pillarAverages, setPillarAverages] = useState([]);
    const [respondentId, setRespondentId] = useState(null);

    useEffect(() => {
        const respondentData = localStorage.getItem('respondent');
        if (respondentData) {
            const respondent = JSON.parse(respondentData);
            setRespondentId(respondent.id);
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
                { label: "Hệ thống \nlưu trữ dữ liệu", questions: [2] },
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
                { label: "Mức độ hợp tác với các tổ chức công nghệ", questions: [10] },
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
                { label: "Lộ trình & Hiệu quả đầu tư", questions: [8] },
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
                "/api/survey/review",
                { respondent_id: respondentId },
                { withCredentials: true }
            );

            const data = response.data;
            console.log("Survey Data for Chart:", data);

            if (!data.surveys || !data.responses) {
                throw new Error("Dữ liệu từ API không đầy đủ: Thiếu surveys hoặc responses");
            }

            // Flatten all sub-labels for the radar chart
            const allLabels = pillars.flatMap(pillar => pillar.subLabels.map(sub => sub.label));

            // Calculate scores for each sub-label
            const datasetsWithAllScores = pillars.map(pillar => {
                const scores = allLabels.map(label => {
                    const subLabel = pillar.subLabels.find(sub => sub.label === label);
                    if (!subLabel) return 0; // If the label doesn't belong to this pillar, score is 0

                    let totalScore = 0;
                    const questions = subLabel.questions;

                    console.log(`Calculating score for sub-label "${subLabel.label}" in survey ${pillar.surveyId}`);

                    questions.forEach(questionNum => {
                        // Construct the expected question_name (e.g., "Câu 1.2" for survey 1, question 2)
                        const expectedQuestionName = `Câu ${pillar.surveyId}.${questionNum}`;

                        const questionSurvey = data.surveys
                            .find(survey => survey.id === pillar.surveyId)
                            ?.question_survey.find(qs => qs.questions.question_name === expectedQuestionName);

                        if (!questionSurvey) {
                            console.log(`Question "${expectedQuestionName}" not found in survey ${pillar.surveyId}`);
                            return;
                        }

                        const question = questionSurvey.questions;
                        const weightedPercentage = question.weighted_percentage || 0;
                        const questionType = question.question_type;

                        const maxWeightedValue = Math.max(
                            ...question.question_options.map(opt => opt.weighted_value || 0)
                        );

                        // Find user responses for this question
                        const userAnswers = data.responses?.filter(
                            response => response.question_id === question.id
                        );

                        if (!userAnswers || userAnswers.length === 0 || maxWeightedValue === 0) {
                            console.log(`No responses or maxWeightedValue is 0 for question "${expectedQuestionName}"`);
                            return;
                        }

                        let weightedValue = 0;

                        if (questionType === "radiogroup") {
                            // For radiogroup, there should be only one answer
                            const userAnswer = userAnswers[0];
                            const selectedOption = question.question_options.find(
                                opt => opt.id === userAnswer.question_option_id
                            );
                            weightedValue = selectedOption?.weighted_value || 0;
                            console.log(`Radiogroup question "${expectedQuestionName}": weightedValue = ${weightedValue}`);
                        } else if (questionType === "checkbox") {
                            // For checkbox, calculate the average weighted_value of selected options
                            const selectedOptions = userAnswers.map(answer =>
                                question.question_options.find(
                                    opt => opt.id === answer.question_option_id
                                )
                            );
                            const totalWeightedValue = selectedOptions.reduce(
                                (sum, opt) => sum + (opt?.weighted_value || 0),
                                0
                            );
                            weightedValue = selectedOptions.length > 0
                                ? totalWeightedValue / selectedOptions.length
                                : 0;
                            console.log(`Checkbox question "${expectedQuestionName}": weightedValue = ${weightedValue} (average of ${selectedOptions.length} options)`);
                        }

                        if (weightedPercentage && weightedValue !== undefined) {
                            const questionScore = (weightedValue * weightedPercentage) / maxWeightedValue;
                            totalScore += questionScore;
                            console.log(`Question "${expectedQuestionName}": score = ${questionScore}, totalScore = ${totalScore}`);
                        }
                    });

                    const maxPossibleScore = questions.reduce((sum, questionNum) => {
                        const expectedQuestionName = `Câu ${pillar.surveyId}.${questionNum}`;
                        const questionSurvey = data.surveys
                            .find(survey => survey.id === pillar.surveyId)
                            ?.question_survey.find(qs => qs.questions.question_name === expectedQuestionName);
                        const percentage = questionSurvey?.questions.weighted_percentage || 0;
                        console.log(`Max possible score for "${expectedQuestionName}": weighted_percentage = ${percentage}`);
                        return sum + percentage;
                    }, 0);

                    const finalScore = maxPossibleScore > 0
                        ? Math.round((totalScore / maxPossibleScore) * 100)
                        : 0;

                    console.log(`Final score for sub-label "${subLabel.label}" in survey ${pillar.surveyId}: ${finalScore}%`);

                    return finalScore;
                });

                // Calculate the average score for this pillar (before filtering)
                const pillarScores = scores.filter(score => score > 0); // Only non-zero scores
                const average = pillarScores.length > 0
                    ? Math.round(pillarScores.reduce((sum, score) => sum + score, 0) / pillarScores.length)
                    : 0;

                return {
                    label: pillar.name,
                    data: scores,
                    backgroundColor: pillar.color,
                    borderColor: pillar.borderColor,
                    borderWidth: 2,
                    pointBackgroundColor: pillar.borderColor,
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: pillar.borderColor,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    average: average, // Store the average for the sidebar
                };
            });

            // Identify labels with non-zero scores across all datasets
            const labelScores = allLabels.map((label, labelIndex) => {
                const scoresForLabel = datasetsWithAllScores.map(dataset => dataset.data[labelIndex]);
                const maxScore = Math.max(...scoresForLabel);
                return { label, maxScore };
            });

            const nonZeroLabels = labelScores
                .filter(item => item.maxScore > 0)
                .map(item => item.label);

            // Log excluded labels
            const excludedLabels = labelScores
                .filter(item => item.maxScore === 0)
                .map(item => item.label);
            console.log("Excluded labels (score 0 across all datasets):", excludedLabels);

            // If no labels have non-zero scores, set chartData to null
            if (nonZeroLabels.length === 0) {
                console.log("No labels have non-zero scores. Chart will not be rendered.");
                setChartData(null);
                setPillarAverages([]);
                return;
            }

            // Filter the datasets to only include data for non-zero labels
            const filteredDatasets = datasetsWithAllScores.map(dataset => {
                const filteredData = allLabels
                    .map((label, index) => ({ label, score: dataset.data[index] }))
                    .filter(item => nonZeroLabels.includes(item.label))
                    .map(item => item.score);
                return {
                    ...dataset,
                    data: filteredData,
                };
            });

            // Set the chart data with filtered labels and datasets
            setChartData({
                labels: nonZeroLabels,
                datasets: filteredDatasets,
            });

            // Set the pillar averages for the sidebar
            setPillarAverages(datasetsWithAllScores.map(dataset => ({
                name: dataset.label,
                average: dataset.average,
                color: dataset.borderColor,
            })));

        } catch (error) {
            console.error("Error fetching chart data:", error);
            setChartData(null);
            setPillarAverages([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (respondentId) {
            fetchChartData();
        }
    }, [respondentId]);

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
                        size: 10, // Smaller font size to fit more labels
                        weight: "bold",
                    },
                    color: "#333",
                },
                suggestedMin: 0,
                suggestedMax: 100,
            },
        },
        plugins: {
            legend: {
                display: false, // Hide the legend since pillars are in the sidebar
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

    return (
        <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center sm:text-left">
                Báo cáo khảo sát chuyển đổi số
            </h2>

            {loading ? (
                <p className="text-gray-500 text-center">Đang tải dữ liệu...</p>
            ) : chartData ? (
                <div className="flex flex-col sm:flex-row gap-6">
                    {/* Sidebar for Pillars */}
                    <div className="w-full sm:w-1/4 bg-gray-100 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            Trụ cột
                        </h3>
                        {pillarAverages.map((pillar, index) => (
                            <div key={index} className="mb-4">
                                <div className="flex items-center">
                                    <div
                                        className="w-4 h-4 rounded-full mr-2"
                                        style={{ backgroundColor: pillar.color }}
                                    ></div>
                                    <span className="text-sm font-medium text-gray-600">
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

                    {/* Radar Chart */}
                    <div className="w-full sm:w-3/4 border border-gray-300 rounded-lg shadow-md p-4 bg-gray-50">
                        <div style={{ height: "600px" }}>
                            <Radar data={chartData} options={chartOptions} />
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-gray-500 text-center">Không có dữ liệu để hiển thị.</p>
            )}
            <a
                href="/"
                className="mt-4 inline-block bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
            >
                Quay về trang chủ
            </a>
        </div>
    );
}