import { commonObjects } from "./commonObjects";

export const level1Layout = [
  "                                      ",
  "                                      ",
  "                                      ",
  "                 O                    ",
  "                 O                    ",
  "                                      ",
  "                                      ",
  "                                     R",
  "                                      ",
  "                                      ",
];

export const testLevel = [
  "=================================================================================",
  "=                                                                               =",
  "=                                                                               =",
  "=                                                                               =",
  "=                                                                               =",
  "=                                                                               =",
  "=                                                                               =",
  "=                                                                               =",
  "=                                                                               =",
  "=                                                                               =",
  "=                                                                               =",
  "=                                                                               =",
  "=                                                                             < =",
  "=                                                                               =",
  "=================================================================================",
];

export const level1Objects = {
  ...commonObjects,
  R: () => {
    // Rescue point sprite for level 1.
  },
};
