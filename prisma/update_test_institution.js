import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 🟢 Thêm một quỹ tín dụng mới
async function addNewInstitution() {
    try {
        const newInstitution = {
            identity_code: '99999999',
            name: 'QTDND HVNH',
        };

        await prisma.institutions.create({
            data: newInstitution,
        });

        console.log(`✅ Đã thêm thành công quỹ: ${newInstitution.name} (identity_code: ${newInstitution.identity_code})`);
    } catch (error) {
        console.error('❌ Lỗi khi thêm quỹ tín dụng:', error);
    }
}

// 🏃‍♂️ Chạy script
async function main() {
    try {
        await addNewInstitution();
        console.log('✅ Hoàn tất cập nhật bảng institutions');
    } catch (error) {
        console.error('❌ Lỗi trong quá trình thực thi:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();