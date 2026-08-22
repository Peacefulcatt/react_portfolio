---
title: "Weekly Update: PACS Integration, Model Retrieval, and Regulatory Corpus Scraper"
excerpt: "This week we completed the PACS integration in the Controller project. The startup connection check is now gated behind an `activePacs` flag, and failures are treated as non-fatal. The commit also in…"
date: 2026-08-22
tags: ["Engineering"]
readTime: "3 min read"
source: telegram-bot
---

## Controller: Robust PACS Integration and Code Cleanup

This week we completed the PACS integration in the Controller project. The startup connection check is now gated behind an `activePacs` flag, and failures are treated as non-fatal. The commit also included fixes for related safety and localization bugs.

We followed up with a series of eleven commits that addressed several areas:
- **Editor and scratch files**: ignored VS Code workspace settings and local diff scratch files.
- **UI refactoring**: wrapped `btnReferanceImage` attributes onto two lines.
- **Build tooling**: disabled the SecurityCodeScan analyzer.
- **Governance documentation**: adopted SDP-001 governance and added a project addendum.
- **DICOM bootstrap stability**: fixed a startup hang, and decoupled reference image capture from mandatory PACS. The main window now opens even if the DICOM bootstrap fails.

## EndoVision-Ai: Enhanced Model Name Retrieval and Project Documentation

In the EndoVision-Ai project, we implemented an enhanced model name retrieval function in `model_manager.py`. A new helper extracts names from model objects, improving compatibility with various checkpoint formats. The `_read_names` method now prioritizes names from `'ema'`, `'model'`, or the checkpoint itself. Tests were added to validate model class retrieval from different scenarios.

We also merged multiple documentation pull requests:
- Added a project-level README.
- Adopted a software development procedure document.
- Updated `.gitignore` to ignore the local procedure checkout and datasets.

## Regulatory Knowledge Infrastructure: MDCG Corpus Acquisition

A new Python scraper was built against the European Commission’s official MDCG endorsed-documents page (`health.ec.europa.eu`). The scraper walks the live catalogue, splits it into the ten official sections (borderline/classification, clinical investigation, EUDAMED, EMDN, economic operators, notified bodies, PRRC, PMSV, standards, UDI), and captures each document’s reference, title, publication date, and download URL.

On this run it catalogued 99 documents with 113 links and pulled 110 files (85 PDF, 19 DOCX, 4 XLSX, 2 DOC), organised by section slug. A structured `mdcg_guidance.json` snapshot was generated (scraped at 2026-08-21T12:40:59Z). This JSON is the inventory of what exists, where it lives, and which official file it maps to. Having a repeatable scrape means the library can be refreshed when Brussels publishes new guidance or revisions.

## New Projects and Documentation Updates

Several other projects saw activity:

- **kalite_etiket_olusturma**: The project was initialised, and later the `load_depo_groups` function was updated to dynamically pad rows. The main function was modified to track processed files accurately. The `load_simple_items` function was refactored for readability and now handles empty `'kod'` values.

- **Elmed_Procedures**: An initial commit established the project.

- **Elmed_DOCs**: The architecture and README documentation for the Elmed infrastructure were enhanced. The network layout, device roles, and Docker stack details were updated. iSCSI configuration and storage management were clarified, improving overall structure and readability.

- **react_portfolio**: A weekly update blog post was published via the Telegram bot as part of the content workflow.
