# ScholarFlow

ScholarFlow is an AI-powered knowledge workspace that helps students, researchers, and lifelong learners organize, understand, and interact with their knowledge. Upload documents, presentations, images, audio, and video, then chat with your content using Retrieval-Augmented Generation (RAG), generate study materials, and manage your learning from a single workspace. The project's vision and planned architecture are described in the accompanying design document. 

---

## Features

- AI-powered document chat with source citations
- Multi-format document upload
- Audio and video transcription
- Rich text note editor
- AI-generated summaries
- Flashcard generation
- Quiz generation
- Semantic search
- To-do management
- Study calendar
- Workspace management


---

## Tech Stack

### Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Framer Motion

### Backend

- Next.js Server Actions
- Supabase
- PostgreSQL

### Authentication

- Clerk

### AI & RAG

- OpenAI GPT-4o
- OpenAI GPT-4.1 Mini
- OpenAI Embeddings
- LangChain
- Pinecone

### Media Processing

- Whisper API
- PDF.js
- Tesseract OCR
- Unstructured

### Editor

- TipTap

### Deployment

- Vercel
- Supabase Cloud
- Pinecone Cloud

### Monitoring & Testing

- Vitest
- Playwright
- Sentry
- PostHog

---

## Project Structure

```
ScholarFlow/
├── app/
├── components/
├── lib/
├── hooks/
├── actions/
├── types/
├── public/
├── styles/
└── ...
```

---

## Roadmap

- Authentication and workspace management
- Document upload pipeline
- AI-powered RAG chat
- Semantic search
- Study Mode
- Audio and video transcription
- Flashcards
- Quiz generation
- Kanban board
- To-do management
- Calendar integration
- Production deployment

---

## Status

ScholarFlow is currently under active development.

The project is being built as a modern AI-powered knowledge workspace with a focus on intelligent document understanding, study assistance, and productivity.

---

## License

This project is licensed under the MIT License.
