# Document Intelligence Platform

Backend team project for **Phase 2** of the IEEE × GitHub Campus Experts 10-Day Codeathon — Backend Track.

This project extends our earlier Notes API into a **Document Intelligence Platform** where authenticated users can upload PDFs, manage stored documents, and eventually interact with them using AI-powered document chat and retrieval systems.

The repository was bootstrapped from our Phase 1 Notes API and expanded into a scalable document-processing backend architecture.

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
* Background processing preparation
* Scalable document-management APIs

Future phases will introduce:

* OCR pipelines
* Embedding generation
* Semantic search
* AI-powered document chat

---

# Team

| Name      | GitHub         | Responsibility                     |
| --------- | -------------- | ---------------------------------- |
| Oyetade Femi | `@FemiPrecious09` | Foundations & storage architecture |
| Sanni Fahd  | `@member-b`    | Upload endpoint                    |
| Adeyemi Adefolarin  | `@zKingFolly`    | Read/delete ownership logic        |

---

# Features

## Current Features (Phase 2 / Day 4)

* JWT-authenticated API
* PDF upload support
* Secure ownership validation
* List uploaded documents
* Retrieve document metadata
* Delete uploaded documents
* PostgreSQL persistence
* Local-disk storage
* Modular Express architecture
* Centralized error handling

---

## Planned Features

* AI-powered document chat
* OCR and text extraction
* Embedding generation
* Semantic search
* Background processing queues
* Cloud object storage support
* AI summarization

---

# Tech Stack

| Layer          | Technology           |
| -------------- | -------------------- |
| Runtime        | Node.js (v18+)       |
| Framework      | Express.js           |
| Database       | PostgreSQL           |
| Authentication | JWT (`jsonwebtoken`) |
| Storage        | Local disk storage   |
| Architecture   | Modular MVC backend  |

---

# Project Structure

```txt
.
├── config/
├── controllers/
├── db/
├── middlewares/
├── migrations/
├── models/
├── routes/
├── utils/
│   ├── groq_util.js
│   └── storage.js
├── storage/
│   └── uploads/
├── server.js
├── .env
├── .env.example
├── .gitignore
├── CONTRIBUTORS.md
├── package.json
└── README.md
```

---

# API Base Path

```txt
/api/v1
```

All document endpoints require:

```http
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

```bash
git clone https://github.com/<your-org>/<your-repo>.git
cd <your-repo>
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
JWT_SECRET=your_jwt_secret
STORAGE_LOCAL_DIR=storage/uploads
MAX_FILE_SIZE_BYTES=10485760
ACTIVE_PORT=8800
```

You should also create a `.env.example` file with the same placeholder variables.

---

## 4. Run Database Migrations

```bash
npm run migrate up
```

---

## 5. Start the Development Server

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Expected output:

```txt
Database connected Successfully
Server is ACTIVE🔥🔥 on http://localhost:8800
```

---

# Environment Variables

| Variable            | Description                  |
| ------------------- | ---------------------------- |
| DATABASE_URL        | PostgreSQL connection string |
| JWT_SECRET          | JWT signing secret           |
| STORAGE_LOCAL_DIR   | Local upload directory       |
| MAX_FILE_SIZE_BYTES | Upload size limit            |
| ACTIVE_PORT         | Express server port          |

See `.env.example` for the complete configuration reference.

---

# Storage Architecture

The platform currently stores uploaded files on local disk through a dedicated storage utility layer.

```txt
Client Upload
    ↓
Express Route
    ↓
Storage Utility
    ↓
Local Disk Storage
```

The architecture was intentionally designed so the storage implementation can later be replaced with cloud providers such as:

* AWS S3
* Cloudflare R2
* Google Cloud Storage
* Azure Blob Storage

without changing the API layer itself.

---

# Security

* JWT-protected routes
* Ownership-based authorization
* File size validation
* Environment-variable secrets management
* Protected upload directories
* Centralized error handling
* `.env` excluded from version control

---

# Branching Workflow

## Git Workflow Rules

* `main` is protected
* No direct pushes to `main`
* All changes go through Pull Requests
* At least one approval required before merge

---

## Example Workflow

```bash
git checkout -b feat/your-feature

# commit your changes

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
* Swagger / OpenAPI documentation
* Automated tests

---

# Contributors

See:

```txt
CONTRIBUTORS.md
```

for detailed contribution ownership.

---

# Previous Phase

The earlier Notes API implementation from Days 1–3 lives in a separate archive repository.

---

# Author / Team

Built during the IEEE × GitHub Campus Experts Codeathon — Backend Track.
