---
name: service-interceptor
description: "Creates API service wrappers that simulate network calls with artificial delays and error rates for robust UI testing (no backend required)."
license: MIT
triggers:
  - "create api service"
  - "mock fetch calls"
  - "simulate network delay"
---

# Service Interceptor

When to use this skill

- Use when UI needs to consume an API-like interface while the backend is absent.
- Triggered by prompts to mock axios/fetch behavior or to add latency/failure simulation.

Instructions

1. First Step: Implement `src/services/api.ts` exporting functions (`getPapers`, `getPaperById`, `searchPapers`) that return Promises and optionally use `setTimeout` to simulate delay.

2. Second Step: Make the delay configurable; expose a `setMockDelay(ms)` helper and an optional `errorRate` flag for testing error states.

3. Third Step: Use mockData fixtures as response payloads and ensure the services return the same shape as a future real API.

Examples

- `await api.getPapers({ page: 1, pageSize: 10 }) // resolves after 300ms with { items, total }`

Notes

- Document how to switch to a real API endpoint later by replacing the service implementation or toggling an environment variable.
