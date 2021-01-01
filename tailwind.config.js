module.exports = {
  purge: {
    enabled: true,
    mode: 'all',
    preserveHtmlElements: false,
    content: ['./public/*.html']
  },
  theme: {
    fontFamily: {
      sans: ["Ubuntu", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"]
    },
    extend: {
      outline: {
        red: '2px solid #EF4E78',
      },
      colors: {
        'steel': '#E0EEFF',
        'text': '#002F66',
        'link': '#EF4E78',
        'link-hover': '#002F66'
      }
    }
  },
  variants: {},
  plugins: [],
}
