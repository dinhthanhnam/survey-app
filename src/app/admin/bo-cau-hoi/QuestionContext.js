'use client';
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const QuestionContext = createContext({
    questions: [],
    loading: false,
    currentPage: 1,
    totalPages: 8, // Hardcoded in default value
    fetchQuestions: () => Promise.resolve(), // Default no-op async function
    updateQuestion: () => Promise.resolve(false), // Default no-op async function returning false
    setCurrentPage: (value) => {},
});

export const QuestionProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    // Hardcode 8 surveys
    const totalPages = 8;

    const fetchQuestions = async () => {
        console.log(`[fetchQuestions] Starting fetch for survey_id: ${currentPage}`);
        try {
            setLoading(true);
            const response = await axios.get('/api/question', {
                params: {
                    survey_id: currentPage, // Use currentPage as survey_id (1 to 8)
                },
            });
            console.log('[fetchQuestions] API response:', response.data);
            setQuestions(response.data || []);
        } catch (error) {
            console.error('[fetchQuestions] Error:', error.message, error.response?.data);
            setQuestions([]);
        } finally {
            setLoading(false);
            console.log('[fetchQuestions] Fetch complete, loading:', false);
        }
    };

    useEffect(() => {
        console.log('[useEffect] Triggered with currentPage:', currentPage);
        fetchQuestions();
    }, [currentPage]); // Depend on currentPage directly

    const updateQuestion = async (questionId, formData) => {
        try {
            console.log(`[updateQuestion] Updating question ${questionId} with data:`, formData);
            await axios.put(`/api/question/${questionId}`, formData);
            await fetchQuestions();
            return true;
        } catch (error) {
            console.error('[updateQuestion] Error:', error.message, error.response?.data);
            return false;
        }
    };

    return (
        <QuestionContext.Provider
            value={{
                questions,
                loading,
                currentPage,
                totalPages,
                fetchQuestions,
                updateQuestion,
                setCurrentPage,
            }}
        >
            {children}
        </QuestionContext.Provider>
    );
};