---
title: HMGS Quiz
description: Flutter study app for the Turkish HMGS law exam. Practice questions live in Firestore, and a Python pipeline turns statute text into questions with citations.
tags: ['Mobile', 'Flutter', 'Python']
demo: '#'
order: 5
---

## What it is

HMGS Quiz is a mobile study app for the Hukuk Mesleğe Giriş Sınavı, the Turkish exam for entering the legal profession. The phone app is Flutter, Android first. Questions are stored in Firebase Firestore, and a separate Python service writes those questions from the statutes instead of from a hand-typed bank.

The repository is split the way the work is split. `apps/mobile` is the Flutter client. `services/ingestion` turns PDFs into chunks, embeddings, and Qdrant points. `services/rag-api` asks a model for questions and writes them to Firestore with the passages they came from. `packages/shared` holds the subject list and the schemas both sides agree on, so the app and the API do not each invent their own shape for a question. Docker Compose and the Firebase rules live under `infra`. A status note in the repo records what phase 1 actually shipped.

## How a question is made

Statute PDFs stay on disk and out of git. Ingestion splits them into chunks, embeds the chunks, and loads them into Qdrant. When the API needs a question for a subject, it retrieves the passages for that subject and asks the model to write from those passages only. The shared subject list is the contract: a subject the app can show is a subject the retriever knows how to look up.

Each question keeps a citation back to the text it was drawn from. A wrong or invented clause can be checked against the statute instead of trusted because the model sounded sure. That trace is the point of the pipeline. A quiz for a professional exam is not useful if the answer cannot be found in the law. Questions that fail that check do not belong in the bank the app reads.

## The app

Sign-in and the question store go through Firebase. The client shows authentication failures instead of swallowing them, which mattered once the beta was in other people's hands and a silent failure looked like an empty quiz. The free tier has a daily cap. The counter has to reset when the day changes. An early bug left people stuck at the cap until someone cleared it by hand. The reset is part of the phase-1 behavior: the allowance is per day, and the next day starts at zero without an operator.

Beta builds point at Google's test ad units so the ad placement can be checked without serving a live campaign. Kotlin build caches stay out of git. The phase-1 checklist was closed on `main` after `dev` landed. At that point the app could sign a user in, serve a day's questions from Firestore, and stop when the free allowance was used.

## What phase 1 is not

Phase 1 does not try to be the whole course. It does not ship every subject as a finished editorial product, and the law PDFs are not part of the app binary. The shipped slice is the loop: text in a vector store, a question with a citation in Firestore, a Flutter client that can show a day's worth and then stop. Later subjects are more documents through the same ingestion path, not a second app.
