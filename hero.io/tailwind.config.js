/** @type {import('tailwindcss').Config} */
export default {
    // Tell Tailwind which files to scan for class names
    // It only includes CSS for classes it actually finds in these files
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        //              ↑ ** means any folder, *.{...} means any of these extensions
    ],
    theme: {
        extend: {}, // add custom colors/fonts here later if you want
    },
    plugins: [],
}