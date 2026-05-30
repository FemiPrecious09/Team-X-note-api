# Document Intelligence Platform

Backend team project for **Phase 2** of the IEEE × GitHub Campus Experts 10-Day Codeathon.

This project extends our earlier Notes API into a **Document Intelligence Platform** where authenticated users can upload PDFs, manage stored documents, and eventually interact with them using AI-powered chat and retrieval systems.

The repository was bootstrapped from our Phase 1 Notes API and expanded into a document-processing backend architecture.

---

# Overview

## Phase 1

The original Notes API introduced:

* RESTful CRUD operations
* JWT authentication
* PostgreSQL persistence
* Backend architecture fundamentals

## Phase 2

This phase focuses on:

* Secure PDF uploads
* File storage architecture
* Ownership-based authorization
* Background document processing preparation
* Scalable document management APIs

Future phases will introduce:

* OCR pipelines
* Embedding generation
* Semantic search
* AI-powered document chat

---

# Team

| Name     | GitHub      | Responsibility                    |
| -------- | ----------- | --------------------------------- |
| You      | `@you`      | Foundations, storage architecture |
| Member B | `@member-b` | Upload endpoint                   |
| Member C | `@member-c` | Read/delete ownership logic       |

---

# Features

## Current Features (Phase 2 / Day 4)

* JWT-authenticated API
* PDF upload support
* Secure document ownership
* List uploaded documents
* Retrieve document metadata
* Delete uploaded documents
* Local-disk storage abstraction
* PostgreSQL persistence
* Modular Express architecture

## Planned Features

* AI-powered document chat
* OCR and text extraction
* Embedding generation
* Semantic search
* Background processing queues
* Cloud object storage support

---

# Tech Stack

| Layer          | Technology          |
| -------------- | ------------------- |
| Runtime        | Node.js (v18+)      |
| Framework      | Express.js          |
| Database       | PostgreSQL          |
| Authentication | JWT                 |
| Storage        | Local disk storage  |
| Architecture   | Modular MVC backend |

---

# Project Structure

```txt id="m2r0kx"
.
├── controllers/
├── routes/
├── models/
├── middlewares/
├── services/
├── storage/
├── db/
├── server.js
├── .env
├── .env.example
├── package.json
└── README.md
```

---

# API Base Path

```txt id="9y5nbo"
/api/v1
```

All document endpoints require:

```http id="9c1b5v"
Authorization: Bearer <token>
```

---

# API Endpoints

| Method | Endpoint                | Description           |
| ------ | ----------------------- | --------------------- |
| POST   | `/api/v1/documents`     | Upload a PDF          |
| GET    | `/api/v1/documents`     | List user documents   |
| GET    | `/api/v1/documents/:id` | Get document metadata |
| DELETE | `/api/v1/documents/:id` | Delete a document     |

---

# Getting Started

## Prerequisites

* Node.js 18+
* PostgreSQL database

---

## 1. Clone the Repository

```bash id="ixrm4m"
git clone https://github.com/<your-org>/document-intelligence-platform.git
cd document-intelligence-platform
```

---

## 2. Install Dependencies

```bash id="q9o2a2"
npm install
```

---

## 3. Configure Environment Variables

```bash id="hm5sl9"
cp .env.example .env
```

Update `.env` with your real configuration values.

---

## 4. Run Database Migrations

```bash id="54z9t9"
npm run migrate up
```

---

## 5. Start the Development Server

```bash id="s4xf0k"
npm run dev
```

Production mode:

```bash id="n2q3zc"
npm start
```

---

# Environment Variables

| Variable            | Description                  |
| ------------------- | ---------------------------- |
| DATABASE_URL        | PostgreSQL connection string |
| JWT_SECRET          | JWT signing secret           |
| STORAGE_DRIVER      | Storage backend (`local`)    |
| STORAGE_LOCAL_DIR   | Local upload directory       |
| MAX_FILE_SIZE_BYTES | Upload size limit            |

See `.env.example` for the full configuration reference.

---

# Storage Architecture

The platform uses a swappable storage abstraction layer.

Current implementation:

```txt id="yobdn9"
Client Upload
    ↓
Express Route
    ↓
Storage Service
    ↓
Local Disk Storage
```

This architecture allows future migration to:

* AWS S3
* Cloudflare R2
* Google Cloud Storage
* Azure Blob Storage

without changing the upload API itself.

---

# Security

* JWT-protected routes
* Ownership-based authorization
* File size validation
* Environment-variable secrets management
* Protected upload directories
* Centralized error handling

---

# Branching Workflow

## Git Workflow Rules

* `main` is protected
* No direct pushes to `main`
* All changes go through Pull Requests
* At least one approval required before merge

---

## Example Workflow

```bash id="xhjlwm"
git checkout -b feat/your-feature

# commit changes

git push -u origin feat/your-feature
```

Then open a Pull Request on GitHub.

---

# Development Roadmap

## Upcoming Features

* Background document processing
* OCR pipeline
* AI summarization
* Vector embeddings
* Semantic retrieval
* AI document chat
* Queue workers
* Cloud storage support
* Docker deployment
* OpenAPI / Swagger docs
* Automated tests

---

# Contributors

See:

```txt id="w6gnlf"
CONTRIBUTORS.md
```

for contribution details and task ownership.

---

# Previous Phase

The earlier Notes API implementation from Days 1–3 lives in a separate archive repository.

---

# Author / Team

Built during the IEEE × GitHub Campus Experts Codeathon — Backend Track.
