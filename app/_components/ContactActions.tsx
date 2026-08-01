"use client";

import { useEffect, useRef, useState } from "react";

const EMAIL = "467113957@qq.com";
const WECHAT_ID = "ll467113957";
const MAILTO =
  "mailto:467113957@qq.com?subject=%E5%85%B3%E4%BA%8E%20Java%20%E5%90%8E%E7%AB%AF%20%2F%20AI%20%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91%E5%AE%9E%E4%B9%A0%E7%9A%84%E6%B2%9F%E9%80%9A";

function legacyCopy(value: string) {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("copy command failed");
}

export default function ContactActions() {
  const [copyStatus, setCopyStatus] = useState<{
    target: "email" | "wechat";
    message: string;
  } | null>(null);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    },
    [],
  );

  useEffect(() => {
    const media = window.matchMedia(
      "(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)",
    );
    const arrows = Array.from(document.querySelectorAll<HTMLElement>(".contact-external"));
    let frame = 0;
    let active: HTMLElement | null = null;
    let dx = 0;
    let dy = 0;
    const paint = () => {
      frame = 0;
      if (active) active.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const onMove = (event: PointerEvent) => {
      if (!media.matches || window.innerWidth < 1024) return;
      const target = event.currentTarget as HTMLElement;
      const box = target.getBoundingClientRect();
      active = target;
      dx = Math.max(-4, Math.min(4, (event.clientX - box.left - box.width / 2) / 16));
      dy = Math.max(-4, Math.min(4, (event.clientY - box.top - box.height / 2) / 16));
      if (!frame) frame = window.requestAnimationFrame(paint);
    };
    const reset = (event: Event) => {
      (event.currentTarget as HTMLElement).style.transform = "";
      active = null;
    };
    arrows.forEach((arrow) => {
      arrow.addEventListener("pointermove", onMove);
      arrow.addEventListener("pointerleave", reset);
    });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      arrows.forEach((arrow) => {
        arrow.removeEventListener("pointermove", onMove);
        arrow.removeEventListener("pointerleave", reset);
      });
    };
  }, []);

  async function copyText(
    value: string,
    target: "email" | "wechat",
    successMessage: string,
    failureMessage: string,
    feedbackDuration: number,
  ) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        legacyCopy(value);
      }
      setCopyStatus({ target, message: successMessage });
    } catch {
      try {
        legacyCopy(value);
        setCopyStatus({ target, message: successMessage });
      } catch {
        setCopyStatus({ target, message: failureMessage });
      }
    }

    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(
      () => setCopyStatus(null),
      feedbackDuration,
    );
  }

  function copyEmail() {
    return copyText(
      EMAIL,
      "email",
      "邮箱已复制",
      "复制失败，请手动复制。",
      1400,
    );
  }

  function copyWechat() {
    return copyText(
      WECHAT_ID,
      "wechat",
      "微信号已复制，请在微信中搜索添加。",
      "复制失败，请手动复制微信号。",
      1600,
    );
  }

  return (
    <div className="contact-grid" aria-label="联系方式">
      <article className="contact-item">
        <span className="contact-type">EMAIL</span>
        <b className="contact-value">{EMAIL}</b>
        <div className="contact-actions">
          <a href={MAILTO}>
            写邮件<span className="sr-only">给王震龙</span>{" "}
            <span aria-hidden="true">↗</span>
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className={copyStatus?.target === "email" ? "is-copied" : ""}
          >
            复制邮箱
            {copyStatus?.target === "email" ? (
              <span aria-hidden="true"> ✓</span>
            ) : null}
          </button>
        </div>
        <span className="contact-feedback" aria-live="polite">
          {copyStatus?.target === "email" ? copyStatus.message : ""}
        </span>
      </article>

      <article className="contact-item contact-item-wechat">
        <span className="contact-type">WECHAT</span>
        <b
          id="wechat-id-value"
          className="contact-value contact-wechat-id"
          aria-describedby="wechat-id-description"
        >
          <span className="wechat-letter-prefix">ll</span>
          <span>467113957</span>
          <small aria-hidden="true">LETTER l × 2</small>
        </b>
        <div className="contact-actions">
          <button
            type="button"
            onClick={copyWechat}
            className={copyStatus?.target === "wechat" ? "is-copied" : ""}
          >
            复制微信号
            <span className="sr-only">，前两位为小写字母 l</span>
            {copyStatus?.target === "wechat" ? (
              <span aria-hidden="true"> ✓</span>
            ) : null}
          </button>
          <span id="wechat-id-description" className="contact-action-note">
            前两位为两个小写字母 l，复制后在微信中搜索添加。
          </span>
        </div>
        <span className="contact-feedback" aria-live="polite">
          {copyStatus?.target === "wechat" ? copyStatus.message : ""}
        </span>
      </article>

      <a
        className="contact-item contact-github"
        href="https://github.com/jameswilson87156-del"
        target="_blank"
        rel="noreferrer"
      >
        <span className="contact-type">GITHUB</span>
        <b className="contact-value">jameswilson87156-del</b>
        <span className="sr-only">打开王震龙的 GitHub 主页</span>
        <span className="contact-external" aria-hidden="true">
          ↗
        </span>
      </a>
    </div>
  );
}
