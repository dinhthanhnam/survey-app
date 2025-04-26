// app/admin/phpmyadmin/route.js

import { createProxyMiddleware } from 'http-proxy-middleware';
import { NextRequest } from 'next/server';

const target = 'http://127.0.0.1'; // phpMyAdmin chạy ở đây

// export mọi method, Next.js sẽ gọi tương ứng
export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const DELETE = handleProxy;
export const PATCH = handleProxy;
export const HEAD = handleProxy;
export const OPTIONS = handleProxy;

async function handleProxy(req) {
    const { pathname, search } = new URL(req.url);

    const proxyRes = await fetch(`${target}${pathname.replace('/admin', '')}${search}`, {
        method: req.method,
        headers: filterHeaders(req.headers),
        body: req.method === 'GET' || req.method === 'HEAD' ? undefined : req.body,
        redirect: 'manual',
    });

    const resHeaders = {};
    proxyRes.headers.forEach((v, k) => resHeaders[k] = v);

    return new Response(proxyRes.body, {
        status: proxyRes.status,
        headers: resHeaders,
    });
}

function filterHeaders(headers) {
    const newHeaders = new Headers(headers);
    newHeaders.delete('host');
    newHeaders.delete('x-forwarded-for');
    return newHeaders;
}
