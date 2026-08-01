import type { Metadata } from "next";
import ProjectCase from "../_components/ProjectCase";
import { projectBySlug } from "../../portfolio-data";

export const metadata: Metadata = {
  title: "DevFlow Copilot · 项目案例",
  description:
    "Prompt Version、Provider Router、Tool Call、Run Evidence 与 Review 的工程案例。",
  alternates: { canonical: "/projects/devflow/" },
  openGraph: {
    title: "DevFlow Copilot · 项目案例",
    description:
      "Prompt Version、Provider Router、Tool Call、Run Evidence 与 Review 的工程案例。",
    url: "/projects/devflow/",
    type: "website",
    images: ["/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevFlow Copilot · 项目案例",
    description:
      "Prompt Version、Provider Router、Tool Call、Run Evidence 与 Review 的工程案例。",
    images: ["/og.jpg"],
  },
};

export default function DevFlowCase() {
  return <ProjectCase project={projectBySlug.devflow} />;
}
