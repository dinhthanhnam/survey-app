'use client';

import {QuestionProvider} from "@/app/admin/bo-cau-hoi/QuestionContext.js";
import QuestionManagement from "@/app/admin/bo-cau-hoi/QuestionPageLayout.js";

export default function Main() {
    return (
        <QuestionProvider>
            <QuestionManagement />
        </QuestionProvider>
    );
}