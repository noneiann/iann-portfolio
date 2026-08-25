// X/Twitter reads its own card image. It is the same 1200×630 artwork, so this
// re-exports the Open Graph route rather than maintaining a second design.
export { default, alt, size, contentType } from "./opengraph-image";
