"use client";

import type { ProjectImage } from "../../portfolio-data";
import ImageViewer from "./ImageViewer";

export default function ProjectScreenshot({
  image,
  images,
  index,
  projectSlug,
  projectTitle,
}: {
  image: ProjectImage;
  images: ProjectImage[];
  index: number;
  projectSlug: string;
  projectTitle: string;
}) {
  return (
    <ImageViewer
      image={image}
      images={images}
      initialIndex={index}
      label={projectTitle}
      transitionName={`project-${projectSlug}-screenshot-${index + 1}`}
    />
  );
}
