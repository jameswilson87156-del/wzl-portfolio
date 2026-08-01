import type { Metadata } from "next";
import MotionController from "./_components/MotionController";
import { SITE_CONFIG } from "./site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.origin),
  title: {
    default: "王震龙｜Java 全栈与 AI 应用开发作品集",
    template: "%s · 王震龙",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          跳到主要内容
        </a>
        <MotionController />
        {children}
      </body>
    </html>
  );
}
