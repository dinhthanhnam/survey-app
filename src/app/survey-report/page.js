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

export default function SurveyReport({}) {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pillarAverages, setPillarAverages] = useState([]);
    const [pillars, setPillars] = useState([]); // Lưu pillars để dùng cho màu nhãn
    const [respondent_Institution_Id, setRespondent_Institution_Id] = useState(null);
    const [institutionName, setInstitutionName] = useState("");
    const [respondents, setRespondents] = useState([]);
    const [canShowChart, setCanShowChart] = useState(false);
    const router = useRouter();

    // Hard-coded colors for pillars
    const pillarColors = [
        { color: "rgba(255, 147, 96, 0.2)", borderColor: "rgba(255, 147, 96, 1)" }, // Orange
        { color: "rgba(255, 105, 180, 0.2)", borderColor: "rgba(255, 105, 180, 1)" }, // Pink
        { color: "rgba(54, 162, 235, 0.2)", borderColor: "rgba(54, 162, 235, 1)" }, // Blue
        { color: "rgba(75, 192, 192, 0.2)", borderColor: "rgba(75, 192, 192, 1)" }, // Green
        { color: "rgba(153, 102, 255, 0.2)", borderColor: "rgba(153, 102, 255, 1)" }, // Purple
        { color: "rgba(255, 206, 86, 0.2)", borderColor: "rgba(255, 206, 86, 1)" }, // Yellow// Red
        { color: "rgba(54, 54, 54, 0.2)", borderColor: "rgba(54, 54, 54, 1)" }, // Gray 
        { color: "rgba(0, 0, 139, 0.2)", borderColor: "rgba(0, 0, 139, 1)" }, // Dark Blue
        { color: "rgba(128, 0, 0, 0.2)", borderColor: "rgba(128, 0, 0, 1)" }, // Maroon
        { color: "rgba(255, 20, 147, 0.2)", borderColor: "rgba(255, 20, 147, 1)" }, // Deep Pink
        { color: "rgba(210, 105, 30, 0.2)", borderColor: "rgba(210, 105, 30, 1)" }, // Chocolate
        { color: "rgba(70, 130, 180, 0.2)", borderColor: "rgba(70, 130, 180, 1)" }, // Steel Blue
    ];

    useEffect(() => {
        const respondentData = localStorage.getItem("respondent");
        if (respondentData) {
            const respondent = JSON.parse(respondentData);
            setRespondent_Institution_Id(respondent.institution_id);
        }
    }, []);

    const fetchChartData = async () => {
        try {
            setLoading(true);

            // Fetch data from both APIs
            const [surveyResponse, pillarsResponse] = await Promise.all([
                axios.post("/api/survey/response/institution-response", {
                    institution_id: respondent_Institution_Id,
                }, { withCredentials: true }),
                axios.post("/api/survey/pillars", { withCredentials: true }),
            ]);

            const surveyData = surveyResponse.data;
            const pillarsData = pillarsResponse.data;

            if (!surveyData.surveys || !surveyData.responses || !pillarsData.survey_pillars) {
                throw new Error("Dữ liệu từ API không đầy đủ");
            }

            // Hàm tính điểm cho một câu hỏi
            const calculateQuestionScore = (question, responses, allQuestions) => {
                const questionType = question.question_type;
                const userAnswers = responses.filter(response => response.question_id === question.id);

                if (!userAnswers.length) {
                    console.log(`No responses for question "${question.question_name}"`);
                    return 0;
                }

                let questionScore = 0;

                if (questionType === "radiogroup") {
                    let totalWeightedValue = 0;
                    let responseCount = 0;

                    userAnswers.forEach(answer => {
                        const selectedOption = question.question_options.find(
                            opt => opt.id === answer.question_option_id
                        );
                        totalWeightedValue += selectedOption?.weighted_value || 0;
                        responseCount++;
                    });

                    questionScore = responseCount > 0 ? totalWeightedValue / responseCount : 0;
                } else if (questionType === "checkbox") {
                    let totalWeightedValue = 0;
                    let optionCount = 0;

                    userAnswers.forEach(answer => {
                        const selectedOption = question.question_options.find(
                            opt => opt.id === answer.question_option_id
                        );
                        totalWeightedValue += selectedOption?.weighted_value || 0;
                        optionCount++;
                    });

                    questionScore = optionCount > 0 ? totalWeightedValue / optionCount : 0;
                } else if (questionType === "group") {
                    const childQuestions = allQuestions.filter(q => q.parent_id === question.id);

                    if (!childQuestions.length) {
                        console.log(`No child questions for group "${question.question_name}"`);
                        return 0;
                    }

                    const childScores = childQuestions.map(child =>
                        calculateQuestionScore(child, responses, allQuestions)
                    );
                    questionScore = childScores.length
                        ? childScores.reduce((sum, score) => sum + score, 0) / childScores.length
                        : 0;
                }

                return questionScore * (question.weighted_percentage || 0);
            };

            const allQuestions = surveyData.surveys.flatMap(survey =>
                survey.question_survey.map(qs => qs.questions)
            );

            // Build pillars dynamically
            const pillarsArray = surveyData.surveys.map((survey, index) => {
                const relatedPillars = pillarsData.survey_pillars.filter(p => p.survey_id === survey.id);

                const subLabels = relatedPillars.map(pillar => {
                    const questions = survey.question_survey
                        .filter(qs => qs.questions.belongs_to_pillar === pillar.id)
                        .map(qs => qs.questions);

                    if (questions.length === 0) {
                        return null;
                    }

                    let totalScore = 0;
                    questions.forEach(question => {
                        const questionScore = calculateQuestionScore(question, surveyData.responses, allQuestions);
                        totalScore += questionScore;
                    });

                    const pillarWeightedPercentage = pillar.weighted_percentage || 1;
                    const pillarScore = Math.min(totalScore / pillarWeightedPercentage, 4);
                    const label = pillar.name.length > 40 ? pillar.name.substring(0, 41) + "..." : pillar.name;

                    return {
                        label: label,
                        score: pillarScore,
                        weightedPercentage: pillar.weighted_percentage || 0,
                    };
                }).filter(sub => sub !== null && sub.score > 0);

                let totalSurveyScore = 0;
                subLabels.forEach(subLabel => {
                    totalSurveyScore += subLabel.score * subLabel.weightedPercentage;
                });

                return {
                    name: survey.survey_title,
                    surveyId: survey.id,
                    color: pillarColors[index % pillarColors.length].color,
                    borderColor: pillarColors[index % pillarColors.length].borderColor,
                    subLabels,
                    average: Math.min(totalSurveyScore, 4),
                };
            }).filter(pillar => pillar.subLabels.length > 0);

            if (pillarsArray.length === 0) {
                console.log("No valid pillars found.");
                setChartData(null);
                setPillarAverages([]);
                setPillars([]);
                return;
            }

            setPillars(pillarsArray);

            const allLabels = Array.from(
                new Set(pillarsArray.flatMap(pillar => pillar.subLabels.map(sub => sub.label)))
            );

            const datasets = pillarsArray.map(pillar => {
                const scores = allLabels.map(label => {
                    const subLabel = pillar.subLabels.find(sub => sub.label === label);
                    return subLabel ? subLabel.score : 0;
                });

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
                    average: pillar.average,
                };
            });

            const labelScores = allLabels.map((label, labelIndex) => {
                const scoresForLabel = datasets.map(dataset => dataset.data[labelIndex]);
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
                setPillars([]);
                return;
            }

            const filteredDatasets = datasets.map(dataset => ({
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

            setPillarAverages(pillarsArray.map(pillar => ({
                name: pillar.name,
                average: Number(pillar.average.toFixed(2)),
                color: pillar.borderColor,
            })));
        } catch (error) {
            console.error("Error fetching chart data:", error.response?.status, error.message);
            setChartData(null);
            setPillarAverages([]);
            setPillars([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchInstitutionAndRespondents = async (institutionId) => {
        try {
            const response = await axios.post(
                "/api/survey/response/institution-response",
                { institution_id: institutionId },
                { withCredentials: true }
            );
            const data = response.data;

            if (!data.institution || !data.respondents) {
                throw new Error("Dữ liệu từ API không đầy đủ");
            }

            setInstitutionName(data.institution[0]?.name || "Không xác định");
            const respondentsData = data.respondents.map(respondent => ({
                id: respondent.id,
                name: respondent.name,
                email: respondent.email,
                phone: respondent.phone,
                group: respondent.belong_to_group,
                submissionStatus: respondent.submission_status,
            }));
            setRespondents(respondentsData);

            // Kiểm tra điều kiện: ít nhất 1 cán bộ nghiệp vụ và 1 lãnh đạo quản lý đã nộp
            const submittedStaff = respondentsData.filter(
                r => r.group === "Officer" && r.submissionStatus === "submitted"
            ).length;
            const submittedLeaders = respondentsData.filter(
                r => r.group === "Leader" && r.submissionStatus === "submitted"
            ).length;
            setCanShowChart(submittedStaff >= 1 && submittedLeaders >= 1);
        } catch (error) {
            console.error("Error fetching institution and respondents:", error);
            setInstitutionName("Không xác định");
            setRespondents([]);
            setCanShowChart(false);
        }
    };

    useEffect(() => {
        if (respondent_Institution_Id) {
            fetchChartData();
            fetchInstitutionAndRespondents(respondent_Institution_Id);
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
                    stepSize: 1,
                    callback: (value) => value,
                    font: { size: 12 },
                    color: "#333",
                },
                pointLabels: {
                    font: { size: 10, weight: "bold" },
                     // Tăng từ 8 lên 10 để dễ đọc hơn
                    color: (context) => {
                        const label = context.label;
                        const pillar = pillars.find(p => p.subLabels.some(sub => sub.label === label));
                        return pillar ? pillar.borderColor : "#333"; // Giữ nguyên màu của nhãn
                    },
                },
                suggestedMin: 0,
                suggestedMax: 4,
            },
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                titleFont: { size: 14 },
                bodyFont: { size: 12 },
                titleColor: "#fff",
                bodyColor: "#fff",
                padding: 10,
                cornerRadius: 5,
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.raw.toFixed(2)}`,
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
                    .pillars-container, .respondents-container {
                        max-height: 200px;
                        overflow-y: auto;
                    }
                }
            `}</style>
            <div className="bg-custom-wave bg-cover bg-repeat flex items-start justify-center p-4 container-report">
                <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6 md:p-8 report-content">
                    <h2 className="text-xl md:text-2xl font-bold text-teal-700 mb-6 text-center">
                        Báo cáo chuyển đổi số cho {institutionName}
                    </h2>

                    {/* Danh sách người trả lời */}
                    <div className="w-full bg-gray-100 p-4 rounded-lg mb-6 respondents-container">
                        <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-4 text-center md:text-left">
                            Danh sách người trả lời
                        </h3>
                        {respondents.length > 0 ? (
                            <ul className="list-disc pl-5 text-sm md:text-base text-gray-600">
                                {respondents.map(respondent => (
                                    <li key={respondent.id}>
                                        {respondent.name} ({respondent.email}) - 
                                        {respondent.group === "Leader" ? "Lãnh đạo & Quản lý" : "Cán bộ nghiệp vụ"} - 
                                        <span className={respondent.submissionStatus === "submitted" ? "text-teal-600" : "text-red-600"}>
                                            {respondent.submissionStatus === "submitted" ? "Đã nộp" : "Chưa nộp"}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">Không có dữ liệu người trả lời.</p>
                        )}
                    </div>

                    {loading ? (
                        <p className="text-gray-500 text-center">Đang tải dữ liệu...</p>
                    ) : chartData && canShowChart ? ( // Kiểm tra canShowChart
                        <div className="flex flex-col gap-6">
                            <div className="w-full border border-gray-300 rounded-lg shadow-md p-4 bg-gray-50 chart-container">
                                <div className="h-[400px] md:h-[700px]">
                                    <Radar data={chartData} options={chartOptions} />
                                </div>
                            </div>
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
                                                    {pillar.average}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">
                            {canShowChart
                                ? "Không có dữ liệu để hiển thị."
                                : "Cần ít nhất 1 cán bộ nghiệp vụ và 1 lãnh đạo quản lý đã nộp để hiển thị biểu đồ."}
                        </p>
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