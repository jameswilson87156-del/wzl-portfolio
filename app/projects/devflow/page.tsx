import type { Metadata } from "next";
import ProjectCase from "../_components/ProjectCase";
import { projectBySlug } from "../../portfolio-data";
import { siteUrl } from "../../site-config";

export const metadata: Metadata = {
  title: "DevFlow Copilot · 项目案例",
  description:
    "Prompt Version、Provider Router、Tool Call、Run Evidence 与 Review 的工程案例。",
  alternates: { canonical: siteUrl("/projects/devflow/") },
  openGraph: {
    title: "DevFlow Copilot · 项目案例",
    description:
      "Prompt Version、Provider Router、Tool Call、Run Evidence 与 Review 的工程案例。",
    url: siteUrl("/projects/devflow/"),
    type: "website",
    images: [siteUrl("/og.jpg")],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevFlow Copilot · 项目案例",
    description:
      "Prompt Version、Provider Router、Tool Call、Run Evidence 与 Review 的工程案例。",
    images: [siteUrl("/og.jpg")],
  },
};

export default function DevFlowCase() {
  return <ProjectCase project={projectBySlug.devflow} />;
}
