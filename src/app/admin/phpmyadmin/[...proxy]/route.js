import { NextResponse } from 'next/server';
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();

export async function GET(req, { params }) {
    return new Promise((resolve, reject) => {
        proxy.web(req, { resolve, reject }, {
            target: 'http://127.0.0.1/phpmyadmin',
            changeOrigin: true,
            pathRewrite: { '^/admin/phpmyadmin': '' },
        });
    });
}

export async function POST(req, { params }) {
    return new Promise((resolve, reject) => {
        proxy.web(req, { resolve, reject }, {
            target: 'http://127.0.0.1/phpmyadmin',
            changeOrigin: true,
            pathRewrite: { '^/admin/phpmyadmin': '' },
        });
    });
}