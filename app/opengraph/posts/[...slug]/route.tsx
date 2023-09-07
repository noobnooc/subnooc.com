import { allPosts } from "@/.contentlayer/generated";
import { notFound } from "next/navigation";
import { ImageResponse, NextRequest } from "next/server";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 1600,
  height: 900,
};
export const contentType = "image/png";

interface PostContext {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostContext["params"]) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }

  return post;
}

// Image generation
export async function GET(request: NextRequest, { params }: PostContext) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  const font = await fetch(
    new URL("/fonts/Exo2-Bold.ttf", request.url).href
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        tw="flex font-serif"
        style={{
          fontFamily: "ZH",
        }}
      >
        {post.title}
        {post.date}
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "ZH",
          data: font,
          weight: 300,
          style: "normal",
        },
      ],
    }
  );
}
