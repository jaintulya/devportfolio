// Shared scroll state — written by SmoothScroll / ScrollTrigger, read by R3F useFrame loops.
// A mutable ref (not React state) so scrolling never re-renders the tree.
export const scrollRef = {
  current: {
    progress: 0,
    y: 0,
    velocity: 0,
    direction: 1,
    activeChapter: 1,
    fogDensity: 0.04,
    lightIntensity: 1.0,
  }
};