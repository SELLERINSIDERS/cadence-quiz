// Tailwind v4 removed the standard PostCSS plugin.
// Since we're using pure CSS (no Tailwind utilities), we just need autoprefixer.
module.exports = {
  plugins: {
    autoprefixer: {},
  },
}
