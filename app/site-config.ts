export const SITE_CONFIG = {
  origin: "https://wzl8.top",
  hostname: "wzl8.top",
  icpNumber: "豫ICP备2026032125号-1",
  icpUrl: "https://beian.miit.gov.cn/",
  filingSiteName: "Wangzhenlong学习记录",
} as const;

export function siteUrl(pathname: string) {
  return new URL(pathname, SITE_CONFIG.origin).toString();
}
