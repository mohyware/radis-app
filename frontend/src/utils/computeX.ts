export default function computeX(
  x_min: number,
  x_max: number,
  x_step: number,
  resample: number
): number[] {
  let x: number[] = [];
  for (let i = x_min; i <= x_max; i += x_step) {
    x.push(i);
  }

  if (resample) {
    console.log("Reducing the payload size");
    // If y is resampled, x also get resampled.

    x = x.filter((_, index) => index % resample === 0);
  }

  return x;
}
