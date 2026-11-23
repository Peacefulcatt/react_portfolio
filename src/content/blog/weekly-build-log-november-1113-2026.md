---
title: "Weekly Build Log: November 11–13, 2026"
excerpt: "Work on Elmed_Procedures this week focused on documentation. A single commit added the Art. 120 significant-change gate to the QMS docs, establishing a formal gate for assessing significant changes i…"
date: 2026-11-14
tags: ["Engineering"]
readTime: "2 min read"
source: telegram-bot
---

## Elmed_Procedures: Compliance Gate Documentation

Work on Elmed_Procedures this week focused on documentation. A single commit added the Art. 120 significant-change gate to the QMS docs, establishing a formal gate for assessing significant changes in procedures.

## CNC_Freedom: Shop Panel and Navigator

On November 12, CNC_Freedom received the FreeCAD shop panel and an NX-style operation navigator. This provides a new interface for managing shop operations within FreeCAD.

## CNC_Freedom: Toolpath and Workbench Enhancements

The following day, multiple commits further enhanced CNC_Freedom. New shop examples were added for "kafa arka kılıf" and "direnç kutusu". A FreeCAD workbench was introduced to drive the shop panel, and shop operations were grouped in the style of an NX navigator. Several toolpath improvements were implemented: cut progress is now played against the part in the viewer, in-cycle rapids are dropped when importing a FreeCAD Path job, cavities are sliced open when recognizing a STEP solid, and the finished solid is embedded in the exported toolpath scene. Additionally, an optional AAGNet extra for face-hint weights was added, 3D surfaces are now sampled with PathDropCutter instead of BatchDropCutter, cuts that would chord through a cavity wall are retracted, and the job model now records opening Z, keep-outs, and a part mesh. Local caches and FreeCAD recovery files are also ignored.
