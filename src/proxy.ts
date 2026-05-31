import { NextResponse } from "next/server"
import { auth } from "@/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnAdminPanel = req.nextUrl.pathname.startsWith("/admin")
  const isOnLoginPage = req.nextUrl.pathname === "/admin/login"

  if (isOnAdminPanel && !isOnLoginPage) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/login", req.nextUrl))
    }
  }

  if (isOnLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}