"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  ["case-summary", "01", "摘要"],
  ["case-system", "02", "系统"],
  ["case-decisions", "03", "决策"],
  ["case-failures", "04", "失败"],
  ["case-evidence", "05", "证据"],
  ["case-boundaries", "06", "边界"],
] as const;

type CaseSectionId = (typeof sections)[number][0];

export default function CaseSectionNav() {
  const navRef = useRef<HTMLElement>(null);
  const activeRef = useRef<CaseSectionId>(sections[0][0]);
  const [active, setActive] = useState<CaseSectionId>(sections[0][0]);

  useEffect(() => {
    const nav = navRef.current;
    const caseRoot = nav?.closest<HTMLElement>(".case-page");
    const summary = document.getElementById("case-summary");
    const boundaries = document.getElementById("case-boundaries");
    if (!nav || !caseRoot || !summary || !boundaries) return;
    const sectionTargets = sections.map(([id]) => [id, document.getElementById(id)] as const);

    let progressFrame = 0;
    const setActiveSection = (id: CaseSectionId) => {
      if (activeRef.current === id) return;
      activeRef.current = id;
      setActive(id);
      caseRoot.dataset.activeSection = id;
    };
    const paintProgress = () => {
      progressFrame = 0;
      const start = summary.getBoundingClientRect().top + window.scrollY;
      const end = boundaries.getBoundingClientRect().bottom + window.scrollY - window.innerHeight;
      const progress = Math.min(1, Math.max(0, (window.scrollY - start) / Math.max(1, end - start)));
      const probe = Math.min(window.innerHeight * 0.28, nav.offsetHeight + 180);
      let nextActive: CaseSectionId = sections[0][0];
      sectionTargets.forEach(([id, target]) => {
        if (target && target.getBoundingClientRect().top <= probe) nextActive = id;
      });
      setActiveSection(nextActive);
      nav.style.setProperty("--case-progress", progress.toFixed(4));
      nav.dataset.caseProgress = progress.toFixed(4);
    };
    const scheduleProgress = () => {
      if (!progressFrame) progressFrame = window.requestAnimationFrame(paintProgress);
    };

    caseRoot.dataset.activeSection = sections[0][0];
    scheduleProgress();
    window.addEventListener("scroll", scheduleProgress, { passive: true });
    window.addEventListener("resize", scheduleProgress);

    if (!("IntersectionObserver" in window)) {
      return () => {
        window.removeEventListener("scroll", scheduleProgress);
        window.removeEventListener("resize", scheduleProgress);
        if (progressFrame) window.cancelAnimationFrame(progressFrame);
      };
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) scheduleProgress();
      },
      { rootMargin: "-18% 0px -66% 0px", threshold: [0.01, 0.25] },
    );
    sections.forEach(([id]) => {
      const target = document.getElementById(id);
      if (target) observer.observe(target);
    });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleProgress);
      window.removeEventListener("resize", scheduleProgress);
      if (progressFrame) window.cancelAnimationFrame(progressFrame);
    };
  }, []);

  const current = sections.find(([id]) => id === active) ?? sections[0];
  return (
    <nav ref={navRef} className="case-section-nav" aria-label="案例章节导航" data-active-section={active}>
      <div className="shell case-section-nav-inner">
        <details className="case-section-mobile-menu">
          <summary>
            <span className="case-section-mobile" aria-live="polite">
              {current[1]} / 06 · {current[2]}
            </span>
            <i aria-hidden="true">+</i>
          </summary>
          <ol aria-label="移动端章节跳转">
            {sections.map(([id, number, label]) => (
              <li key={`mobile-${id}`} className={active === id ? "is-active" : ""}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "location" : undefined}
                  onClick={(event) => {
                    const menu = event.currentTarget.closest("details");
                    if (menu) menu.open = false;
                  }}
                >
                  <span>{number}</span>{label}
                </a>
              </li>
            ))}
          </ol>
        </details>
        <ol>
          {sections.map(([id, number, label]) => (
            <li key={id} className={active === id ? "is-active" : ""}>
              <a href={`#${id}`} aria-current={active === id ? "location" : undefined}>
                <span>{number}</span>{label}
              </a>
            </li>
          ))}
        </ol>
      </div>
      <span className="case-section-progress" aria-hidden="true"><i /></span>
    </nav>
  );
}
