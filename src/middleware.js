// src/middleware.js
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret');

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // LOG DE DIAGNÓSTICO: Mostra cada rota que o middleware está processando
  console.log(`[Middleware] Processando rota: ${pathname}`);

  const sessionToken = request.cookies.get('sessionToken')?.value;

  // Rotas que queremos proteger
  const protectedRoutes = ['/usuario', '/chat'];

  if (protectedRoutes.some(path => pathname.startsWith(path))) {
    if (!sessionToken) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    try {
      await jwtVerify(sessionToken, SECRET);
      return NextResponse.next();
    } catch (err) {
      console.log("[Middleware] Token inválido, redirecionando para login.");
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Configuração para definir em quais rotas o middleware deve rodar
// CORREÇÃO: Garantindo que as rotas raiz também sejam protegidas
export const config = {
  matcher: ['/usuario/:path*', '/usuario', '/chat/:path*', '/chat'],
};
