import { NextResponse } from 'next/server';
import { verifyToken } from '@/utils/auth';

export async function GET(req) {
    const token = req.cookies.get('token')?.value;
    console.log('Token received:', token);

    if (!token) {
        console.log('No token provided');
        return new NextResponse('No token provided', { status: 401 });
    }

    try {
        const user = await verifyToken(token);
        console.log('User decoded:', user);
        if (user.auth_status === 'admin') {
            console.log('Authorized admin');
            return new NextResponse('Authorized', { status: 200 });
        }
        console.log('Insufficient permissions');
        return new NextResponse('Insufficient permissions', { status: 403 });
    } catch (error) {
        console.error('Verify error:', error.message);
        return new NextResponse('Invalid token', { status: 401 });
    }
}