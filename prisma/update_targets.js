import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateQuestionTargets() {
    // Danh sách câu hỏi cho từng nhóm
    const leader = [
        'Câu 1.1',
        'Câu 1.3',
        'Câu 1.4',
        'Câu 1.5',
        'Câu 1.7',
        'Câu 1.8',
        'Câu 1.9',
        'Câu 1.10',
        'Câu 1.11',
        'Câu 2.1',
        'Câu 2.2',
        'Câu 2.7',
        'Câu 2.9',
        'Câu 2.11',
        'Câu 2.12',
        'Câu 3.1',
        'Câu 3.2',
        'Câu 3.4',
        'Câu 3.5',
        'Câu 3.6',
        'Câu 3.7',
        'Câu 3.9',
        'Câu 3.13',
        'Câu 4.1',
        'Câu 4.2',
        'Câu 4.5',
        'Câu 4.6',
        'Câu 4.7',
        'Câu 4.8',
        'Câu 4.13',
        'Câu 4.14',
        'Câu 4.14.1',
        'Câu 4.14.2',
        'Câu 4.14.3',
        'Câu 4.14.4',
        'Câu 4.14.5',
        'Câu 4.14.6',
        'Câu 4.14.7',
        'Câu 4.14.8',
        'Câu 4.14.9',
        'Câu 4.14.10',
        'Câu 4.14.11',
        'Câu 5.1',
        'Câu 5.2',
        'Câu 5.3',
        'Câu 5.4',
        'Câu 5.5',
        'Câu 5.6',
        'Câu 5.8',
        'Câu 5.9',
        'Câu 6.1',
        'Câu 6.2',
        'Câu 6.3',
        'Câu 6.8',
        'Câu 6.9',
        'Câu 6.10',
        'Câu 7.1',
        'Câu 7.2',
        'Câu 7.3',
        'Câu 7.4',
        'Câu 7.6',
        'Câu 7.7',
        'Câu 8.1',
        'Câu 8.2',
        'Câu 8.3',
        'Câu 8.4',
        'Câu 8.5',
        'Câu 8.6',
        'Câu 8.7',
        'Câu 8.8',
    ];

    const staff = [
        'Câu 1.1',
        'Câu 1.2',
        'Câu 1.3',
        'Câu 1.4',
        'Câu 1.5',
        'Câu 1.6',
        'Câu 1.10',
        'Câu 1.11',
        'Câu 1.12',
        'Câu 2.3',
        'Câu 2.4',
        'Câu 2.5',
        'Câu 2.6',
        'Câu 2.10',
        'Câu 2.11',
        'Câu 2.12',
        'Câu 2.13',
        'Câu 2.14',
        'Câu 2.14.1',
        'Câu 2.14.2',
        'Câu 2.14.3',
        'Câu 2.14.4',
        'Câu 2.14.5',
        'Câu 2.14.6',
        'Câu 2.14.7',
        'Câu 2.14.8',
        'Câu 3.3',
        'Câu 3.8',
        'Câu 3.10',
        'Câu 3.11',
        'Câu 3.12',
        'Câu 4.1',
        'Câu 4.2',
        'Câu 4.3',
        'Câu 4.4',
        'Câu 4.5',
        'Câu 4.7',
        'Câu 4.8',
        'Câu 4.9',
        'Câu 4.10',
        'Câu 4.11',
        'Câu 4.12',
        'Câu 4.13',
        'Câu 4.14',
        'Câu 4.14.1',
        'Câu 4.14.2',
        'Câu 4.14.3',
        'Câu 4.14.4',
        'Câu 4.14.5',
        'Câu 4.14.6',
        'Câu 4.14.7',
        'Câu 4.14.8',
        'Câu 4.14.9',
        'Câu 4.14.10',
        'Câu 4.14.11',
        'Câu 5.1',
        'Câu 5.2',
        'Câu 5.3',
        'Câu 5.4',
        'Câu 5.5',
        'Câu 5.7',
        'Câu 5.9',
        'Câu 5.10',
        'Câu 5.10.1',
        'Câu 5.10.2',
        'Câu 5.10.3',
        'Câu 5.10.4',
        'Câu 5.11',
        'Câu 5.12',
        'Câu 5.13',
        'Câu 5.14',
        'Câu 6.2',
        'Câu 6.4',
        'Câu 6.7',
        'Câu 6.11',
        'Câu 7.2',
        'Câu 7.5',
    ];

    // Xác định các câu có mặt ở cả hai nhóm => question_target = null
    const general = leader.filter((q) => staff.includes(q));

    // Cập nhật nhóm "Lãnh đạo & Quản lý"
    await prisma.questions.updateMany({
        where: {
            question_name: { in: leader.filter((q) => !general.includes(q)) },
        },
        data: { question_target: ['Lãnh đạo & Quản lý'] },
    });

    // Cập nhật nhóm "Cán bộ nghiệp vụ"
    await prisma.questions.updateMany({
        where: {
            question_name: { in: staff.filter((q) => !general.includes(q)) },
        },
        data: { question_target: ['Cán bộ nghiệp vụ'] },
    });

    // Cập nhật nhóm chung cả hai về null
    await prisma.questions.updateMany({
        where: { question_name: { in: general } },
        data: { question_target: null },
    });
    await prisma.questions.updateMany({
        where: {
            question_name: {
                in: ['Câu 1.13', 'Câu 1.14', 'Câu 6.5', 'Câu 6.6', 'Câu 7.8'],
            },
        },
        data: { question_target: null },
    });

    console.log('✅ Cập nhật question_target thành công!');
}

updateQuestionTargets()
    .catch((e) => console.error('❌ Lỗi:', e))
    .finally(async () => {
        await prisma.$disconnect();
    });
