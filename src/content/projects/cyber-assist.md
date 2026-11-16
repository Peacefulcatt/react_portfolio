---
title: cyber-assist
description: Agent workflow that interviews a device team and writes the cybersecurity documents medical-device regulators expect, then renders them to Word.
tags: ['Healthcare', 'Python', 'Security']
demo: '#'
order: 6
---

## What it is

cyber-assist produces cybersecurity documentation for a medical device. A reviewer sits with the system, answers an interview about the device, and can attach design files while that interview is still open. Agents draft the documents, check them against a fixed set of regulatory requirements, and render the accepted text to Word.

Nothing in the design is bound to one product. A device is its profile, the files the team uploaded, and, if they choose, the repositories that describe the software. The same flow can start from a different device without a code change. The backend is Python, managed with uv, linted with ruff, and tested from the repository. Uploaded PDFs are read with pypdf. The interface is a TypeScript SPA. Device, interview, and document routes return JSON, so the screen is a client of the API rather than a set of server-rendered pages.

## From interview to document

The interview is the source of the device profile. Questions follow the device in front of the reviewer, and a diagram or a specification can be attached when the question comes up. Waiting until the end to collect files is how citations get lost. Mid-interview upload keeps the file next to the answer that needed it.

Company Word templates can be inherited, so the generated file uses the organization's styles rather than a generic theme. Draft framework text is staged in its own directory, apart from the finished documents. Generation is reviewed section by section. A reviewer can reject a section without throwing away the rest of the set.

Cross-document checks look for statements that disagree with each other, and for claims that are not backed by something in the interview or the uploaded evidence. A section that cannot point at that evidence stays a draft. The knowledge base is the list of requirements the drafts are scored against. It is data, not a prompt buried in a function, so a requirement can be updated without rewriting the agents.

## The four documents

Four documents ship. Together they are written against EU MDR and IEC 81001-5-1, including MDCG 2019-16, FDA premarket cybersecurity guidance under section 524B, and AAMI TIR57 / ISO 14971. The knowledge base holds 48 requirements, and the set is meant to show evidence for all of them.

- A threat model and security risk assessment, tied to the hazards the interview actually described.
- An SBOM and vulnerability-management plan. An analyst step gathers the software inventory and the vulnerability notes before the plan is written, so the tables describe components that were found.
- A secure development lifecycle plan for how that device is built and changed.
- A security verification and validation summary, which is where the other documents have to agree.

Optional checks against a device the team has authorized to test can add evidence to that verification summary. Those checks run in a container, under Podman or Docker, and only against targets on an allowlist. A target that is not listed is not scanned. The result is evidence for the summary, not a separate report with nowhere to go.

## What the review is for

The output is a set of Word files a regulatory file can hold. The work before that is the part that matters. Every section is tied to a requirement, checked against the other documents, and grounded in the interview and the files the team supplied. Templates exist so the pages look like the company's other documents. They do not fill themselves in. The system does not invent a device. It writes down the one it was shown.
