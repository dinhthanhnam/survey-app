'use client';
import React from 'react';
import Header from './components/Header';
import Body from './components/Body';
import { useRef } from 'react';

export default function SurveyPage() {
    const surveyContainerRef = useRef(null);

    const scrollToTop = () => {
        if (surveyContainerRef.current) {
            surveyContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    return (
        <div className="min-h-screen bg-custom-wave bg-cover bg-repeat flex items-center justify-center p-4 sm:pt-8 sm:pb-8">
            <div
                ref={surveyContainerRef}
                className="w-full sm:w-[90%] md:w-[80%] lg:w-3/5 mx-auto bg-white shadow-lg rounded-lg sm:p-6 md:p-8 max-h-screen overflow-y-auto pb-32"
            >
                <Header />
                <Body scrollToTop={scrollToTop} />
            </div>
        </div>
    );
}
