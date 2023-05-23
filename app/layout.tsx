import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { ModeToggle } from "@/components/mode-toggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Subjective World",
  description: "My subjective world",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
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
                    主页
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
                <Link href="https://twitter.com/noobnooc">Twitter</Link>
                <Link href="https://nooc.ink">个人网站</Link>
              </nav>
              <div className="opacity-50 font-medium">
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
