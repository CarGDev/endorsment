---
name: "A11y Auditor"
description: "Scans React components and suggests accessibility fixes: ARIA, focus management, and color contrast improvements."
triggers:
  - "audit components for accessibility"
  - "scan PaperCard for a11y"
  - "accessibility report"
---

# A11y Auditor

Purpose
- Provide prioritized accessibility suggestions tailored to an academic dashboard: ARIA labels, keyboard focus, and color contrast checks.

Example prompts
- "audit src/components for accessibility issues"
- "give quick fixes for EndorsementBadge and Request button"

Suggested checks
- Ensure interactive elements have accessible names (use `aria-label` or descriptive text)
- Ensure badges that announce updates use `role="status"` or `aria-live="polite"`
- Provide visible focus styles and ensure keyboard navigation order is logical
- Verify color contrast meets WCAG AA for text and controls; suggest alternative Tailwind classes if insufficient

Quick-fix snippets
- EndorsementBadge (wrap with status and aria-label):
```tsx
<span role="status" aria-label={`${count} endorsements`} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
  {count} Endorsements
</span>
```

- Request Endorsement button (accessible name + focus):
```tsx
<button aria-label={`Request endorsement for ${title}`} className="focus:outline-none focus:ring-2 focus:ring-blue-500">Request Endorsement</button>
```

Output
- A prioritized list of suggestions and optional quick-fix code snippets that can be applied manually or used to create automated edits.
