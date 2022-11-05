module.exports = {
  corePlugins: {
    fontSize: false,
    // ...
  },
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/screens/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/contexts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        neumorphic:
          "0.3rem 0.3rem 0.6rem rgb(var(--neumorph-primary-dark) / 1), -0.2rem -0.2rem 0.5rem rgb(var(--neumorph-primary-light) / 1)",
        "neumorphic-inner":
          "inset 0.2rem 0.2rem 0.5rem rgb(var(--neumorph-primary-dark) / 1), inset -0.2rem -0.2rem 0.5rem rgb(var(--neumorph-primary-light) / 1)",
        "neumorphic-secondary":
          "0.3rem 0.3rem 0.6rem rgb(var(--neumorph-secondary-dark) / 1), -0.2rem -0.2rem 0.5rem rgb(var(--neumorph-secondary-light) / 1)",
        "neumorphic-secondary-inner":
          "inset 0.3rem 0.3rem 0.6rem rgb(var(--neumorph-secondary-dark) / 1), inset -0.2rem -0.2rem 0.5rem rgb(var(--neumorph-secondary-light) / 1)",
      },
      colors: {
        primary: "rgb(var(--primary) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        "primary-dark": "rgb(var(--primary-dark) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        "neumorph-primary": "rgb(var(--neumorph-primary) / <alpha-value>)",
        "neumorph-secondary": "rgb(var(--neumorph-secondary) / <alpha-value>)",
        "neumorph-secondary-light":
          "rgb(var(--neumorph-secondary-light) / <alpha-value>)",
        "neumorph-secondary-dark":
          "rgb(var(--neumorph-secondary-dark) / <alpha-value>)",
        "neumorph-primary-light":
          "rgb(var(--neumorph-primary-light) / <alpha-value>)",
        "neumorph-primary-dark":
          "rgb(var(--neumorph-primary-dark) / <alpha-value>)",
        "neumorph-accent": "rgb(var(--neumorph-accent) / <alpha-value>)",
      },
    },
  },
  plugins: [
    require("@headlessui/tailwindcss")({ prefix: "ui" }),
    require("tailwindcss-fluid-type")({
      // your fluid type settings
      // works only with unitless numbers
      // This numbers are the defaults settings
      settings: {
        fontSizeMin: 1.15, // 1.125rem === 18px
        fontSizeMax: 1.15, // 1.25rem === 20px
        ratioMin: 1.125, // Multiplicator Min
        ratioMax: 1.2, // Multiplicator Max
        screenMin: 20, // 20rem === 320px
        screenMax: 96, // 96rem === 1536px
        unit: "rem", // default is rem but it's also possible to use 'px'
        prefix: "", // set a prefix to use it alongside the default font sizes
        extendValues: true, // When you set extendValues to true it will extend the default values. Set it to false to overwrite the values.
      },
      // Creates the text-xx classes
      // This are the default settings and analog to the tailwindcss defaults
      // Each `lineHeight` is set unitless and we think that's the way to go especially in context with fluid type.
      values: {
        "2xs": [-3, 1.4],
        xs: [-2, 1.4],
        sm: [-1, 1.6],
        base: [-0.5, 1.6],
        lg: [1, 1.6],
        xl: [2, 1.2],
        "2xl": [3, 1.2],
        "3xl": [4, 1.2],
        "4xl": [5, 1.1],
        "5xl": [6, 1.1],
        "6xl": [7, 1.1],
        "7xl": [8, 1],
        "8xl": [9, 1],
        "9xl": [10, 1],
      },
    }),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
  ],
};
