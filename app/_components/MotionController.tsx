"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const FAIL_OPEN_MS = 1600;

export default function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia(REDUCED_MOTION);
    const registeredReveal = new WeakSet<Element>();
    const registeredSignal = new WeakSet<Element>();
    const failOpenTimers = new Map<Element, number>();
    let observer: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;
    let pointerFrame = 0;
    let scanFrame = 0;
    let disposed = false;

    const getTargets = () => ({
      reveal: Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")),
      signal: Array.from(document.querySelectorAll<HTMLElement>("[data-signal-on-view]")),
    });

    const clearFailOpen = (target: Element) => {
      const timer = failOpenTimers.get(target);
      if (timer) window.clearTimeout(timer);
      failOpenTimers.delete(target);
    };

    const reveal = (target: HTMLElement, failOpen = false) => {
      target.dataset.revealState = "visible";
      target.classList.add("is-visible");
      if (failOpen) target.dataset.failOpen = "true";
      clearFailOpen(target);
      observer?.unobserve(target);
    };

    const play = (target: HTMLElement, failOpen = false) => {
      target.dataset.signalState = "played";
      target.classList.add("is-visible");
      if (failOpen) target.dataset.failOpen = "true";
      clearFailOpen(target);
      observer?.unobserve(target);
    };

    const revealEverything = () => {
      const targets = getTargets();
      targets.reveal.forEach((target) => reveal(target));
      targets.signal.forEach((target) => play(target));
    };

    const isAlreadyReached = (target: HTMLElement) => {
      const rect = target.getBoundingClientRect();
      return rect.top <= window.innerHeight * 1.08;
    };

    const scheduleFailOpen = (target: HTMLElement, kind: "reveal" | "signal") => {
      clearFailOpen(target);
      const timer = window.setTimeout(() => {
        if (disposed) return;
        if (kind === "reveal" || target.hasAttribute("data-reveal")) reveal(target, true);
        if (kind === "signal" || target.hasAttribute("data-signal-on-view")) play(target, true);
      }, FAIL_OPEN_MS);
      failOpenTimers.set(target, timer);
    };

    const registerReveal = (target: HTMLElement) => {
      if (registeredReveal.has(target)) return;
      registeredReveal.add(target);
      if (media.matches || !observer || isAlreadyReached(target)) {
        reveal(target);
        return;
      }
      target.dataset.revealState = "pending";
      observer.observe(target);
      scheduleFailOpen(target, "reveal");
    };

    const registerSignal = (target: HTMLElement) => {
      if (registeredSignal.has(target)) return;
      registeredSignal.add(target);
      target.dataset.signalState = "idle";
      if (media.matches || !observer || isAlreadyReached(target)) {
        play(target);
        return;
      }
      observer.observe(target);
      scheduleFailOpen(target, "signal");
    };

    const scan = () => {
      if (disposed) return;
      const targets = getTargets();
      targets.reveal.forEach(registerReveal);
      targets.signal.forEach(registerSignal);
    };

    const buildObserver = () => {
      observer?.disconnect();
      observer = null;
      if (media.matches || !("IntersectionObserver" in window)) {
        revealEverything();
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const target = entry.target as HTMLElement;
            if (target.hasAttribute("data-reveal")) reveal(target);
            if (target.hasAttribute("data-signal-on-view")) play(target);
          });
        },
        { root: null, rootMargin: "0px 0px 8% 0px", threshold: 0.01 },
      );
    };

    const applyMotionPreference = () => {
      root.classList.toggle("motion-reduced", media.matches);
      root.classList.toggle("motion-ready", !media.matches);
      buildObserver();
      if (media.matches) revealEverything();
      else scan();
    };

    const onVisibility = () => {
      if (!document.hidden) {
        scan();
        const targets = getTargets();
        targets.reveal.filter(isAlreadyReached).forEach((target) => reveal(target));
        targets.signal.filter(isAlreadyReached).forEach((target) => play(target));
      }
    };

    const onScroll = () => {
      if (scanFrame) return;
      scanFrame = window.requestAnimationFrame(() => {
        scanFrame = 0;
        scan();
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
          revealEverything();
        }
      });
    };

    const hero = document.querySelector<HTMLElement>(".hero");
    let pointerX = 0;
    let pointerY = 0;
    const paintPointer = () => {
      pointerFrame = 0;
      if (document.hidden || media.matches || !hero) return;
      root.style.setProperty("--pointer-x", `${pointerX}px`);
      root.style.setProperty("--pointer-y", `${pointerY}px`);
      root.classList.add("hero-pointer-active");
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!hero || media.matches || window.innerWidth < 1024 || !window.matchMedia("(pointer: fine) and (hover: hover)").matches) return;
      const rect = hero.getBoundingClientRect();
      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;
      if (!pointerFrame) pointerFrame = window.requestAnimationFrame(paintPointer);
    };
    const onPointerLeave = () => root.classList.remove("hero-pointer-active");

    applyMotionPreference();
    const main = document.querySelector("main");
    if (main && "MutationObserver" in window) {
      mutationObserver = new MutationObserver(scan);
      mutationObserver.observe(main, { childList: true, subtree: true });
    }
    media.addEventListener("change", applyMotionPreference);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", onScroll);
    hero?.addEventListener("pointermove", onPointerMove);
    hero?.addEventListener("pointerleave", onPointerLeave);

    return () => {
      disposed = true;
      observer?.disconnect();
      mutationObserver?.disconnect();
      failOpenTimers.forEach((timer) => window.clearTimeout(timer));
      failOpenTimers.clear();
      media.removeEventListener("change", applyMotionPreference);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", onScroll);
      hero?.removeEventListener("pointermove", onPointerMove);
      hero?.removeEventListener("pointerleave", onPointerLeave);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      if (scanFrame) window.cancelAnimationFrame(scanFrame);
      root.classList.remove("motion-ready", "motion-reduced", "hero-pointer-active");
      root.style.removeProperty("--pointer-x");
      root.style.removeProperty("--pointer-y");
    };
  }, [pathname]);

  return <div className="scroll-progress" aria-hidden="true" />;
}
