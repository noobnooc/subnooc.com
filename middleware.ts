import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { redis } from "./helpers/upstash";
import { Visitor } from "./app/api/touch/route";
import countries from "@/helpers/countries.json";

export function middleware(request: NextRequest) {
  const isTouching = request.nextUrl.pathname.startsWith("/api/touch");

  if (isTouching && request.geo && request.geo.country) {
    const visitor: Visitor = {
      country: request.geo.country,
      city: request.geo.city,
      flag: countries.find((x) => x.cca2 === request.geo!.country)?.flag,
    };

    redis.set(redis.KEY_CURRENT_VISITOR, visitor);
  }

  return NextResponse.next();
}
