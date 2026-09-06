// Shared mouse state — updated by SmoothScroll, read by R3F components.
// Kept in its own module so SmoothScroll never pulls in Three.js.
export const mouseRef = { current: { x: 0, y: 0 } };