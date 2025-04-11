'use client';
import { useState, useContext } from 'react';
import QuestionList from './QuestionList';
import QuestionForm from './QuestionForm';

export default function QuestionManagement() {
    const [currentView, setCurrentView] = useState('list'); // list, edit, view
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Quản lý câu hỏi</h1>

            {currentView === 'list' ? (
                <div className="bg-white rounded-lg shadow p-6">
                    <QuestionList setCurrentView={setCurrentView} setSelectedQuestion={setSelectedQuestion} />
                </div>
            ) : (
                <QuestionForm
                    currentView={currentView}
                    setCurrentView={setCurrentView}
                    selectedQuestion={selectedQuestion}
                />
            )}
        </div>
    );
}