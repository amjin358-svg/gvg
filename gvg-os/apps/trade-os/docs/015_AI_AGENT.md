# 015 — AI Agent

## Role

`ai_agent` — procurement copilots that assist humans; do not silently place binding orders without confirmation.

## Capabilities (v1)

| Capability | Description |
|---|---|
| Supplier matching | Rank catalog/suppliers from natural language |
| RFQ drafting | Produce structured RFQ drafts |
| Landed-cost estimate | Unit + freight + duty heuristic |
| HS hints | Suggest HS families (expert review required) |
| Translation | RFQ/product localization (Phase 2) |
| OCR | Extract fields from customs docs (Phase 2) |
| Recommendations | Embedding-based similar SKUs (Phase 2) |

## UX entry

- Route: `/ai`
- Component: `frontend/features/ai/AiAssistantPanel.tsx`
- API (planned): `POST /api/ai/procurement`

## Tooling architecture

```
User prompt
  → AI Orchestrator (Edge Function / route)
  → Tools: searchProducts, estimateLandedCost, draftRfq, classifyHs
  → Model response + citations (SKU / RFQ ids)
  → UI renders reply + optional action buttons
```

## Safety

- Confirm before mutating RFQ/order state
- Log prompts/actions to audit_logs (redact secrets)
- Rate-limit per user/org
- Separate service role from user session when calling privileged tools

## Model stack

- OpenAI chat model for reasoning
- Embeddings + vector search for catalog retrieval
- Optional rerankers for supplier quality

## Related docs

- [006_API_SPEC.md](./006_API_SPEC.md)
- [016_MARKETPLACE.md](./016_MARKETPLACE.md)
- [017_GLOBAL_TRADE.md](./017_GLOBAL_TRADE.md)
