---
title: EndoVision AI
description: Desktop app for live endoscopic stone detection and segmentation, using the holmium fiber in the frame as a millimetre scale.
tags: ['Healthcare AI', 'Computer Vision', 'Python']
demo: '#'
order: 2
---

## What it is

EndoVision AI is a desktop application for endoscopic stone work. It watches a live camera or a looping video file, overlays a detection or segmentation result, and estimates how large a stone is. The interface is PyQt6 and runs on Windows and Linux with Python 3.10 or newer. Inference uses a CPU PyTorch build, so a CUDA GPU is not required to open the app and run a case.

The repository is an application, not a training notebook. Inference, the Qt interface, annotation helpers, tests, and the model files are separate. A sample video is included so the screen can be exercised without a camera attached. Switching to another video resets the mode to plain playback, so a result from the previous file is not left painted on the new one.

## How size is measured

Pixel size in an endoscope image changes with distance and zoom, so a bounding box alone is not a measurement. The holmium laser fiber is already in the surgical field and has a known diameter. The app finds that fiber in the same frame as the stone and uses it as a millimetre ruler. The stone is scaled against the fiber, not against an assumed working distance.

That only works if the fiber and the stone are both identified. The overlay therefore marks fiber, laser, stone, and tissue, either as masks or as boxes. If the fiber is not in the frame, there is no scale to trust, and the measurement is not presented as if there were.

## What the operator can change

The feed can stay as plain video. Segmentation can be turned on when the overlay is wanted. YOLO and UNet++ are both available, so the same session can use a faster box-style result or a denser mask. Playback speed follows the inference rate instead of racing ahead of it. A performance page shows whether the model is keeping up with the camera.

While the video is running, the operator can still change how the frame sits in the window: dimension, offset, zoom, aiming, and fit. Those are display settings, not a second copy of the model. Keyboard shortcuts move through the session, and the shortcut list can be shown or hidden so it does not cover the image.

## Why the screen is the product

Training runs and weight files are not the thing an operator uses. The screen is. It has to open a camera or a file, keep the overlay aligned when the view is resized, drop back to plain video when the file changes, and say how large the stone is only when the fiber gives it a scale. The rest of the repository exists to make that screen honest.
