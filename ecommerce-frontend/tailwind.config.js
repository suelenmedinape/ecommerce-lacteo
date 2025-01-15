/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Inclui todos os arquivos HTML e TS dentro do diretório src
    "./node_modules/flowbite/**/*.js", // Inclui todos os arquivos JS dentro do diretório node_modules/flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
