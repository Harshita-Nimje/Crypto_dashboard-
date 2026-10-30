
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {

      // Custom animations
      animation: {
        fadeIn: "fadeIn 0.6s ease-out forwards",
        float: "float 4s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
        slideUp: "slideUp 0.7s ease-out forwards",
        pulseSlow: "pulse 3s ease-in-out infinite",
      },

      // Custom keyframes
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },

        glow: {
          "0%, 100%": {
            boxShadow: "0 0 10px rgba(16,185,129,0.1)",
          },
          "50%": {
            boxShadow: "0 0 25px rgba(16,185,129,0.35)",
          },
        },

        slideUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(35px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },

      // Custom colors
      colors: {
        crypto: {
          dark: "#080d18",
          card: "#111c2c",
          accent: "#34d399",
          cyan: "#22d3ee",
        },
      },

      // Custom shadows
      boxShadow: {
        neon: "0 0 25px rgba(52,211,153,0.15)",
        card: "0 10px 40px rgba(0,0,0,0.25)",
      },

      // Custom background gradients
      backgroundImage: {
        "crypto-gradient":
          "linear-gradient(135deg, #080d18 0%, #111c2c 50%, #0d1725 100%)",
        "accent-gradient":
          "linear-gradient(135deg, #34d399 0%, #22d3ee 100%)",
      },
    },
  },

  plugins: [],
};
