# Static deployment layout draft

This is a future layout, not a command to deploy.

```text
/var/www/wzl-portfolio/
  releases/
    <release-id>/
      index.html
      index.rsc
      .rsc
      404.html
      assets/
      projects/
      static-release-manifest.json
  current -> /var/www/wzl-portfolio/releases/<release-id>
```

Rules:

1. Each release is immutable after verification.
2. `current` changes only after manifest, hash and HTTP checks pass.
3. The portfolio owns only `/var/www/wzl-portfolio`.
4. Do not use or overwrite OpenClaw directories.
5. Do not bind or proxy OpenClaw port 18352 or searxng port 8080.
6. Nginx uses a dedicated `server_name` block for `wzl8.top`.
