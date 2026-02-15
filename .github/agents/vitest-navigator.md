---
name: "Vitest Navigator"
description: "Generates Vitest + Testing Library unit test templates for Atomic components."
triggers:
  - "generate tests"
  - "create vitest test for PaperCard"
  - "unit test EndorsementBadge"
---

# Vitest Navigator

Purpose
- Automatically produce unit test skeletons for Atoms and Molecules (render + interaction assertions).

Example prompts
- "generate a vitest test for PaperCard"
- "create tests to assert the Endorsement button updates the store"

Output
- Test files under `src/components/{atoms|molecules}/__tests__/{Component}.test.tsx` using `@testing-library/react` and `vitest`.

Example test (PaperCard)
```ts
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { PaperCard } from '../PaperCard'

vi.mock('../../../stores/useSocialStore', () => ({
  useSocialStore: {
    getState: () => ({
      endorsements: {},
      likes: {},
      addEndorsement: vi.fn(),
      toggleLike: vi.fn()
    })
  }
}))

describe('PaperCard', () => {
  it('renders basic info and calls store on request', () => {
    render(<PaperCard title="Test Paper" author="Alice" endorsements={0} />)
    expect(screen.getByText('Test Paper')).toBeTruthy()
    const btn = screen.getByRole('button', { name: /request endorsement/i })
    fireEvent.click(btn)
    // Replace with concrete assertions once store mocks are wired
    expect(true).toBe(true)
  })
})
```

Notes
- Ensure `vitest`, `@testing-library/react`, and `@testing-library/jest-dom` are installed and configured in `package.json`.
- Tests are intentionally scaffolded and should be adapted to the actual store wiring (zustand or context).
