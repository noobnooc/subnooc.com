import { NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import countries from "@/helpers/countries.json";

export const revalidate = 5;

export const runtime = "edge";

const KEY_LAST_VISITOR = "last-visitor";
const KEY_TOTAL_VISITS = "total-visits";
const KEY_ONLINE = (id: string) => `online-visitor:${id}`;

const MOCK_RESPONSE = {
  totalVisits: 123,
  onlineCount: 1,
  lastVisitor: {
    country: "CN",
    city: "Chengdu",
    flag: "🇨🇳",
    timestamp: Date.now(),
  },
};

export async function GET(request: NextRequest) {
  const { env, cf } = getRequestContext();

  // Last visitor info
  const lastVisitor = await env.KV.get<{
    country: string;
    city: string;
    flag: string;
    timestamp: number;
  }>(KEY_LAST_VISITOR, "json");

  if (cf) {
    const country = cf.country as string | undefined;
    const city = cf.city as string | undefined;
    const countryInfo = countries.find((x) => x.cca2 === country);
    const flag = countryInfo?.flag;
    await env.KV.put(
      KEY_LAST_VISITOR,
      JSON.stringify({ country, city, flag, timestamp: Date.now() })
    );
  }

  // Online visitors count
  const existedVisitorId = request.cookies.get("visitor-id")?.value;
  const visitorId = existedVisitorId ?? crypto.randomUUID();
  await env.KV.put(KEY_ONLINE(visitorId), "online", {
    expirationTtl: 30 * 60,
  });
  const onlineVisitorsCount =
    (await env.KV.list({ prefix: "online-visitor" })).keys.length ?? 1;

  // Total visits count
  const totalVisitsString = await env.KV.get(KEY_TOTAL_VISITS);
  const totalVisits = totalVisitsString ? parseInt(totalVisitsString) : 0;
  const nextTotalVisits = totalVisits + 1;
  await env.KV.put(KEY_TOTAL_VISITS, JSON.stringify(totalVisits + 1));

  // Response
  return Response.json(
    {
      totalVisits: nextTotalVisits,
      lastVisitor: lastVisitor ?? MOCK_RESPONSE.lastVisitor,
      onlineCount: onlineVisitorsCount,
    },
    {
      headers: !existedVisitorId
        ? { "Set-Cookie": `visitor-id=${visitorId}; Path=/; HttpOnly` }
        : {},
    }
  );
}
