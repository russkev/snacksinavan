import colorsys from "colorsys";

export function linearInterpolate(start, distance, end) {
  return start + distance * (end - start);
}

export function linearInterpolateRGB([r1, g1, b1], distance, [r2, g2, b2]) {
  const startHSV = colorsys.rgb2Hsv(r1, g1, b1);
  const endHSV = colorsys.rgb2Hsv(r2, g2, b2);
  const h = linearInterpolate(startHSV.h, distance, endHSV.h);
  const s = linearInterpolate(startHSV.s, distance, endHSV.s);
  const v = linearInterpolate(startHSV.v, distance, endHSV.v);
  const rgb = colorsys.hsv2Rgb(h, s, v);

  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}
