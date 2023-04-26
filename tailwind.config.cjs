/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fill: ["hover"],
    },

    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [
    // ...
    function ({ addUtilities, e, theme }) {
      const newUtilities = {};
      Object.entries(theme("colors")).map(([name, value]) => {
        if (typeof value === "string") {
          newUtilities[`.hover\\:fill-${name}`] = {
            "--fill-color": value,
            fill: "var(--fill-color)",
          };
          newUtilities[`.hover\\:fill-${name}:hover`] = {
            fill: value,
          };
        } else {
          Object.entries(value).map(([shade, color]) => {
            newUtilities[`.hover\\:fill-${name}-${shade}`] = {
              "--fill-color": color,
              fill: "var(--fill-color)",
            };
            newUtilities[`.hover\\:fill-${name}-${shade}:hover`] = {
              fill: color,
            };
          });
        }
      });
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
