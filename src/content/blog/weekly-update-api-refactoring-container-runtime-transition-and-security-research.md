---
title: "Weekly Update: API Refactoring, Container Runtime Transition, and Security Research"
excerpt: "This week I made several updates to the cyber-assist project. I added `ruff` to the development dependencies in `pyproject.toml` for improved linting. The README was updated to clarify the setup proc…"
date: 2026-08-17
tags: ["Engineering"]
readTime: "3 min read"
source: telegram-bot
---

## cyber-assist: API Refactoring and Documentation Improvements

This week I made several updates to the cyber-assist project. I added `ruff` to the development dependencies in `pyproject.toml` for improved linting. The README was updated to clarify the setup process using `uv` for dependency management, and I added instructions for running tests and generating templates. Documentation on the verification process and tool usage was enhanced for consistency.

I also modified `.gitignore` to include staging knowledge files while preserving `.gitkeep`. A new `pypdf` dependency was added to `pyproject.toml`. The README now includes updated instructions for running the application and clarifies the SPA build process. A new `staging_dir` property was introduced in the configuration for draft framework extractions. Several API endpoints were refactored to support JSON responses for device management, interview processes, and document handling, transitioning from HTML to JSON for those routes. Documentation was updated to reflect these changes.

## cyber-assist: Transition to Podman for Containerized Security Testing

On August 12, I refactored the active security testing module to support containerized execution. The documentation and configuration were updated to reflect the transition from Docker to Podman as the preferred container runtime for dynamic scanning. The README and configuration files now clarify usage and setup instructions. The codebase was updated to ensure compatibility with both Podman and Docker, including changes to environment variables and runtime paths. Error handling and messaging for container runtime availability were improved. Tests were added to validate the new container execution flow.

## hmgs and DICOM_Handler: Merges and Authentication Enhancements

For the hmgs project, I merged the `dev` branch into `main` and updated the mobile app configuration while enhancing authentication error handling. For DICOM_Handler, I merged a pull request from the `dev` branch into `main`.

## Security reading

On August 14 I read about file exposure on embedded devices and about how Unix systems store passwords. The practical takeaway was the usual set of mitigations: run services with least privilege, keep firmware updated, and keep those devices on a separate network.
