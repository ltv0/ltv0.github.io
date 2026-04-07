# Unused `@chenglou/pretext` Features

This repository currently uses only the core line-layout primitives from `@chenglou/pretext` in `src/pretext-renderer.ts`:

- `prepare()`
- `prepareWithSegments()`
- `layout()`
- `layoutWithLines()`
- `walkLineRanges()`

The following features are available in Pretext but are not currently used in this codebase.

## Additional layout / measurement helpers

- `measureLineStats(prepared, maxWidth)`
  - Returns `{ lineCount, maxLineWidth }` without allocating line text strings.
  - Useful for fast width-based shrinkwrap logic and line-count calculations.

- `measureNaturalWidth(prepared)`
  - Returns the natural width of a paragraph when no wrapping is applied.
  - Useful for single-line or intrinsic sizing cases.

- `layoutNextLineRange(prepared, start, maxWidth)`
  - Iterates text one line at a time with a variable width.
  - Useful for layouts where available width changes per line, such as floated images or text wrap around shapes.

- `layoutNextLine(prepared, start, maxWidth)`
  - Similar to `layoutNextLineRange` but returns a fully materialized `LayoutLine`.
  - Useful when you need the actual line string while streaming line layout.

- `materializeLineRange(prepared, lineRange)`
  - Converts a previously computed `LayoutLineRange` into full line text.
  - Useful when you want low-allocation line traversal and only final materialization for rendering.

## Cache / locale helpers

- `clearCache()`
  - Clears Pretext internal caches used by `prepare()` and `prepareWithSegments()`.
  - Useful when the app cycles through many fonts, locales, or text variants and needs to release cache.

- `setLocale(locale)`
  - Sets the locale used for future `prepare()` calls.
  - Useful for multilingual apps that need locale-sensitive line breaking or text shaping behavior.

## Rich inline text support (separate package)

Pretext also provides `@chenglou/pretext/rich-inline`, which is not currently used here.
It supports inline-rich flow for text fragments with independent fonts, atomic items, and extra width.

Common rich-inline APIs:

- `prepareRichInline(items)`
- `walkRichInlineLineRanges(prepared, maxWidth, onLine)`
- `layoutNextRichInlineLineRange(prepared, maxWidth, start)`
- `materializeRichInlineLineRange(prepared, lineRange)`
- `measureRichInlineStats(prepared, maxWidth)`

## Useful `prepare()` options not currently leveraged

- `whiteSpace: 'normal' | 'pre-wrap'`
  - Controls whitespace handling for browser-like text wrapping.

- `wordBreak: 'normal' | 'keep-all'`
  - Controls breaking behavior for CJK / Hangul text and long runs.

## Notes

This file is intended as a quick reference for additional Pretext capabilities that could be adopted if the project grows beyond the current renderer use cases.
