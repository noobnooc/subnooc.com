import { redis } from "@/helpers/upstash";
import { NextRequest } from "next/server";
import countries from "@/helpers/countries.json";

export const revalidate = 5;

export const runtime = "edge";

export type Visitor = {
  country: string;
  city: string | undefined;
  flag: string | undefined;
};

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

  const [lastVisitor, currentVisitor] = await redis.mget<Visitor[]>(
    redis.KEY_LAST_VISITOR,
    redis.KEY_CURRENT_VISITOR
  );

  if (currentVisitor) {
    await redis.set(redis.KEY_LAST_VISITOR, currentVisitor);
  }

  return new Response(
    JSON.stringify({
      totalVisits: await redis.incr(redis.KEY_TOTAL_VISITS),
      lastVisitor: lastVisitor ?? MOCK_RESPONSE.lastVisitor,
    })
  );
}
