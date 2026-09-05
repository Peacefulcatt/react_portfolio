---
title: "Week of August 31 – September 4, 2026"
excerpt: "This week I published the “week-of-august-2425-2026” blog post on my portfolio site via a Telegram bot, keeping the content pipeline fully automated."
date: 2026-09-05
tags: ["Engineering"]
readTime: "2 min read"
source: telegram-bot
---

## Automation & Workflow Improvements

This week I published the “week-of-august-2425-2026” blog post on my portfolio site via a Telegram bot, keeping the content pipeline fully automated.

On SocialGitBot I made two key changes: the tool now transforms raw git sync entries into CV-ready impact statements, and it requires explicit approval before updating the master CV. I also ensured that git commit tallies are kept out of the master CV merge, keeping the CV focused on deliverables rather than commit counts.

## Embedded Systems: A Modbus TCP Spy for Raspberry Pi 4

I started and rapidly iterated a new project: a Modbus TCP network spy for the Raspberry Pi 4, packaged as a custom Buildroot image. The initial commit brought up the full spy application. Over the next day I made eight more commits:
- Set a root password so SSH and `make deploy` work.
- Serve the dashboard over WiFi so `eth0` stays silent during packet capture.
- Deploy with `tar` over SSH because the target image lacks `rsync`.
- Documented what building and booting the image actually requires.
- Merged a pull request that fixed CSRF protection, silent capture death, tail gaps, and configuration tracebacks.
- Pinned Buildroot to the 2026.02.x branch after the 2024.02.x reference was removed upstream.
- Changed `make deploy` to point at a hard IP address instead of an unresolvable `.local` hostname.

## Cloud Infrastructure & Monitoring

On the elmed_cloud project I tackled several infrastructure tasks:
- Added basic authentication for the QMS service inside the Docker Compose setup.
- Surfaced nightly backup results in Grafana by piping them through Loki.
- Added a new nightly host‑wide backup runner with its own systemd timer.
- Replaced the init process in the OpenCloud container with `tini` (PID 1) so the health check stops accumulating zombie processes.
- Fixed the iSCSI LUN watchdog, which had stopped firing after its initial run.

## Additional Improvements

On EndoVision‑Ai I added tests covering settings, worker failure scenarios, and UI dialogs.

On the Controller project I delivered a feature to automate X‑ray distortion map generation, closing pull request #10.
