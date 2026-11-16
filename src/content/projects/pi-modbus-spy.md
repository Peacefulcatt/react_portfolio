---
title: Pi Modbus Spy
description: Raspberry Pi Buildroot tool that passively sniffs Modbus TCP and can poll slaves, then serves one in-memory store as JSON and a live dashboard. Written in stdlib Python only.
tags: ['IoT', 'Python', 'Embedded']
demo: '#'
order: 4
---

## What it is

Pi Modbus Spy watches Modbus TCP from a Raspberry Pi 4 and shows the conversation as it happens. It is a Buildroot appliance, same idea as the datalogger: a small Linux image with one job. The program is about 2,500 lines of the Python standard library. It does not use pymodbus, scapy, libpcap, or a web framework, which is what lets it fit beside a minimal system on an 8 GB card.

The decode, the store, and the page that shows them are one program. A reading does not cross a queue of services before it can be seen. Tests cover the decode path, and the image is built and copied to the board with a Makefile. The target image has no rsync, so deploy is a tar over SSH.

## Two ways to see the bus

The sniffer is passive. It reads frames off the wire below the IP stack and decodes the exchange between a master that is already there and its slaves. It transmits nothing, so it can sit on a mirror port or a tap without becoming another device on the network. The existing master keeps its timing. The Pi is only listening.

The poller is active. It connects as a Modbus master and reads the register blocks you configure, on an interval. Use it when there is no other master to listen to, or when you want a specific block sampled on your own clock. Both can run at once. A passive capture of the real conversation and a polled block you asked for land in the same place.

## One store, two readers

Everything they decode goes into one in-memory store. A small HTTP server exposes that store as JSON and as a live dashboard. A browser and another program therefore see the same readings, taken from the same memory, not from two caches that can drift apart. The store is the live picture. It is not a historian. Long-term retention is a different job. This box is for watching the bus now.

## Keeping the capture quiet

The capture interface should not also carry the dashboard traffic. Extra packets on the link you are recording change the thing you came to see, and they make a passive tap less passive. The image serves the dashboard over Wi-Fi and leaves the Ethernet interface for the Modbus segment. You watch the registers from the wireless side. The wired side stays the segment under observation.

SSH is there for deploy and for looking at the box itself. It is not the way you read registers. The dashboard and the JSON feed are.
