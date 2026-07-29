import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "王震龙 · AI 应用开发作品集",
  description: "面向 AI 应用开发、Java 全栈与 Agent 工程实习的作品集。",
  openGraph: {
    title: "王震龙 · AI 应用开发作品集",
    description: "面向 AI 应用开发、Java 全栈与 Agent 工程实习的作品集。",
    images: ["/og-portfolio.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
