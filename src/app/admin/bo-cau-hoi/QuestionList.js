'use client';
import React, { useContext, useState } from 'react';
import { Eye, Edit, ChevronDown, ChevronRight } from 'lucide-react';
import { QuestionContext } from './QuestionContext';

export default function QuestionList({ setCurrentView, setSelectedQuestion }) {
    const { questions, loading, currentPage, totalPages, setCurrentPage } = useContext(QuestionContext);
    const [expandedGroups, setExpandedGroups] = useState({});

    const toggleGroup = (groupId) => {
        setExpandedGroups((prev) => ({
            ...prev,
            [groupId]: !prev[groupId],
        }));
    };

    const groupedQuestions = questions.reduce((acc, question) => {
        if (question.parent_id === null) {
            acc.push({
                ...question,
                children: questions.filter((q) => q.parent_id === question.id),
            });
        }
        return acc;
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) {
        return <div className="text-center p-6">Đang tải...</div>;
    }

    if (groupedQuestions.length === 0) {
        return (
            <div className="text-center p-6 text-gray-500">
                Không có câu hỏi nào cho survey này
            </div>
        );
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                            Mã câu hỏi
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/6">
                            Nội dung
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                            Loại
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                            Trụ cột
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                            Thao tác
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {groupedQuestions.map((question) => (
                        <React.Fragment key={question.id}>
                            <tr className={question.question_type === 'group' ? 'bg-blue-50' : 'bg-white'}>
                                <td className="px-4 py-3">
                                    <div className="flex items-center">
                                        {question.question_type === 'group' && (
                                            <button
                                                onClick={() => toggleGroup(question.id)}
                                                className="mr-1 text-gray-500 hover:text-gray-700"
                                            >
                                                {expandedGroups[question.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                            </button>
                                        )}
                                        {question.question_name}
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="line-clamp-2">{question.question_text}</div>
                                </td>
                                <td className="px-4 py-3">
                    <span
                        className={`px-2 py-1 text-xs rounded-full ${
                            question.question_type === 'group'
                                ? 'bg-blue-100 text-blue-800'
                                : question.question_type === 'radiogroup'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-purple-100 text-purple-800'
                        }`}
                    >
                      {question.question_type}
                    </span>
                                </td>
                                <td className="px-4 py-3">{question.belongs_to_pillar}</td>
                                <td className="px-4 py-3 text-right space-x-2">
                                    <button
                                        onClick={() => {
                                            setSelectedQuestion(question);
                                            setCurrentView('view');
                                        }}
                                        className="text-gray-500 hover:text-gray-700"
                                        title="Xem"
                                    >
                                        <Eye size={16} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedQuestion(question);
                                            setCurrentView('edit');
                                        }}
                                        className="text-blue-500 hover:text-blue-700"
                                        title="Sửa"
                                    >
                                        <Edit size={16} />
                                    </button>
                                </td>
                            </tr>

                            {question.question_type === 'group' &&
                                expandedGroups[question.id] &&
                                question.children.map((child) => (
                                    <tr key={child.id} className="bg-gray-50">
                                        <td className="px-4 py-3 pl-8">{child.question_name}</td>
                                        <td className="px-4 py-3">
                                            <div className="line-clamp-2">{child.question_text}</div>
                                        </td>
                                        <td className="px-4 py-3">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          {child.question_type}
                        </span>
                                        </td>
                                        <td className="px-4 py-3">{child.belongs_to_pillar}</td>
                                        <td className="px-4 py-3 text-right space-x-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedQuestion(child);
                                                    setCurrentView('view');
                                                }}
                                                className="text-gray-500 hover:text-gray-700"
                                                title="Xem"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedQuestion(child);
                                                    setCurrentView('edit');
                                                }}
                                                className="text-blue-500 hover:text-blue-700"
                                                title="Sửa"
                                            >
                                                <Edit size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded ${
                            currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
                        }`}
                    >
                        Survey {page}
                    </button>
                ))}
            </div>
        </div>
    );
}