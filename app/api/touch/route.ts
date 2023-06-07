import { redis } from "@/helpers/upstash";
import { NextRequest } from "next/server";
import countries from "@/helpers/countries.json";

export const revalidate = 5;

export const runtime = "edge";

const MOCK_RESPONSE = {
  totalVisits: 123,
  lastVisitor: {
    country: "CN",
    city: "Chengdu",
    flag: "🇨🇳",
  },
};

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return new Response(JSON.stringify(MOCK_RESPONSE));
  }

  const lastVisitor = await redis.get(redis.KEY_LAST_VISITOR);

  const geo = request.geo;

  if (geo) {
    const country = geo.country;
    const city = geo.city;

    const countryInfo = countries.find((x) => x.cca2 === country);
    if (countryInfo) {
      const flag = countryInfo.flag;
      await redis.set(redis.KEY_LAST_VISITOR, { country, city, flag });
    }
  }

  return new Response(
    JSON.stringify({
      totalVisits: await redis.incr(redis.KEY_TOTAL_VISITS),
      lastVisitor: lastVisitor ?? MOCK_RESPONSE.lastVisitor,
    })
  );
}
