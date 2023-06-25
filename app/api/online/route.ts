export const runtime = "edge";

export const revalidate = 5;

export async function GET(request: Request) {
  const resp = await fetch(
    `https://vercel.com/api/web/insights/realtime?projectId=${process.env.projectId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
      },
      next: {
        revalidate: 5,
      },
    }
  );

  return resp;
}
