---
paths:
  - "**/__tests__/**"
  - "**/*.test.ts"
  - "**/*.test.tsx"
---

# Testing

- Test files mirror source structure.
- Use `describe` blocks grouped by function name.
- Test names: `it('should return X when given Y')` — behavior-focused, not implementation-focused.
- Arrange-Act-Assert pattern. One assertion concept per test.
- No snapshot tests for logic — only for stable UI components if needed.
