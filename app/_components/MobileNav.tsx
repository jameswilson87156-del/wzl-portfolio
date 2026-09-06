"use client";

import type { MouseEvent } from "react";
import { useEffect, useRef } from "react";

const links = [
  ["#projects", "项目"],
  ["#evidence", "证据"],
  ["#about", "关于"],
  ["#contact", "联系我"],
] as const;

function closeMenu(event: MouseEvent<HTMLAnchorElement>) {
  event.currentTarget.closest("details")?.removeAttribute("open");
}

export default function MobileNav() {
  const menuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !menuRef.current?.open) return;
      menuRef.current.open = false;
    };
    const onPointerDown = (event: PointerEvent) => {
      const menu = menuRef.current;
      if (!menu?.open || menu.contains(event.target as Node)) return;
      menu.open = false;
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <details ref={menuRef} className="nav-mobile-menu">
      <summary aria-label="打开站点菜单">
        <span>MENU</span>
        <i aria-hidden="true">+</i>
      </summary>
      <div className="nav-mobile-panel">
        {links.map(([href, label]) => (
          <a href={href} key={href} onClick={closeMenu}>
            <span>{label}</span>
            <b aria-hidden="true">↗</b>
          </a>
        ))}
        <a
          href="https://github.com/jameswilson87156-del"
          target="_blank"
          rel="noreferrer"
          onClick={closeMenu}
        >
          <span>GitHub</span>
          <b aria-hidden="true">↗</b>
        </a>
      </div>
    </details>
  );
}
