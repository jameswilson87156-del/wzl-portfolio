"use client";

import { useCallback, useEffect, useState, type FocusEvent } from "react";

export type HeroProjectRailItem = {
  slug: string;
  no: string;
  shortTitle: string;
  type: string;
  trace: string;
  cue: string;
};

type HeroProjectRailProps = {
  projects: readonly HeroProjectRailItem[];
};

export default function HeroProjectRail({ projects }: HeroProjectRailProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const activeProject = projects.find((project) => project.slug === activeSlug);

  const setActiveProject = useCallback((slug: string | null) => {
    setActiveSlug(slug);
    if (typeof document === "undefined") return;
    if (slug) {
      document.documentElement.dataset.activeProject = slug;
    } else {
      delete document.documentElement.dataset.activeProject;
    }
  }, []);

  useEffect(
    () => () => {
      delete document.documentElement.dataset.activeProject;
    },
    [],
  );

  function clearWhenFocusLeaves(event: FocusEvent<HTMLAnchorElement>) {
    const nextTarget = event.relatedTarget;
    if (
      nextTarget instanceof Node &&
      event.currentTarget.parentElement?.contains(nextTarget)
    ) {
      return;
    }
    setActiveProject(null);
  }

  return (
    <nav
      className={`hero-project-index${activeSlug ? " has-active" : ""}`}
      aria-label="重点项目"
      data-active-project={activeSlug ?? "none"}
    >
      {projects.map((project) => (
        <a
          className="hero-project-link"
          href={`#project-${project.slug}`}
          key={project.slug}
          data-project={project.slug}
          data-active={activeSlug === project.slug ? "true" : "false"}
          onPointerEnter={() => setActiveProject(project.slug)}
          onPointerLeave={(event) => {
            if (document.activeElement !== event.currentTarget) {
              setActiveProject(null);
            }
          }}
          onFocus={() => setActiveProject(project.slug)}
          onBlur={clearWhenFocusLeaves}
        >
          <span className="hero-project-number">{project.no}</span>
          <span className="hero-project-name">
            <strong>{project.shortTitle}</strong>
            <small>{project.type}</small>
            <span className="hero-project-trace" aria-hidden="true">
              <small>TRACE</small>
              <strong>{project.trace}</strong>
              <em>{project.cue}</em>
            </span>
          </span>
          <b aria-hidden="true">↘</b>
        </a>
      ))}
      <div className="hero-project-context" aria-live="polite">
        <span>{activeProject ? "ACTIVE SIGNAL" : "INTERACTION MAP"}</span>
        <strong>{activeProject?.trace ?? "HOVER / FOCUS A PROJECT"}</strong>
        <small>
          {activeProject?.cue ?? "每条路径都落回可验证的工程证据。"}
        </small>
      </div>
      <span className="hero-project-note">
        TWO CASE STUDIES / ONE ENGINEERING THROUGHLINE
      </span>
    </nav>
  );
}
