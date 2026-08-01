import { SITE_CONFIG } from "../site-config";

export default function SiteComplianceFooter() {
  return (
    <div className="site-compliance-footer" data-compliance-footer="true">
      <a
        href={SITE_CONFIG.icpUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`前往工信部备案系统查询${SITE_CONFIG.icpNumber}`}
      >
        {SITE_CONFIG.icpNumber}
      </a>
    </div>
  );
}
