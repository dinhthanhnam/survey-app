const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Dữ liệu cho credit_funds
    const creditFundsData = [
        { name: 'Credit Fund A', identity_code: 'CF-A001' },
        { name: 'Credit Fund B', identity_code: 'CF-B002' },
        { name: 'Credit Fund C', identity_code: 'CF-C003' },
    ];

    // Thêm dữ liệu vào bảng credit_funds
    for (const creditFund of creditFundsData) {
        await prisma.credit_funds.create({
            data: creditFund,
        });
    }

    // Dữ liệu cho surveys
    const surveysData = [
        { survey_title: 'Survey 1 test', survey_description: 'description 1', show_questions_number: 'onPage', credit_fund_id: 1},
        { survey_title: 'Survey 2 test', survey_description: 'description 2', show_questions_number: 'onPage', credit_fund_id: 2},
        { survey_title: 'Survey 3 test', survey_description: 'description 3', show_questions_number: 'onPage', credit_fund_id: 3},
    ];

    // Thêm dữ liệu vào bảng surveys
    for (const survey of surveysData) {
        await prisma.surveys.create({
            data: survey,
        });
    }

    // Dữ liệu cho respondents
    const respondentsData = [
        { name: 'John Doe', email: 'john.doe@example.com', credit_fund_id: 1 },
        { name: 'Jane Smith', email: 'jane.smith@example.com', credit_fund_id: 2 },
        { name: 'Alice Johnson', email: 'alice.johnson@example.com', credit_fund_id: 3 },
    ];

    // Thêm dữ liệu vào bảng respondents
    for (const respondent of respondentsData) {
        await prisma.respondents.create({
            data: respondent,
        });
    }
    // Dữ liệu cho questions
    const questionsData = [
        { question_text: 'Ban thich mau gi?',
            question_name: 'preference',
            question_note: 'Mau yeu thich cua ban',
            question_type: 'radiogroup',
            question_options: [
                {option_text: 'mau xanh'},
                {option_text: 'mau do'},
                {option_text: 'mau vang'},
                {option_text: 'mau cam'},
            ]
        },
        { question_text: 'Ban thich dong vat gi?',
            question_name: 'preference',
            question_note: 'Dong vat yeu thich cua ban',
            question_type: 'checkbox',
            question_options: [
                {option_text: 'cho'},
                {option_text: 'meo'},
                {option_text: 'ga'},
                {option_text: 'chuot'},
            ]
        },
        { question_text: 'Ban nghi sao ve HVNH?',
            question_name: 'opinion',
            question_note: 'Trinh bay suy nghi ve giang vien, cung nhu sinh vien, csvc',
            question_type: 'text'
        },
    ];

    for (const question of questionsData) {
        const createdQuestion = await prisma.questions.create({
            data: {
                question_name: question.question_name,
                question_text: question.question_text,
                question_note: question.question_note,
                question_type: question.question_type,
            },
        });

        if (question.question_options && question.question_options.length > 0) {
            const optionsData = question.question_options.map((option) => ({
                option_text: option.option_text,
                question_id: createdQuestion.id,
            }));

            // Tạo tất cả question_options liên quan đến câu hỏi trong 1 lần
            await prisma.question_options.createMany({
                data: optionsData,
            });
        }
    }

    const questionSurveyData = [
        { survey_id: 1, question_id: 1},
        { survey_id: 1, question_id: 2},
        { survey_id: 1, question_id: 3},
        { survey_id: 2, question_id: 1},
        { survey_id: 2, question_id: 3},
        { survey_id: 3, question_id: 2},
        { survey_id: 3, question_id: 3},
    ];

    // Thêm dữ liệu vào bảng respondents
    for (const questionSurvey of questionSurveyData) {
        await prisma.question_survey.create({
            data: questionSurvey,
        });
    }

    console.log('Seeding completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
