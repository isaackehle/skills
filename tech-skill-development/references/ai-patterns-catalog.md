# AI Patterns Catalog

Reference catalog of AI/ML patterns commonly required in job descriptions, with implementation approaches and learning resources.

## RAG (Retrieval-Augmented Generation)

**What it is:** Augment LLM responses with retrieved context from a knowledge base.

**Core components:**
1. Document ingestion: chunk, embed, store
2. Retrieval: query embedding → similarity search → top-k results
3. Generation: system prompt + retrieved context + user query → LLM

**Key decisions:**
- Chunking strategy: fixed-size (with overlap), sentence-level, semantic (by topic)
- Embedding model: OpenAI ada-002, Cohere embed-v3, local (BGE, E5)
- Vector store: pgvector, Qdrant, Pinecone, Weaviate, ChromaDB
- Retrieval: dense (vector), sparse (BM25), hybrid (both + reranking)

**Common pitfalls:**
- Too-large chunks → noisy retrieval
- No overlap → missed boundary information
- Ignoring metadata filtering (date, category, permissions)
- Not evaluating retrieval quality (just checking if it "works")

**Learning resources:**
- [LangChain RAG tutorial](https://python.langchain.com/docs/tutorials/rag/)
- [LlamaIndex RAG guide](https://docs.llamaindex.ai/en/stable/getting_started/concepts/)
- [Pinecone RAG learning center](https://www.pinecone.io/learn/)

## Agentic Loops

**What it is:** An AI system that autonomously reasons, plans, and executes multi-step tasks using tools.

**Core components:**
1. Agent loop: observe → think → act → observe
2. Tool definitions: structured function schemas the agent can call
3. Memory: conversation history + working memory + long-term memory
4. Guardrails: constraints on agent behavior, human-in-the-loop for critical actions

**Key patterns:**
- **ReAct:** Reason + Act interleaved (most common)
- **Plan-and-Execute:** Plan all steps, then execute sequentially
- **Reflexion:** Execute, critique, retry with feedback
- **Multi-agent:** Specialized agents collaborate (planner, researcher, coder)

**Key decisions:**
- Tool granularity (few powerful tools vs many specific tools)
- Max iterations (prevent infinite loops)
- Error recovery (retry, fallback, ask user)
- Context management (what stays in the prompt window)

**Common pitfalls:**
- Over-agenting (using an agent when a simple API call suffices)
- No iteration limit → infinite loops
- Tool descriptions too vague → agent misuses tools
- No human confirmation for destructive/expensive actions

**Learning resources:**
- [Anthropic tool use docs](https://docs.anthropic.com/en/docs/build-with-claude/tool-use)
- [LangGraph agent guide](https://langchain-ai.github.io/langgraph/)
- [CrewAI multi-agent framework](https://docs.crewai.com/)

## Vector Orchestration

**What it is:** Managing the lifecycle of vector embeddings — generation, storage, indexing, retrieval, and updates.

**Core components:**
1. Embedding pipeline: text → embedding model → vector
2. Vector store: index type (HNSW, IVFFlat), distance metric, metadata
3. Query pipeline: query embed → ANN search → rerank → results
4. Sync pipeline: source update → re-embed → upsert into store

**Key decisions:**
- Distance metric: cosine (normalized), L2 (Euclidean), inner product
- Index type: HNSW (fast, memory-heavy), IVFFlat (partition-based), flat (exact, slow)
- Dimension: model-dependent (OpenAI 1536, Cohere 1024, local 768)
- Metadata: filter before or after vector search (pre-filter vs post-filter)

**Common pitfalls:**
- Not tuning HNSW parameters (ef_construction, M)
- Ignoring embedding staleness (source data changed, vectors didn't update)
- No metadata filtering → irrelevant results

## MLOps Observability for LLMs

**What it is:** Monitoring LLM systems in production for cost, latency, quality, and reliability.

**Core metrics:**
1. **Cost:** Tokens in/out per request, cost per query, daily/monthly spend
2. **Latency:** Time to first token (TTFT), total response time, p50/p95/p99
3. **Quality:** Retrieval relevance scores, hallucination rate, user feedback
4. **Reliability:** Error rate, timeout rate, fallback rate, uptime

**Implementation patterns:**
- Structured logging: every LLM call logged with input/output/tokens/latency/model
- Tracing: distributed traces across RAG → LLM → response pipeline
- Dashboards: cost over time, latency percentiles, error rates
- Alerts: cost spike, latency degradation, error rate threshold

**Common pitfalls:**
- Only tracking "does it work" not "how well does it work"
- No per-model cost tracking (GPT-4 vs GPT-3.5 vs Claude Haiku)
- Ignoring TTFT (users perceive latency from first token, not last)

## PII Redaction

**What it is:** Detecting and removing personally identifiable information before sending to LLMs.

**Core components:**
1. Detection: Named Entity Recognition (NER) for PII types
2. Redaction: Replace PII with placeholders [NAME_1], [SSN_1]
3. Re-injection: Replace placeholders with original PII in responses

**Key decisions:**
- Detection approach: regex (fast, limited), NER model (accurate, slower), hybrid
- PII types: name, email, phone, SSN, DOB, address, MRN, credit card
- Redaction format: placeholder vs pseudonym (John → [NAME_1] vs Alex)
- Scope: full redaction vs selective (e.g., keep first name)

**Tools:**
- [Microsoft Presidio](https://microsoft.github.io/presidio/) — open-source PII anonymizer
- [AWS Comprehend](https://aws.amazon.com/comprehend/) — managed PII detection
- [Google DLP](https://cloud.google.com/dlp) — managed data loss prevention

## Prompt Injection Defense

**What it is:** Preventing malicious prompts from manipulating LLM behavior.

**Attack types:**
1. **Direct injection:** User message contains instructions to override system prompt
2. **Indirect injection:** Malicious content in retrieved data (RAG poisoning)
3. **System prompt extraction:** Tricking the model into revealing its instructions
4. **Data exfiltration:** Getting the model to include hidden data in responses

**Defense patterns:**
- Input validation: length limits, character filtering, pattern detection
- System prompt hardening: explicit instructions to ignore injection attempts
- Output filtering: scan responses for leaked PII or system prompts
- Separate contexts: don't mix user input with retrieved data in same context
- Canary tokens: hidden strings in system prompt, detect if they appear in output

**Learning resources:**
- [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [Simon Willison's prompt injection posts](https://simonwillison.net/tags/prompt-injection/)
- [Anthropic's safety best practices](https://docs.anthropic.com/en/docs/about-claude/safety)

## Streaming Responses

**What it is:** Delivering LLM output token-by-token as it's generated, rather than waiting for complete response.

**Patterns:**
1. **SSE (Server-Sent Events):** HTTP-based, unidirectional, simple. `text/event-stream`
2. **WebSocket:** Bidirectional, more complex. Overkill for most LLM streaming.
3. **Chunked Transfer Encoding:** Raw HTTP chunked response.

**Key decisions:**
- Buffer strategy: send each token immediately vs batch every N tokens
- Backpressure: what happens when client reads slower than model generates
- Cancellation: how to stop generation mid-stream (client disconnect, user cancel)

**Frontend patterns:**
- Optimistic UI: show expected result before LLM confirms
- Typing indicators: show "thinking..." while waiting for first token
- Partial rendering: render markdown incrementally as tokens arrive
- Error recovery: handle stream interruption gracefully