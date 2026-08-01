import type { Metadata } from "next";
import ProjectCase from "../_components/ProjectCase";
import { projectBySlug } from "../../portfolio-data";
import { siteUrl } from "../../site-config";

export const metadata: Metadata = {
  title: "Enterprise Ticket RAG Copilot · 项目案例",
  description:
    "Keyword retrieval、Citation、synthetic failed cases 与 Human Review 的工程案例。",
  alternates: { canonical: siteUrl("/projects/ticket/") },
  openGraph: {
    title: "Enterprise Ticket RAG Copilot · 项目案例",
    description:
      "Keyword retrieval、Citation、synthetic failed cases 与 Human Review 的工程案例。",
    url: siteUrl("/projects/ticket/"),
    type: "website",
    images: [siteUrl("/og.jpg")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise Ticket RAG Copilot · 项目案例",
    description:
      "Keyword retrieval、Citation、synthetic failed cases 与 Human Review 的工程案例。",
    images: [siteUrl("/og.jpg")],
  },
};

export default function TicketCase() {
  return <ProjectCase project={projectBySlug.ticket} />;
}
