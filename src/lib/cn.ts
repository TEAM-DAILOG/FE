import clsx, { type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "h-01",
            "h-02",
            "b-01",
            "b-02-sb",
            "b-02-m",
            "b-02-r",
            "b-03-sb",
            "b-03-m",
            "b-03-r",
            "b-04-sb",
            "b-04-m",
            "b-04-r",
            "b-05-b",
            "b-05-m",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
