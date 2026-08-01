# Cache policy draft

| Resource | Policy | Reason |
|---|---|---|
| HTML and directory routes | `no-cache` | Always revalidate the active release |
| `.rsc` and `index.rsc` | `no-cache` | Keep navigation payload aligned with HTML |
| Hashed `assets/*.js` and `assets/*.css` | one year, immutable | Filenames change with content |
| Responsive project WebP | one year, immutable | Checked-in derivative filenames change with source updates |
| Original evidence PNG | one year, immutable | Public high-resolution evidence remains directly accessible |
| `robots.txt` and `sitemap.xml` | one hour | Discovery metadata should revalidate quickly |
| OG image | 30 days | Stable metadata image |
| favicon | 7 days | Small and infrequently changed |

The example uses one `map` so cache headers do not accidentally remove the
server-level security headers through Nginx `add_header` inheritance.

The example enables gzip for HTML-adjacent text, CSS, JavaScript, JSON, RSC and
SVG. It deliberately does not recompress PNG, WebP, JPEG or ICO files.
