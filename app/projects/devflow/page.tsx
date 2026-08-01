import type { Metadata } from "next";
import ProjectCase from "../_components/ProjectCase";
import { projectBySlug } from "../../portfolio-data";
import { siteUrl } from "../../site-config";

export const metadata: Metadata = {
  title: { absolute: "DevFlow Copilot｜AI 开发工作流工具" },
  description:
    "面向开发工作流的 AI 工具，提供 Provider 路由、Prompt 模板、状态管理、日志诊断和历史记录。",
  alternates: { canonical: siteUrl("/projects/devflow/") },
  openGraph: {
    title: "DevFlow Copilot｜AI 开发工作流工具",
    description:
      "面向开发工作流的 AI 工具，提供 Provider 路由、Prompt 模板、状态管理、日志诊断和历史记录。",
    url: siteUrl("/projects/devflow/"),
    type: "website",
    images: [siteUrl("/og.jpg")],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevFlow Copilot｜AI 开发工作流工具",
    description:
      "面向开发工作流的 AI 工具，提供 Provider 路由、Prompt 模板、状态管理、日志诊断和历史记录。",
    images: [siteUrl("/og.jpg")],
  },
};

export default function DevFlowCase() {
  return <ProjectCase project={projectBySlug.devflow} />;
}
