'use client';
import { useState, useContext } from 'react';
import { Save, X } from 'lucide-react';
import { QuestionContext } from './QuestionContext';

export default function QuestionForm({ currentView, setCurrentView, selectedQuestion }) {
    const { questions, updateQuestion } = useContext(QuestionContext);
    const isView = currentView === 'view';
    const isGroup = selectedQuestion?.question_type === 'group';

    const [formData, setFormData] = useState({
        question_name: selectedQuestion?.question_name || '',
        question_text: selectedQuestion?.question_text || '',
        question_note: selectedQuestion?.question_note || '',
        question_type: selectedQuestion?.question_type || 'radiogroup',
        question_target: selectedQuestion?.question_target || [],
        parent_id: selectedQuestion?.parent_id || null,
        belongs_to_pillar: selectedQuestion?.belongs_to_pillar || 1,
        weighted_percentage: selectedQuestion?.weighted_percentage || 0,
        question_options: selectedQuestion?.question_options || [],
    });

    const targetOptions = ['Cán bộ nghiệp vụ', 'Giám đốc', 'Nhân viên'];
    const pillarOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleTargetChange = (e) => {
        const value = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData((prev) => ({
            ...prev,
            question_target: value,
        }));
    };

    const updateOption = (optionId, field, value) => {
        setFormData((prev) => ({
            ...prev,
            question_options: prev.question_options.map((opt) =>
                opt.id === optionId
                    ? { ...opt, [field]: field === 'require_reason' ? (value ? 1 : 0) : value }
                    : opt
            ),
        }));
    };

    const handleSubmit = async () => {
        const success = await updateQuestion(selectedQuestion.id, formData);
        if (success) {
            setCurrentView('list');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                    {currentView === 'edit' ? 'Chỉnh sửa câu hỏi' : 'Chi tiết câu hỏi'}
                </h2>
                <div className="flex space-x-2">
                    {!isView && (
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                        >
                            <Save size={16} className="mr-1" /> Lưu
                        </button>
                    )}
                    <button
                        onClick={() => setCurrentView('list')}
                        className="bg-gray-300 px-4 py-2 rounded flex items-center"
                    >
                        <X size={16} className="mr-1" /> Đóng
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Mã câu hỏi</label>
                        {isView ? (
                            <p className="p-2 border rounded bg-gray-50">{formData.question_name}</p>
                        ) : (
                            <input
                                type="text"
                                name="question_name"
                                value={formData.question_name}
                                onChange={handleFormChange}
                                className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                                disabled={isView}
                            />
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Nội dung câu hỏi</label>
                        {isView ? (
                            <p className="p-2 border rounded bg-gray-50">{formData.question_text}</p>
                        ) : (
                            <textarea
                                name="question_text"
                                value={formData.question_text}
                                onChange={handleFormChange}
                                className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                                rows={3}
                                disabled={isView}
                            />
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Ghi chú</label>
                        {isView ? (
                            <p className="p-2 border rounded bg-gray-50">{formData.question_note || '—'}</p>
                        ) : (
                            <textarea
                                name="question_note"
                                value={formData.question_note || ''}
                                onChange={handleFormChange}
                                className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                                rows={2}
                                disabled={isView}
                            />
                        )}
                    </div>
                </div>

                <div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Loại câu hỏi</label>
                        {isView ? (
                            <p className="p-2 border rounded bg-gray-50">{formData.question_type}</p>
                        ) : (
                            <select
                                name="question_type"
                                value={formData.question_type}
                                onChange={handleFormChange}
                                className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                                disabled={isView}
                            >
                                <option value="group">Group</option>
                                <option value="radiogroup">Radio Group</option>
                                <option value="checkbox">Checkbox</option>
                            </select>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Đối tượng</label>
                        {isView ? (
                            <p className="p-2 border rounded bg-gray-50">{formData.question_target?.join(', ') || '—'}</p>
                        ) : (
                            <select
                                name="question_target"
                                multiple
                                value={formData.question_target || []}
                                onChange={handleTargetChange}
                                className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                                size={3}
                                disabled={isView}
                            >
                                {targetOptions.map((target) => (
                                    <option key={target} value={target}>
                                        {target}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Thuộc trụ cột</label>
                            {isView ? (
                                <p className="p-2 border rounded bg-gray-50">{formData.belongs_to_pillar}</p>
                            ) : (
                                <select
                                    name="belongs_to_pillar"
                                    value={formData.belongs_to_pillar}
                                    onChange={handleFormChange}
                                    className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                                    disabled={isView}
                                >
                                    {pillarOptions.map((pillar) => (
                                        <option key={pillar} value={pillar}>
                                            {pillar}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Trọng số (%)</label>
                            {isView ? (
                                <p className="p-2 border rounded bg-gray-50">
                                    {formData.weighted_percentage !== null ? formData.weighted_percentage : '—'}
                                </p>
                            ) : (
                                <input
                                    type="number"
                                    name="weighted_percentage"
                                    value={formData.weighted_percentage !== null ? formData.weighted_percentage : ''}
                                    onChange={handleFormChange}
                                    step="0.00001"
                                    className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                                    disabled={isView}
                                />
                            )}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Câu hỏi cha</label>
                        {isView ? (
                            <p className="p-2 border rounded bg-gray-50">
                                {formData.parent_id
                                    ? questions.find((q) => q.id === formData.parent_id)?.question_name || formData.parent_id
                                    : 'Không có'}
                            </p>
                        ) : (
                            <select
                                name="parent_id"
                                value={formData.parent_id || ''}
                                onChange={handleFormChange}
                                className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                                disabled={isView}
                            >
                                <option value="">Không có</option>
                                {questions
                                    .filter((q) => q.question_type === 'group' && q.id !== selectedQuestion?.id)
                                    .map((q) => (
                                        <option key={q.id} value={q.id}>
                                            {q.question_name} - {q.question_text}
                                        </option>
                                    ))}
                            </select>
                        )}
                    </div>
                </div>
            </div>

            {!isGroup && (
                <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Các lựa chọn</h3>
                    {formData.question_options.length === 0 ? (
                        <p className="text-gray-500 italic">Chưa có lựa chọn nào</p>
                    ) : (
                        <div className="border rounded overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Giá trị
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nội dung
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Yêu cầu lý do
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ghi chú
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Trọng số
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {formData.question_options.map((option, index) => (
                                    <tr key={option.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            {isView ? (
                                                option.option_value
                                            ) : (
                                                <input
                                                    type="number"
                                                    value={option.option_value}
                                                    onChange={(e) =>
                                                        updateOption(option.id, 'option_value', parseInt(e.target.value, 10))
                                                    }
                                                    className="w-16 p-1 border rounded"
                                                />
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            {isView ? (
                                                option.option_text
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={option.option_text}
                                                    onChange={(e) => updateOption(option.id, 'option_text', e.target.value)}
                                                    className="w-full p-1 border rounded"
                                                />
                                            )}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            {isView ? (
                                                option.require_reason ? 'Có' : 'Không'
                                            ) : (
                                                <input
                                                    type="checkbox"
                                                    checked={!!option.require_reason}
                                                    onChange={(e) => updateOption(option.id, 'require_reason', e.target.checked)}
                                                    className="h-4 w-4"
                                                />
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            {isView ? (
                                                option.option_note || '—'
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={option.option_note || ''}
                                                    onChange={(e) => updateOption(option.id, 'option_note', e.target.value)}
                                                    className="w-full p-1 border rounded"
                                                />
                                            )}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            {isView ? (
                                                option.weighted_value !== null ? option.weighted_value : '—'
                                            ) : (
                                                <input
                                                    type="number"
                                                    value={option.weighted_value !== null ? option.weighted_value : ''}
                                                    onChange={(e) =>
                                                        updateOption(
                                                            option.id,
                                                            'weighted_value',
                                                            e.target.value === '' ? null : parseInt(e.target.value, 10)
                                                        )
                                                    }
                                                    className="w-16 p-1 border rounded"
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}