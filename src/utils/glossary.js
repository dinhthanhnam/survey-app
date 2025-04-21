export const glossary = {
    AI: 'AI (Artificial Intelligence): Trí tuệ nhân tạo, mô phỏng trí thông minh con người để xử lý dữ liệu, hỗ trợ ra quyết định tự động',
    Blockchain:
        'Blockchain: Công nghệ chuỗi khối, lưu trữ dữ liệu phân tán đảm bảo minh bạch và bảo mật',
    'Big Data':
        'Big Data: Dữ liệu lớn, tập hợp dữ liệu khổng lồ cần công cụ đặc biệt để xử lý, phân tích',
    RPA: 'RPA (Robotic Process Automation): Tự động hóa quy trình bằng robot phần mềm giúp giảm thiểu thao tác thủ công',
    Fintech:
        'Fintech: Công nghệ tài chính, ứng dụng công nghệ vào dịch vụ tài chính',
    CRM: 'CRM (Customer Relationship Management): Hệ thống quản trị quan hệ khách hàng, giúp theo dõi, quản lý và phân tích dữ liệu khách hàng',
    SLA: 'SLA (Service Level Agreement): Thỏa thuận mức độ dịch vụ giữa nhà cung cấp dịch vụ và khách hàng, đảm bảo cam kết về chất lượng',
    API: 'API (Application Programming Interface): Giao diện lập trình ứng dụng, cho phép các hệ thống phần mềm kết nối và trao đổi dữ liệu với nhau',
    'E-Banking':
        'E-Banking: Ngân hàng điện tử, dịch vụ tài chính thực hiện qua internet',
    'ISO 20022': 'ISO 20022: Tiêu chuẩn quốc tế về trao đổi dữ liệu tài chính',
    'Basel II':
        'Basel II: Bộ quy tắc về quản trị rủi ro tài chính trong lĩnh vực ngân hàng',
    'Basel III':
        'Basel III: Bộ quy tắc về quản trị rủi ro tài chính trong lĩnh vực ngân hàng',
    IFRS: 'IFRS (International Financial Reporting Standards): Chuẩn mực báo cáo tài chính quốc tế',
    DMS: 'DMS (Document Management System): Hệ thống quản lý tài liệu điện tử, hỗ trợ lưu trữ và truy xuất dữ liệu dễ dàng',
    'Payment Hub':
        'Payment Hub: Hệ thống trung tâm thanh toán giúp kết nối và xử lý giao dịch tài chính giữa nhiều bên',
    'Co-opSmart':
        'Co-opSmart: Ứng dụng giáo dục tài chính nội bộ trong hệ thống QTDND',
    'Digital Transformation':
        'Digital Transformation (Chuyển đổi số): Quá trình áp dụng công nghệ vào vận hành, quản lý và cung cấp dịch vụ',
    Core: 'Core: Phần mềm kế toán khách hàng và xử lý giao dịch tập trung có chức năng xử lý các giao dịch của Quỹ diễn ra trong ngày và đẩy các dữ liệu vào máy chủ trung tâm',
    CĐS: 'CĐS (Chuyển đổi số): Quá trình áp dụng công nghệ vào vận hành, quản lý và cung cấp dịch vụ',
};

import { GlossaryTooltip } from '@/app/components/GlossaryTooltip';
export function renderWithGlossary(text) {
    const keys = Object.keys(glossary).sort((a, b) => b.length - a.length);
    const elements = [];
    let remaining = text;

    while (remaining.length > 0) {
        let matched = false;

        for (let key of keys) {
            const escapedKey = escapeRegExp(key);
            const regex = new RegExp(`\\b${escapedKey}\\b`); // ❌ bỏ cờ `i`

            const match = remaining.match(regex);

            if (match && match.index !== undefined) {
                const index = match.index;
                const fullMatch = match[0];
                const before = remaining.slice(0, index);
                const after = remaining.slice(index + fullMatch.length);

                elements.push(before);
                elements.push(
                    <GlossaryTooltip
                        key={elements.length}
                        explanation={glossary[key]}
                    >
                        {fullMatch}
                    </GlossaryTooltip>
                );

                remaining = after;
                matched = true;
                break;
            }
        }

        if (!matched) {
            elements.push(remaining);
            break;
        }
    }

    return elements;
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
