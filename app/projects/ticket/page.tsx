import type { Metadata } from "next";
import ProjectCase from "../_components/ProjectCase";
import { projectBySlug } from "../../portfolio-data";
import { siteUrl } from "../../site-config";

export const metadata: Metadata = {
  title: { absolute: "Enterprise AI Ticket Copilot｜AI 工单应用" },
  description:
    "面向企业工单处理场景的 AI 应用，串联知识检索、建议生成、人工复核、Trace 和审计流程。",
  alternates: { canonical: siteUrl("/projects/ticket/") },
  openGraph: {
    title: "Enterprise AI Ticket Copilot｜AI 工单应用",
    description:
      "面向企业工单处理场景的 AI 应用，串联知识检索、建议生成、人工复核、Trace 和审计流程。",
    url: siteUrl("/projects/ticket/"),
    type: "website",
    images: [siteUrl("/og.jpg")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise AI Ticket Copilot｜AI 工单应用",
    description:
      "面向企业工单处理场景的 AI 应用，串联知识检索、建议生成、人工复核、Trace 和审计流程。",
    images: [siteUrl("/og.jpg")],
  },
};

export default function TicketCase() {
  return <ProjectCase project={projectBySlug.ticket} />;
}
