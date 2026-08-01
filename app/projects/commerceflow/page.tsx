import type { Metadata } from "next";
import ProjectCase from "../_components/ProjectCase";
import { projectBySlug } from "../../portfolio-data";
import { siteUrl } from "../../site-config";

export const metadata: Metadata = {
  title: "CommerceFlow AI Mall · 项目案例",
  description: "订单、库存、幂等与事实驱动 AI 客服的工程案例。",
  alternates: { canonical: siteUrl("/projects/commerceflow/") },
  openGraph: {
    title: "CommerceFlow AI Mall · 项目案例",
    description: "订单、库存、幂等与事实驱动 AI 客服的工程案例。",
    url: siteUrl("/projects/commerceflow/"),
    type: "website",
    images: [siteUrl("/og.jpg")],
  },
  twitter: {
    card: "summary_large_image",
    title: "CommerceFlow AI Mall · 项目案例",
    description: "订单、库存、幂等与事实驱动 AI 客服的工程案例。",
    images: [siteUrl("/og.jpg")],
  },
};

export default function CommerceFlowCase() {
  return <ProjectCase project={projectBySlug.commerceflow} />;
}
