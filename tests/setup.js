import '@testing-library/jest-dom/vitest'
import { afterEach, expect } from 'vitest'
import { cleanup } from '@testing-library/vue'
import { toHaveNoViolations } from 'jest-axe'

// Gör expect(await axe(container)).toHaveNoViolations() tillgängligt i alla tester.
expect.extend(toHaveNoViolations)

// Vitest kör utan globals, så Testing Library rensar inte DOM mellan tester själv.
afterEach(() => cleanup())
