// Shared scroll state — written by SmoothScroll, read by R3F useFrame loops.
// A mutable ref (not React state) so scrolling never re-renders the tree.
export const scrollRef = { current: { progress: 0, y: 0 } };