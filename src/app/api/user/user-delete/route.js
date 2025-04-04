import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { respondent_id } = await req.json();
        console.log('Received respondent_id:', respondent_id);

        // Xóa các bản ghi trong Responses trước
        const deletedRespondentresponse = await prisma.responses.deleteMany({
            where: {
                respondent_id: respondent_id,  
            },
        });
        
        const deletedRespondentDuration= await prisma.respondent_duration.deleteMany({
            where: {
                respondent_id: respondent_id,  
            },
        });
        
        const deletedRespondent= await prisma.respondents.deleteMany({
            where: {
                id: respondent_id,  
            },
        });

        return NextResponse.json({ message: 'Deleted successfully', deletedRespondent });
    } catch (error) {
        console.error('❌ Error deleting:', error);
        return NextResponse.json(
            { message: 'Error deleting respondent', error: error.message },
            { status: 500 }
        );
    }
}
