/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      'courier-new': ['Courier New'],
    },
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark", "dracula"],
  },
  plugins: [require("daisyui")],
}

