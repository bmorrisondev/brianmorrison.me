/** @type {import('tailwindcss').Config} */


const gradientBlue = "#0381FF";
const gradientPurple = "#BC00BC";

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gradientBlue,
        gradientPurple,
        twitchPurple: "#6643a6",
        twitchPurpleDark: "#4c2a8c",
        twitterBlue: "#1DA1F2",
        instagramPink: "#E4405F",
        githubGreen: "#2DBA4E",
        youtubeRed: "#D60C1C",
        discordPurple: "#7289DA",
        linkedinBlue: "#0077B5",
        hashnodeBlue: "#2962FF",
        "background-accent": "#e0e8ee",
        "accent-1": "#EEF6F9",
        "accent-2": "#e0e8ee",
        "gradient": `linear-gradient(45deg, ${gradientPurple}, ${gradientBlue} 50%)`
      },
      minHeight: {
        "main-standard": "calc(100vh - 106px)",
        "main-mobile": "calc(100vh - 106px)",
      },
    },
  },
  plugins: [],
}
