/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'pixel': ['"Press Start 2P"', 'cursive'],
            },
        },
    },
    variants: {},
    plugins: [],
}

