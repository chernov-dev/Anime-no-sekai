module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/contexts/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      boxShadow: {
        neumorphic:
          "0.3rem 0.3rem 0.6rem var(--neumorph-primary-dark), -0.2rem -0.2rem 0.5rem var(--neumorph-primary-light)",
        "neumorphic-inner":
          "inset 0.2rem 0.2rem 0.5rem var(--neumorph-primary-dark), inset -0.2rem -0.2rem 0.5rem var(--neumorph-primary-light)",
      },
      colors: {
        primary: "var(--primary-light)",
        "primary-dark": "var(--primary-dark)",
        secondary: "var(--secondary)",
        "neumorph-primary": "var(--neumorph-primary)",
        "neumorph-secondary": "var(--neumorph-secondary)",
        "neumorph-primary-light": "var(--neumorph-primary-light)",
        "neumorph-primary-dark": "var(--neumorph-primary-dark)",
        "neumorph-accent": "var(--neumorph-accent)",
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")({ prefix: "ui" })],
};
