---
title: Pi Datalogger
description: Raspberry Pi 4 Buildroot appliance that keeps a USB link to a CEM DT-172 temperature and humidity logger, stores samples in SQLite, and publishes them over MQTT. The Pi is operated from a CLI and has no on-device web UI.
tags: ['IoT', 'Python', 'Embedded']
demo: '#'
order: 3
---

## What it is

Pi Datalogger is a Raspberry Pi 4 built as an appliance, not as a general-purpose computer with a web app bolted on. The image is a Buildroot root filesystem. Its job is to stay attached to a CEM DT-172 temperature and humidity logger, keep the sample history, and publish it.

The Pi is the collector. Charts, alarm highlighting, and the daily export live on a separate dashboard that subscribes to the broker. If that dashboard is down, the Pi is still logging. If the Pi reboots, the history is already in SQLite and the sync continues from there.

## The link to the logger

The DT-172 speaks a small serial protocol over a CP2102 USB adapter at 9600 8N1. A Python package implements that protocol and exposes it as the `dt172` command. Over SSH, that command is how you see what the logger is doing: whether the link is up, what it last stored, and whether a sync is moving. A background process uses the same protocol to pull samples without someone sitting on the shell.

The board is not only a USB host. The image documents which header pins feed the power adapter and the buzzer, so the appliance can be wired as a box rather than as a Pi with a keyboard. Those pins are part of the product, not an afterthought in a lab notebook.

## What leaves the Pi

Each sample is written locally and published on MQTT. The dashboard reads that stream. Out-of-limit stretches are marked on the chart from the alarm thresholds carried with the messages, so a red segment means the reading crossed the threshold that was published, not a color chosen later by hand. An admin view on the dashboard side sets the logger identity and the header of the daily export. The export is a filled form for the day's record. None of that HTTP surface is on the Pi.

There is no web UI and no HTTP API on the device. Hands-on work is SSH and `dt172`. That keeps the attack surface and the image small, and it means a browser session is not required to trust that logging is still happening.

## Why Buildroot

A full desktop Linux image would boot a lot of software this device never uses, and it would drift every time someone installed a package to try something. Buildroot produces a root filesystem that contains the logger service, the CLI, and the libraries they need. An update is a new image, not a pile of packages on a Pi that was once used as a workstation. You power it on, plug the logger in, and leave it.
