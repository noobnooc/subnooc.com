import { NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import countries from "@/helpers/countries.json";

export const revalidate = 5;

export const runtime = "edge";

const KEY_LAST_VISITOR = "last-visitor";
const KEY_TOTAL_VISITS = "total-visits";
const KEY_ONLINE = (id: string) => `online-visitor:-${id}`;

const MOCK_RESPONSE = {
  totalVisits: 123,
  onlineCount: 1,
  lastVisitor: {
    country: "CN",
    city: "Chengdu",
    flag: "🇨🇳",
  },
};

export async function GET(request: NextRequest) {
  const { env } = getRequestContext();

  // Last visitor info
  const lastVisitor = await env.KV.get<{
    country: string;
    city: string;
    flag: string;
  }>(KEY_LAST_VISITOR, "json");

  if (request.cf) {
    const country = request.cf.country as string | undefined;
    const city = request.cf.city as string | undefined;
    const countryInfo = countries.find((x) => x.cca2 === country);
    if (countryInfo) {
      const flag = countryInfo.flag;
      await env.KV.put(
        KEY_LAST_VISITOR,
        JSON.stringify({ country, city, flag })
      );
    }
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
  return new Response(
    JSON.stringify({
      totalVisits: nextTotalVisits,
      lastVisitor: lastVisitor ?? MOCK_RESPONSE.lastVisitor,
      onlineCount: onlineVisitorsCount,
    }),
    {
      headers: !existedVisitorId
        ? { "Set-Cookie": `visitor-id=${visitorId}` }
        : {},
    }
  );
}
