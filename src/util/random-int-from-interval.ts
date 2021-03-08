/* Thanks to StackOverflow user jonschlinkert: https://stackoverflow.com/a/7228322/6741328, no way I could've come up with this. */
export function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
