# Portfolio redesign — 2026-09-06

## Brief

The portfolio should help a recruiter understand two primary projects in the first minute:

1. CommerceFlow AI Mall: Java business-system correctness, idempotency, inventory consistency, and full-stack delivery.
2. Enterprise AI Ticket Copilot: retrieval, citations, human review, trace, and honest fallback boundaries.

The portfolio is a static showcase. It must not imply that either project is publicly deployed, connected to production data, or backed by an always-on external model.

## Reference audit

- [wzl8.top](https://wzl8.top/) already has the right evidence-first foundation: a clear hero, project routes, repository links, verification cards, and explicit capability boundaries. The redesign keeps that content contract and gives the two primary projects stronger visual priority.
- [Brittany Chiang](https://brittanychiang.com/) demonstrates concise positioning, a scannable project/experience index, and a direct path from identity to proof. We borrow the information hierarchy, not the visual assets or copy.
- [Rauno Freiberg](https://rauno.me/) demonstrates restraint: a small navigation surface, generous type, and a memorable statement instead of a dashboard grid. We borrow the quiet rhythm and typographic confidence.
- [Bruno Simon](https://bruno-simon.com/) demonstrates the value of one memorable interaction and an explicit behind-the-scenes disclosure. We keep motion restrained because the portfolio is selling engineering judgment and readable evidence rather than a 3D game.

## Chosen direction

**Editorial systems journal.** The visual language is a warm paper / deep ink field with a measured acid marker, rust and periwinkle project accents, thin rules, and a technical mono label. It treats each project as a documented system rather than a generic SaaS feature card.

The direction fits a Java and AI application portfolio because it makes constraints, evidence, and trade-offs visible. It differs from the business applications themselves: CommerceFlow remains a coral operational product and Ticket Copilot remains an enterprise review workbench; the portfolio acts as the calm editorial index that explains both.

## Page structure

- Hero: role statement, three direction tags, and a two-item project index that jumps to the primary case studies.
- Evidence strip: compact claims with repository scope, verification date, verification type, and boundary text.
- Selected projects: CommerceFlow and Ticket Copilot receive full-height case cards; DevFlow remains a supporting project.
- About and stack: plain-language positioning plus grouped technologies.
- Method: BUILD → VERIFY → EXPLAIN, with the collaboration disclosure retained.
- Contact: email, WeChat copy action, GitHub, and ICP footer.

## Interaction and responsive rules

- Project cards keep the existing case and repository actions; no additional decorative CTA is introduced.
- Hover motion uses small translate / padding changes and never moves layout dimensions.
- The homepage header is sticky during the opening read: it gains a blurred dark surface after the first scroll, yields space while moving down, and returns while moving up.
- On narrow screens, the full site path remains available through a native `details` menu; links close it on navigation, Escape, or an outside pointer action.
- The two-item project index collapses into a vertical list on narrow screens.
- Ticket’s alternating media / copy order returns to a single-column flow on mobile.
- Existing `prefers-reduced-motion` behavior remains authoritative.
- The homepage keeps one semantic `main`, one `h1`, the existing evidence attributes, and all current case-page routes.

## Visual cover pass — 2026-09-06

The homepage project cards now use `EditorialProjectCover` rather than rendering one raw product screenshot as the entire card image. Each cover recomposes the real local evidence screens into a distinct case-study composition:

- CommerceFlow: order truth, inventory competition, and AI facts / trace;
- Ticket Copilot: retrieval, citation, trace, and human review;
- DevFlow: run trace, prompt / tool call, and replayable evidence.

The original PNG evidence remains unchanged and continues to appear in the case pages and image viewer. The homepage cover is a presentation layer; it does not create new product claims or replace the evidence boundary.

## First-paint polish — 2026-09-06

The hero title remains readable while its entrance motion runs. The motion now moves and emphasizes the title without hiding it behind an initial transparent state, so a slow first paint or a screenshot captured early still communicates the portfolio role immediately. Reduced-motion behavior remains unchanged.

## Capability rail polish — 2026-09-06

The three plain outline tags under the hero title now form a compact capability rail. Each cell keeps the original role direction while adding a factual engineering lens: Java full-stack maps to business flow and data consistency, AI application maps to retrieval evidence and human review, and AI tooling maps to provider routing and trace replay. The cells use project accents, indexed labels, a restrained hover response, and a stacked mobile layout. No new framework, metric, production claim, or project evidence was introduced.

The capability rail is also a native keyboard-accessible shortcut: its three cells link to the matching CommerceFlow, Ticket Copilot, and DevFlow case cards. This makes the first viewport explain both the role direction and the next evidence destination without adding a second visual control row.

The adjacent project rail now uses a native `nav` landmark as well, so its hover and focus preview remains a readable project navigation pattern instead of an anonymous visual panel.

## Boundary

This change is local to the portfolio site clone. It does not deploy `wzl8.top`, modify DNS, alter the Aliyun host, publish the two business repositories, or add credentials. The cover pass was checked in the local browser at `http://127.0.0.1:5180/` and in the static preview on port `5179` after the build.
