import type { ReactNode } from "react";
import type { ScreenshotFrameKind } from "../../portfolio-data";

export default function ScreenshotFrame({
  children,
  className = "",
  frameKind,
  label,
  transitionName,
}: {
  children: ReactNode;
  className?: string;
  frameKind: ScreenshotFrameKind;
  label: string;
  transitionName?: string;
}) {
  return (
    <span
      className={`screenshot-frame screenshot-frame--${frameKind} ${className}`}
      data-screenshot-frame={frameKind}
      data-screenshot-state="ready"
      data-view-transition={transitionName}
      data-reveal="screenshot-frame"
    >
      <span className="screenshot-frame-glow" aria-hidden="true" />
      <span className="screenshot-windowbar" aria-hidden="true">
        <span className="screenshot-window-dots"><i /><i /><i /></span>
        <span>{label}</span>
      </span>
      <span className="screenshot-frame-media">{children}</span>
    </span>
  );
}
