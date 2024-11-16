import { notFound } from "next/navigation";
import { posts } from ".velite";

import { Metadata } from "next";
import { PostInfo } from "@/components/post-info";
import { QRCodeSVG } from "qrcode.react";
import { fillKeywords } from "@/helpers/keywords";
import classNames from "classnames";

export const runtime = "edge";

interface PostProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getPostFromParams(params: PostProps["params"]) {
  const { slug } = await params;
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    authors: {
      name: "Nooc",
      url: "https://nooc.me",
    },
    openGraph: {
      title: `${post.title} | ${post.description} - 主观世界`,
      description: `${post.description} - 主观世界`,
      images: "/opengraph-image.png",
    },
    twitter: {
      title: `${post.title} | ${post.description} - 主观世界`,
      description: `${post.description} - 主观世界`,
      site: "@noobnooc",
      card: "summary_large_image",
      images: "/twitter-image.png",
    },
    keywords: fillKeywords(["文章", "博客", "博文", ...(post.keywords ?? [])]),
  };
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <article className="py-6 prose dark:prose-invert">
        <h1 className="mb-2 font-serif font-bold">{post.title}</h1>
        <PostInfo className="my-4" post={post} />
        {post.description && (
          <p className="text-md mt-0 opacity-60 text-slate-700 dark:text-slate-200">
            {post.description}
          </p>
        )}
        <hr className="my-4" />
        <div
          className={classNames(
            "prose dark:prose-invert",
            "prose-headings:font-serif prose-headings:mt-8",
            "prose-h1:text-3xl",
            "prose-h2:text-xl",
            "prose-h3:text-lg",
            "prose-blockquote:font-normal",
            "prose-pre:border prose-pre:rounded-xl",
            "before:prose-p:content-none after:prose-p:content-none"
          )}
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </article>
      <a
        className="flex border w-fit items-stretch rounded px-4 py-3 gap-4 my-2 no-underline"
        href="https://apps.apple.com/us/app/%E6%98%9F%E7%81%AB%E8%AE%B0-%E5%BF%AB%E9%80%9F%E8%AE%B0%E5%BD%95%E4%BD%A0%E7%9A%84%E7%81%B5%E6%84%9F/id6480926767?l=zh-Hans-CN"
        target="_blank"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 flex-shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
          />
        </svg>
        <div>
          <h1 className="font-bold">星火记</h1>
          <p>
            星火记是一个短笔记应用，可以随时随地记录你的灵感、短笔记。也可以用来记录稍后阅读和日记等。所有的数据均存储在设备本地，可以选择开启
            iCloud 同步。
          </p>
        </div>
      </a>
      <hr className="my-4" />
      <span>
        如果你喜欢这一篇文章
        <br />
        可以分享到&nbsp;
        <a
          href={`https://twitter.com/share?text=${encodeURIComponent(
            `《${post.title}》这篇文章还不错 @noobnooc`
          )}&url=${encodeURIComponent(`https://subnooc.com${post.slug}`)}`}
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="inline h-4 w-4 mr-1"
          >
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
          </svg>
          Twitter
        </a>
        <br />
        或者微信扫描二维码打赏一个
      </span>
      <div className="flex border w-fit items-stretch rounded px-4 py-3 gap-4 my-2">
        <QRCodeSVG
          className="w-20 h-20"
          value={
            post.wechatLink ?? "http://weixin.qq.com/r/dEgsNJnEhcT6rd1X9x1m"
          }
          bgColor="transparent"
          fgColor="currentColor"
        />
        <div className="flex flex-col items-stretch justify-between">
          <div className="flex items-center gap-2">
            <svg
              className="h-6 w-6"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <title>WeChat</title>
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z" />
            </svg>
            微信公众号
          </div>

          <div className="flex items-center gap-1 rounded border py-1 px-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            主观世界
          </div>
        </div>
      </div>
      <hr className="my-4" />
    </div>
  );
}
