---
title: CNC Freedom
description: Open-source Python CAD/CAM pipeline that turns DXF and STEP models into HAAS G-code, with STEP feature recognition and a FreeCAD workbench.
tags: ['Python', 'CAD/CAM', 'Manufacturing']
demo: '#'
order: 1
---

## What it is

CNC Freedom is an open-source CAD/CAM pipeline written in Python. It reads a drawing or a solid model and writes G-code for HAAS machining centers, specifically the VF-2 and VF-3SS, using their NGC / Fanuc-style dialect. The project is MIT licensed, so the toolpath logic can be read, tested, and changed without a commercial CAM seat.

A commercial seat is the usual answer to this job, and it is priced per programmer. The pipeline is the other answer: geometry in, posted code out, with the operations visible in the repository instead of inside a closed kernel. Version 0.2.0 targets Python 3.10 or newer. The numeric work sits on NumPy and Shapely.

## From geometry to operations

Flat drawings come in as DXF through ezdxf. Solids come in as STEP, through CadQuery, FreeCAD, or trimesh depending on the model. A STEP body is not just a mesh to slice. With recognition turned on, the pipeline reads the boundary representation and proposes facing, pocketing, and drilling from the faces it finds. A mesh-only path still exists for models that do not carry a clean solid, but the solid path is what makes the operations match the part instead of a stack of slices.

The 2.5D operation set covers facing, pocketing, profiling with tabs, drilling, grooving, chamfering, thread milling, and boring. A pocket can be cut with a conventional offset path or with an adaptive path that keeps the tool loaded more evenly. Entry can be helical, a ramp, or a plunge. Climb milling and stock-to-leave are part of the same setup, so a finishing pass can leave material on purpose and come back for it.

Recognition does not replace the programmer. It proposes the operations. The shop panel is where those proposals are accepted, reordered, or edited before anything is posted.

## What the shop sees

A FreeCAD workbench drives that panel from inside the CAD session. Operations are grouped the way an NX-style navigator groups them: setup, then the cuts under it, rather than a flat list of toolpaths with no parent. The same panel can be driven from the command line when FreeCAD is not open. Input geometry and posted output live in their own directories, so a job is a folder you can diff.

A viewer plays the cut against the part. The point is to watch the tool move through the stock before the file reaches the machine, including the order of the operations, not only the final shape. The examples checked in with the project are shop parts, including a head cover and a resistor box, rather than a single demo cube.

## How a job is checked

The library has tests around the geometry and the posted motion, so a change to pocket strategy or entry type can be seen as a failing case instead of as a surprise on the machine. The command-line entry point, the workbench, and the viewer all call the same core. There is one place that decides what a pocket is. The interfaces only collect the choices and show the result.
