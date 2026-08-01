# Rollback plan draft

1. Record the current `current` symlink target.
2. Upload and verify a new release in a new versioned directory.
3. Validate `static-release-manifest.json`, `.rsc`/`index.rsc` equality and all routes.
4. Validate the proposed Nginx configuration before any reload.
5. Atomically repoint `current`.
6. Recheck the portfolio plus the untouched OpenClaw and searxng ports.
7. On any failure, repoint `current` to the recorded release and revalidate.

Rollback never stops or modifies OpenClaw, searxng, Docker, or their directories.
