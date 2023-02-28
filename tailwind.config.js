/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gradientBlue: "#0381FF",
        gradientPurple: "#BC00BC",
        twitchPurple: "#6643a6",
        twitchPurpleDark: "#4c2a8c",
        twitterBlue: "#1DA1F2",
        instagramPink: "#E4405F",
        githubGreen: "#2DBA4E",
        youtubeRed: "#D60C1C",
        discordPurple: "#7289DA",
        linkedinBlue: "#0077B5",
        hashnodeBlue: "#2962FF",
      },
      minHeight: {
        "main-standard": "calc(100vh - 106px)",
        "main-mobile": "calc(100vh - 106px)",
      },
    },
  },
  plugins: [],
}
