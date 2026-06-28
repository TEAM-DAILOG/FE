/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./constants/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        notification: "#AC2823",
        bg: "#F5F9F6",
        white: "#FFFFFF",
        green: {
          100: "#E2EEE9",
          200: "#C2DBD1",
          300: "#A2C8B8",
          400: "#82B5A0",
          500: "#62A287",
          600: "#4D826C",
          700: "#3B6352",
          800: "#284338",
          900: "#15231D",
        },
        gray: {
          0: "#FCFDFD",
          100: "#F1F2F1",
          200: "#E2E4E3",
          300: "#C8CBCA",
          400: "#AEB2B0",
          500: "#949997",
          600: "#7A7F7E",
          700: "#616564",
          800: "#2F3131",
          900: "#020303",
        },
        category: {
          "01": {
            1: "#6A92AF",
            2: "rgba(106, 146, 175, 0.2)",
          },
          "02": {
            1: "#C49C64",
            2: "rgba(196, 156, 100, 0.2)",
          },
          "03": {
            1: "#79A659",
            2: "rgba(121, 166, 89, 0.2)",
          },
          "04": {
            1: "#A381BB",
            2: "rgba(163, 129, 187, 0.2)",
          },
          "05": {
            1: "#BD7593",
            2: "rgba(189, 117, 147, 0.2)",
          },
        },
      },
      fontFamily: {
        suit: ["SUIT"],
      },
      fontSize: {
        "h-01": [
          "20px",
          {
            lineHeight: "30px",
            letterSpacing: "-0.4px",
            fontWeight: "600",
          },
        ],
        "h-02": [
          "18px",
          {
            lineHeight: "27px",
            letterSpacing: "-0.36px",
            fontWeight: "500",
          },
        ],
        "b-01": [
          "18px",
          {
            lineHeight: "27px",
            letterSpacing: "-0.36px",
            fontWeight: "600",
          },
        ],
        "b-02-sb": [
          "16px",
          {
            lineHeight: "24px",
            letterSpacing: "-0.32px",
            fontWeight: "600",
          },
        ],
        "b-02-m": [
          "16px",
          {
            lineHeight: "24px",
            letterSpacing: "-0.32px",
            fontWeight: "500",
          },
        ],
        "b-02-r": [
          "16px",
          {
            lineHeight: "24px",
            letterSpacing: "-0.32px",
            fontWeight: "400",
          },
        ],
        "b-03-sb": [
          "14px",
          {
            lineHeight: "21px",
            letterSpacing: "-0.28px",
            fontWeight: "600",
          },
        ],
        "b-03-m": [
          "14px",
          {
            lineHeight: "21px",
            letterSpacing: "-0.28px",
            fontWeight: "500",
          },
        ],
        "b-03-r": [
          "14px",
          {
            lineHeight: "21px",
            letterSpacing: "-0.28px",
            fontWeight: "400",
          },
        ],
        "b-04-sb": [
          "12px",
          {
            lineHeight: "18px",
            letterSpacing: "-0.24px",
            fontWeight: "600",
          },
        ],
        "b-04-m": [
          "12px",
          {
            lineHeight: "18px",
            letterSpacing: "-0.24px",
            fontWeight: "500",
          },
        ],
        "b-04-r": [
          "12px",
          {
            lineHeight: "18px",
            letterSpacing: "-0.24px",
            fontWeight: "400",
          },
        ],
        "b-05-b": [
          "11px",
          {
            lineHeight: "15.4px",
            letterSpacing: "-0.22px",
            fontWeight: "700",
          },
        ],
        "b-05-m": [
          "11px",
          {
            lineHeight: "15.4px",
            letterSpacing: "-0.22px",
            fontWeight: "500",
          },
        ],
      },
    },
  },
  plugins: [],
};
