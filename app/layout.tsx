import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import "./globals.css";
import icon from "./icon.png";
import { Status } from "@/components/status";
import { fillKeywords } from "@/helpers/keywords";

export const runtime = "edge";

export const metadata: Metadata = {
  metadataBase: new URL("https://subnooc.com"),
  title: "主观世界",
  description: "走出唯一真理观",
  applicationName: "主观世界",
  creator: "Nooc",
  publisher: "Nooc",
  appleWebApp: {
    capable: true,
    title: "主观世界",
    statusBarStyle: "black-translucent",
  },
  authors: {
    name: "Nooc",
    url: "https://nooc.me",
  },
  openGraph: {
    title: "主观世界 - 走出唯一真理观",
    description: "Nooc 的主观世界",
  },
  twitter: {
    title: "主观世界 - 走出唯一真理观",
    description: "Nooc 的主观世界",
    site: "@noobnooc",
    card: "summary_large_image",
  },
  alternates: {
    types: {
      "application/rss+xml": "https://subnooc.com/rss.xml",
    },
  },
  keywords: fillKeywords(),
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="zh">
      <body
        className={`bg-[url('/background-light.png')] dark:bg-[url('/background-dark.png')] bg-fixed antialiased relative min-h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50`}
        style={{
          backgroundSize: "360px 360px",
        }}
      >
        <div className="max-w-2xl sm:mx-auto mt-5 mb-20 mx-2 py-10 px-5 sm:px-10 bg-white dark:bg-zinc-900 drop-shadow-lg">
          <header>
            <div className="flex items-center justify-between">
              <Link className="flex items-center no-underline" href="/">
                <Image
                  className="rounded border"
                  src={icon}
                  width={36}
                  height={36}
                  alt="网站图标"
                />
                <span className="hidden sm:inline text-lg ml-2 font-bold">
                  主观世界
                </span>
              </Link>
              <nav className="flex items-center ml-auto text-sm font-medium space-x-6">
                <Link className="no-underline" href="/">
                  博客
                </Link>
                <Link className="no-underline" href="/archive">
                  档案
                </Link>
                <Link className="no-underline" href="/about">
                  关于
                </Link>
              </nav>
            </div>
          </header>
          <main>{children}</main>
          <footer className="flex flex-col items-center justify-center my-4">
            <nav className="text-sm font-medium space-x-6 my-10">
              <a href="https://nooc.me">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="inline w-4 h-4 mr-1"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                主页
              </a>
              <a href="mailto:nooc@nooc.me">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="inline h-4 w-4 mr-1 feather feather-mail"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                邮箱
              </a>
              <a href="https://twitter.com/noobnooc">
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
              <a
                href="https://apps.apple.com/us/app/%E6%98%9F%E7%81%AB%E8%AE%B0-%E5%BF%AB%E9%80%9F%E8%AE%B0%E5%BD%95%E4%BD%A0%E7%9A%84%E7%81%B5%E6%84%9F/id6480926767?l=zh-Hans-CN"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="inline h-4 w-4 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                  />
                </svg>
                星火记
              </a>
              <a href="/rss.xml">
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
                  <path d="M4 11a9 9 0 0 1 9 9"></path>
                  <path d="M4 4a16 16 0 0 1 16 16"></path>
                  <circle cx="5" cy="19" r="1"></circle>
                </svg>
                RSS
              </a>
            </nav>
            <Status className="mt-5" />
            <div className="opacity-50 text-sm self-end mt-5">
              &copy; {new Date().getFullYear()} 主观世界
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
