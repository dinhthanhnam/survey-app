import { NextResponse } from 'next/server';

export async function GET(req) {
    const url = new URL('http://127.0.0.1/phpmyadmin' + req.nextUrl.pathname.replace('/admin/phpmyadmin', ''));
    const headers = new Headers(req.headers);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
        });

        const body = await response.text();
        return new NextResponse(body, {
            status: response.status,
            headers: response.headers,
        });
    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

export async function POST(req) {
    const url = new URL('http://127.0.0.1/phpmyadmin' + req.nextUrl.pathname.replace('/admin/phpmyadmin', ''));
    const headers = new Headers(req.headers);
    const body = await req.text();

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body,
        });

        const responseBody = await response.text();
        return new NextResponse(responseBody, {
            status: response.status,
            headers: response.headers,
        });
    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}