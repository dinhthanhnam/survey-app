import { NextResponse } from 'next/server';
import { verifyToken } from '@/utils/auth';

export async function GET(req) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return new NextResponse('No token provided', { status: 401 });
    }

    try {
        const user = await verifyToken(token);
        if (user.auth_status === 'admin') {
            return new NextResponse('Authorized', { status: 200 });
        }
        return new NextResponse('Insufficient permissions', { status: 403 });
    } catch (error) {
        return new NextResponse('Invalid token', { status: 401 });
    }
}