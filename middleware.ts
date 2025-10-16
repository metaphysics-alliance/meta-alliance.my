import { NextRequest, NextResponse } from 'next/server'

const SUPPORTED = new Set(['EN', 'CN'])
const DEFAULT_LOCALE = 'EN'

export function middleware(req: NextRequest){
  const { pathname } = req.nextUrl
  if (pathname.startsWith('/_next') || pathname.includes('.')){
    return NextResponse.next()
  }
  const segments = pathname.split('/').filter(Boolean)
  const candidate = segments[0]?.toUpperCase()
  if (candidate && SUPPORTED.has(candidate)){
    if (candidate !== segments[0]){
      const url = req.nextUrl.clone()
      segments[0] = candidate
      url.pathname = `/${segments.join('/')}` || '/'
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }
  const url = req.nextUrl.clone()
  url.pathname = `/${DEFAULT_LOCALE}${pathname.startsWith('/') ? pathname : `/${pathname}`}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
