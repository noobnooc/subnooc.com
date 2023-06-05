import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { ModeToggle } from "@/components/mode-toggle";
import icon from "./icon.png";
import { Online } from "@/components/online";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "主观世界",
  description: "走出唯一真理观",
  authors: {
    name: "Nooc",
    url: "https://nooc.ink",
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
      "application/rss+xml": "https://subjective.world/rss.xml",
    },
  },
  keywords: [
    "主观世界",
    "Subjective World",
    "Nooc",
    "Blog",
    "博客",
    "个人博客",
    "独立博客",
    "读书",
    "感想",
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="zh">
      <body
        className={`antialiased relative min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="max-w-2xl mx-auto py-10 px-4">
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
                  <span className="text-lg ml-2 font-bold">主观世界</span>
                </Link>
                <nav className="flex items-center ml-auto text-sm font-medium space-x-6">
                  <Link className="no-underline" href="/">
                    博客
                  </Link>
                  <Link className="no-underline" href="/about">
                    关于
                  </Link>
                  <ModeToggle />
                </nav>
              </div>
            </header>
            <main>{children}</main>
            <footer className="flex flex-col items-center justify-center my-6">
              <nav className="text-sm font-medium space-x-6 my-2">
                <Link href="https://nooc.ink">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="inline w-4 h-4 mr-1"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  主页
                </Link>
                <Link href="https://twitter.com/noobnooc">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="inline h-4 w-4 mr-1"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                  Twitter
                </Link>
                <a href="/rss.xml">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="inline h-4 w-4 mr-1"
                  >
                    <path d="M4 11a9 9 0 0 1 9 9"></path>
                    <path d="M4 4a16 16 0 0 1 16 16"></path>
                    <circle cx="5" cy="19" r="1"></circle>
                  </svg>
                  RSS
                </a>
              </nav>
              <Online className="mt-5" />
              <div className="opacity-50 text-sm mt-2">
                &copy; {new Date().getFullYear()} 主观世界
              </div>
            </footer>
          </div>

          <div
            className="hidden sm:block absolute pointer-events-none bg-fixed top-0 right-0 bottom-0 left-0 bg-repeat opacity-[0.03]"
            style={{
              backgroundImage: "url(/background.png)",
              backgroundSize: "360px 360px",
            }}
          />

          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
