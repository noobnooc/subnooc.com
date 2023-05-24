import Link from "next/link";
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { ModeToggle } from "@/components/mode-toggle";

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
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="zh">
      <body
        className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="max-w-2xl mx-auto py-10 px-4">
            <header>
              <div className="flex items-center justify-between">
                <ModeToggle />
                <nav className="ml-auto text-sm font-medium space-x-6">
                  <Link className="no-underline" href="/">
                    博客
                  </Link>
                  <Link className="no-underline" href="/about">
                    关于
                  </Link>
                </nav>
              </div>
            </header>
            <main>{children}</main>
            <footer className="flex flex-col items-center justify-center my-15">
              <nav className="text-sm font-medium space-x-6 my-2">
                <Link href="https://nooc.ink">作者主页</Link>
                <Link href="https://twitter.com/noobnooc">Twitter</Link>
              </nav>
              <div className="opacity-50 text-sm">
                &copy; {new Date().getFullYear()} 主观世界
              </div>
            </footer>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
