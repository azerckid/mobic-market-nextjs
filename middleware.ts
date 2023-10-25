import {
  NextFetchEvent,
  NextRequest,
  NextResponse,
  userAgent,
} from "next/server";

export const middleware = (req: NextRequest, ev: NextFetchEvent) => {
  if (userAgent(req).isBot) {
    // 새로운 error 화면을 만들고 그쪽으로 rewrite 시켜줄것
    return new Response("plz don't be a bot,be human");
  }
  if (!req.url.includes("/api")) {
    if (
      !req.cookies.has("mobic-market-session") &&
      !req.url.includes("/enter")
    ) {
      req.nextUrl.searchParams.set("from", req.nextUrl.pathname);
      req.nextUrl.pathname = "/enter";
      return NextResponse.redirect(req.nextUrl);
    }
  }
  // console.log(req.geo?.region);
};

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
