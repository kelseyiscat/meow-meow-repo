# Arena Farm landing page plan

## Goal
Create a lightweight, responsive product landing page for **Arena Farm**, positioned as modern farm-management software. The page should clearly explain the value proposition and drive visitors toward a primary **Get started** action.

## Direction
- Visual style: clean modern, light canvas, deep green typography, restrained lime accents, generous spacing.
- Brand concept: one operational view for crops, crews, field activity, and farm performance.
- Voice: clear, practical, optimistic, and grounded in real farm work rather than generic SaaS language.
- Keep the experience fast: no external UI framework, no remote font dependency, minimal JavaScript, and CSS/SVG-based visual treatment.

## Implementation
1. Replace the current React demo surface in `src/App.jsx` with a single-page Arena Farm experience.
2. Rewrite `src/styles.css` with a compact responsive design system and polished mobile/desktop layouts.
3. Update supporting metadata/content in `index.html` as needed.
4. Build these sections:
   - Slim announcement bar and navigation
   - Hero with concise value proposition, two calls to action, and an original product-dashboard mockup
   - Trust/results strip
   - Three core feature cards for planning, field operations, and farm insights
   - Simple workflow section
   - Closing CTA and compact footer
5. Add lightweight interactions: mobile navigation, smooth in-page navigation, and functional CTA behavior without a backend (the primary CTA will open a small on-page signup state or email contact action).
6. Verify accessibility basics: semantic hierarchy, focus states, contrast, reduced-motion support, labeled controls, and keyboard usability.
7. Run tests/build, resolve any issues, then launch the Vite preview for review.

## Assumptions
- Arena Farm is an early-stage farm-tech product, so invented but realistic copy and interface data are acceptable.
- No backend, analytics, authentication, or actual signup integration is required for this first landing-page version.
- Existing unrelated repository demos remain untouched unless they directly conflict with the root Vite app.

## Acceptance criteria
- Looks polished at common mobile and desktop widths.
- Loads without external runtime assets or broken dependencies.
- Communicates what Arena Farm does within the hero viewport.
- Primary CTA is visually prominent and produces a clear response.
- Production build succeeds.
