import type { Metadata } from "next";
import ProjectCase from "../_components/ProjectCase";
import { projectBySlug } from "../../portfolio-data";
import { siteUrl } from "../../site-config";

export const metadata: Metadata = {
  title: { absolute: "CommerceFlow AI Mall｜Java 后端业务系统" },
  description:
    "围绕商品、订单、库存和 AI 商品助手的 Java 业务系统，展示分层设计、状态流转、数据一致性和前后端联调。",
  alternates: { canonical: siteUrl("/projects/commerceflow/") },
  openGraph: {
    title: "CommerceFlow AI Mall｜Java 后端业务系统",
    description:
      "围绕商品、订单、库存和 AI 商品助手的 Java 业务系统，展示分层设计、状态流转、数据一致性和前后端联调。",
    url: siteUrl("/projects/commerceflow/"),
    type: "website",
    images: [siteUrl("/og.jpg")],
  },
  twitter: {
    card: "summary_large_image",
    title: "CommerceFlow AI Mall｜Java 后端业务系统",
    description:
      "围绕商品、订单、库存和 AI 商品助手的 Java 业务系统，展示分层设计、状态流转、数据一致性和前后端联调。",
    images: [siteUrl("/og.jpg")],
  },
};

export default function CommerceFlowCase() {
  return <ProjectCase project={projectBySlug.commerceflow} />;
}
