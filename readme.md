# Resume Analyzer: Intelligent Resume Parser

Welcome to the Resume Analyzer project! This tool uses AI to extract structured,
validated data from unstructured resume content.

## About Val Town

Val Town is a serverless JavaScript/TypeScript runtime that's particularly
well-suited for LLM operations. It provides:

- **Unlimited Runtime**: No 10-second timeout limitations that plague other
  serverless platforms
- **Zero Configuration Deployment**: Instant API endpoints without
  infrastructure setup
- **TypeScript-Native**: Full type safety across your entire API surface

## Technical Approach

### Core Architecture

This solution implements a hybrid architecture optimized for rapid deployment
and maximum performance:

- **Frontend**: Next.js deployed on Vercel - providing a clean UI with React
  Server Components
- **Backend API**: ValTown serverless functions - giving us unlimited runtime
  for LLM operations
- **LLM Integration**: Dual-model approach with OpenAI primary and Anthropic
  fallback
- **Storage**: In-memory for demo purposes with documented path to Supabase
  implementation

This architecture was specifically chosen to maximize development velocity while
demonstrating production-ready thinking. The ValTown backend eliminates the
typical timeout issues that plague serverless platforms when dealing with LLM
operations.

### Service Breakdown

#### 1. ValTown API Services with Hono Framework

ValTown provides a powerful serverless JavaScript/TypeScript runtime that's
perfectly suited for Hono - a lightweight (~14KB) web framework built on Web
Standards. This combination gives us:

- **Unlimited Runtime for LLM Ops**: No 10-second timeout limitations that
  plague other serverless platforms
- **Ultra-Fast Routing**: Hono's RegExpRouter delivers performance other
  frameworks can't match
- **Zero Configuration Deployment**: Instant API endpoints without
  infrastructure setup
- **TypeScript-Native**: Full type safety across your entire API surface
- **Middleware Power**: Hono's middleware ecosystem for validation, auth, and
  error handling
- **Multi-Runtime Compatibility**: Code that can be easily ported to AWS when
  ready

#### 2. Next.js Frontend

We're leveraging Next.js 14 with App Router for our frontend because:

- Server Components reduce client-side JavaScript
- Built-in form validation and state management
- Optimized deployment on Vercel
- TypeScript support for type safety

#### 3. LLM Integration Strategy

Our parsing approach uses a strategic dual-model pattern:

- Primary: OpenAI for initial parsing (optimized for structured data extraction)
- Fallback: Anthropic Claude for edge cases and ambiguities
- Confidence scoring mechanism built into the prompt architecture

## Workflow

To manage code between local development and Val Town, we need to run the
following commands:

```bash
git commit -m "Your commit message"
git push
vt push
```

This ensures that your code is both tracked in version control and deployed to
Val Town's serverless environment.

## Working with Val Town CLI

The Val Town CLI (vt) provides a seamless interface for interacting with Val
Town's services.

### Installation

To install or update to the latest version, run:

```bash
deno install -grAf jsr:@valtown/vt
```

Or if you would prefer a more descriptive command with minimal permissions:

```bash
deno install --global --force --reload --allow-read --allow-write --allow-env --allow-net jsr:@valtown/vt
```

### Authentication

To authenticate with `val.town`, just run `vt`, and you should get the dialog

```
Welcome to the Val Town CLI!

  VT is a companion CLI to interface with Val Town Vals.

  With this CLI, you can:
  - Create and manage Val Town Vals
  - Push and pull changes between your local system and Val Town
  - Watch a directory to keep it automatically synced with Val Town
  - And more!

  To get started, you need to authenticate with Val Town.

? Would you like to open val.town/settings/api in a browser to get an API key? (y/n) ›
```

Respond yes, and ensure you select to create an API key with user read & val
read+write permissions.

Alternatively, you can set the `VAL_TOWN_API_KEY` environment variable to
authenticate. Either as an environment variable, or place it in a .env in your
val.

Now you can run `vt` again to confirm everything is working:

```bash
$ vt --version

vt x.x.xx
```
