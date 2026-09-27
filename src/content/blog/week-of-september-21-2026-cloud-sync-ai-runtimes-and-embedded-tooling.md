---
title: "Week of September 21, 2026: Cloud Sync, AI Runtimes, and Embedded Tooling"
excerpt: "Work on the OpenCloud and Elmed Cloud projects focused on reliability and configuration flexibility. Samba Disaster Recovery reverse-sync, mtime healing, and logging were added, and the OpenCloud and…"
date: 2026-09-27
tags: ["Engineering"]
readTime: "2 min read"
source: telegram-bot
---

## OpenCloud & Elmed Cloud Updates

Work on the OpenCloud and Elmed Cloud projects focused on reliability and configuration flexibility. Samba Disaster Recovery reverse-sync, mtime healing, and logging were added, and the OpenCloud and Samba tooling were grouped together for better organization.

Later in the week, the multi-file download feature was updated. The ZIP archiver limits are now configurable through environment variables, making the system more adaptable without code changes.

The week wrapped up with a fix for a login loop issue and a persistent spinner on the personal files page.

## EndoVision-Ai Runtime

On the EndoVision-Ai project, a new runtime feature was introduced. A commit was made to add the UNet++ runtime, expanding the model architecture support for the project.

## Raspberry Pi Datalogger Helper

A significant amount of work was done on the `pi_datalogger_helper` project. The CEM DT-172 datalogger is now fully supported with a dedicated helper.

To streamline deployment, a prebuilt Raspberry Pi 4 image was added along with a flash script that can configure Wi-Fi credentials. The documentation was updated to explain how to flash this image without storing the Wi-Fi password in the repository.

Several fixes and features were implemented, including a fix for the Dropbear SSH server startup when `/etc/dropbear` is a volatile symlink, and a new alarm feature that buzzes GPIO22 for various conditions such as an alarm state, an unreachable logger, or newly collected samples.
