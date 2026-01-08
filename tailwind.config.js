/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"M PLUS Rounded 1c"', '"Noto Sans JP"', 'sans-serif'],
                serif: ['"Shippori Mincho"', 'serif'],
                rounded: ['"M PLUS Rounded 1c"', 'sans-serif'],
            },
            animation: {
                'scroll-left': 'scroll-left 40s linear infinite',
                'fade-in': 'fade-in 1s ease-out forwards',
                'fade-in-down': 'fade-in-down 0.5s ease-out forwards',
                'scale-in': 'scale-in 0.5s ease-out forwards',
            },
            keyframes: {
                'scroll-left': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-in-down': {
                    '0%': { opacity: '0', transform: 'translateY(-10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'scale-in': {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                }
            }
        },
    },
    plugins: [],
}
