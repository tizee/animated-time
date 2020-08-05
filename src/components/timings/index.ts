// y = x
function linear(progress: number) {
  return progress;
}

// y = x*x
function easeInQuad(progress: number) {
  return progress * progress;
}

/**
 * x=0,y=0
 * x=1,y=1
 *
 * flip :y = -(x^2)
 * move up: y = 1 - (x^2)
 * move left: y = 1 - (x-1)*(x-1)
 */
function easeOutQuad(progress: number) {
  return 1 - (progress - 1) * (progress - 1);
}

/**
 * combine
 */
function easeInOutQuad(progress: number) {
  return progress >= 0.5
    ? 1 - 2 * (progress - 1) * (progress - 1)
    : 2 * progress * progress;
}

// y = x ^ 3
function easeInCubic(progress: number) {
  return progress * progress * progress;
}

export const timings: Record<string, any> = {
  linear: linear,
  easeInQuad: easeInQuad,
  easeOutQuad: easeOutQuad,
  easeInOutQuad: easeInOutQuad,
  easeInCubic: easeInCubic,
};
