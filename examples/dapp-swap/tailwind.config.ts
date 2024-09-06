import daisyui from 'daisyui'

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [daisyui],
  theme: {
    extend: {
      colors: {
        subPrimary: '#2d3748',
      },
    },
  },
}
