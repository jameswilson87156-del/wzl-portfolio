import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="not-found-page shell">
      <p className="section-label">/ 404</p>
      <h1>页面不存在。</h1>
      <p>该地址不属于当前公开作品集。</p>
      <Link href="/">返回首页</Link>
    </main>
  );
}
