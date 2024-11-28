/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#467ac0",
          "primary-content": "#ffffff",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#467ac0",
          // "primary-content": "#ffffff",
        },
        corporate: {
          ...require("daisyui/src/theming/themes")["corporate"],
          primary: "#467ac0",
          // "primary-content": "#ffffff",
        },
        business: {
          ...require("daisyui/src/theming/themes")["business"],
          primary: "#467ac0",
        },
      },
    ],
  },

  plugins: [require("daisyui")],
};
