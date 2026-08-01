"use client";

/* Original evidence files are mounted only after the dialog opens. */
/* eslint-disable @next/next/no-img-element */

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { ProjectImage } from "../../portfolio-data";
import ScreenshotFrame from "./ScreenshotFrame";

type ViewerMode = "fit" | "actual";
type ViewerState = "closed" | "open" | "closing";
type ViewerDirection = "none" | "previous" | "next";

export default function ImageViewer({
  image,
  images,
  initialIndex,
  label,
  transitionName,
}: {
  image: ProjectImage;
  images: ProjectImage[];
  initialIndex: number;
  label: string;
  transitionName: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLAnchorElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mode, setMode] = useState<ViewerMode>("fit");
  const [viewerState, setViewerState] = useState<ViewerState>("closed");
  const [direction, setDirection] = useState<ViewerDirection>("none");
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const instanceId = useId().replaceAll(":", "");
  const titleId = `image-viewer-title-${instanceId}`;
  const current = openIndex === null ? null : images[openIndex];
  const currentOriginalSrc = current?.originalSrc ?? null;

  const isOpen = openIndex !== null;

  useLayoutEffect(() => {
    const container = imageContainerRef.current;
    if (!container || !isOpen || currentOriginalSrc === null) return;
    container.scrollTo({ left: 0, top: 0, behavior: "auto" });
  }, [currentOriginalSrc, isOpen, mode]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isOpen) return;
    if (!dialog.open) dialog.showModal();
    document.body.classList.add("image-viewer-open");
    return () => document.body.classList.remove("image-viewer-open");
  }, [isOpen]);

  useEffect(() => () => {
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
  }, []);

  const close = () => {
    const dialog = dialogRef.current;
    if (!dialog?.open || viewerState === "closing") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      dialog.close();
      return;
    }
    setViewerState("closing");
    closeTimerRef.current = window.setTimeout(() => dialog.close(), 140);
  };

  const restoreFocus = () => {
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
    setOpenIndex(null);
    setMode("fit");
    setViewerState("closed");
    setDirection("none");
    setLoadedSrc(null);
    window.requestAnimationFrame(() => openerRef.current?.focus({ preventScroll: true }));
  };

  const move = (offset: number) => {
    setDirection(offset < 0 ? "previous" : "next");
    setLoadedSrc(null);
    setOpenIndex((index) => {
      if (index === null) return initialIndex;
      return (index + offset + images.length) % images.length;
    });
    setMode("fit");
  };

  return (
    <>
      <a
        className="screenshot-link"
        href={image.originalSrc}
        onClick={(event) => {
          event.preventDefault();
          openerRef.current = event.currentTarget;
          setMode("fit");
          setViewerState("open");
          setDirection("none");
          setLoadedSrc(null);
          setOpenIndex(initialIndex);
        }}
      >
        <ScreenshotFrame
          frameKind={image.frameKind}
          label={image.label}
          transitionName={transitionName}
        >
          <img
            src={image.responsiveSrc}
            srcSet={image.responsiveSrcSet}
            sizes={image.sizes}
            alt={image.alt}
            width={image.width}
            height={image.height}
            decoding="async"
            loading="lazy"
            style={{ objectPosition: image.objectPosition }}
          />
        </ScreenshotFrame>
        <span className="screenshot-entry-row">
          <span className="screenshot-entry-meta" aria-hidden="true">
            <strong>{image.label}</strong>
            <small>{image.width} × {image.height} px</small>
          </span>
          <span className="screenshot-open-label">
            VIEW ORIGINAL <span className="sr-only">· {label} 真实运行截图</span>
            <span aria-hidden="true"> →</span>
          </span>
        </span>
      </a>
      <dialog
        className="image-viewer"
        ref={dialogRef}
        aria-modal="true"
        aria-labelledby={titleId}
        data-viewer-mode={mode}
        data-viewer-state={viewerState}
        data-viewer-direction={direction}
        onClose={restoreFocus}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (images.length < 2) return;
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
        }}
      >
        <div className="image-viewer-panel">
          <div className="image-viewer-head">
            <div>
              <span>{current?.label ?? "REAL RUN SCREENSHOT"}</span>
              <strong id={titleId}>{label}</strong>
              {current ? <small>{current.width} × {current.height} px</small> : null}
            </div>
            <button type="button" onClick={close} aria-label="关闭截图查看器">
              CLOSE <span aria-hidden="true">×</span>
            </button>
          </div>
          {current ? (
            <div
              className={`image-viewer-image image-viewer-image--${mode}`}
              ref={imageContainerRef}
              aria-busy={loadedSrc !== current.originalSrc}
            >
              <img
                key={current.originalSrc}
                className={loadedSrc === current.originalSrc ? "is-loaded" : ""}
                src={current.originalSrc}
                alt={current.alt}
                width={current.width}
                height={current.height}
                decoding="async"
                onLoad={() => setLoadedSrc(current.originalSrc)}
              />
            </div>
          ) : null}
          <div className="image-viewer-controls">
            {images.length > 1 ? (
              <button type="button" onClick={() => move(-1)} aria-label="上一张截图">← PREV</button>
            ) : <span />}
            <div className="image-viewer-mode" role="group" aria-label="图片缩放模式">
              <button type="button" className={mode === "fit" ? "is-active" : ""} onClick={() => setMode("fit")}>FIT</button>
              <button type="button" className={mode === "actual" ? "is-active" : ""} onClick={() => setMode("actual")}>100%</button>
            </div>
            {images.length > 1 ? (
              <button type="button" onClick={() => move(1)} aria-label="下一张截图">NEXT →</button>
            ) : <span />}
          </div>
        </div>
      </dialog>
    </>
  );
}
