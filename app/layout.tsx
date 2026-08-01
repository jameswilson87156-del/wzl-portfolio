import type { Metadata } from "next";
import MotionController from "./_components/MotionController";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wzl8.top"),
  title: {
    default: "王震龙 · Java 后端 / AI 应用开发作品集",
    template: "%s · 王震龙",
  },
  description:
    "面向 Java 后端 / AI 应用开发实习的证据优先工程作品集。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "王震龙 · Java 后端 / AI 应用开发作品集",
    description: "把业务问题，做成可验证的工程系统。",
    url: "/",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "王震龙 Java 后端与 AI 应用开发作品集",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "王震龙 · Java 后端 / AI 应用开发作品集",
    description: "把业务问题，做成可验证的工程系统。",
    images: ["/og.jpg"],
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
