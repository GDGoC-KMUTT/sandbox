/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
        extend: {
            borderRadius: {
                DEFAULT: "val(--radius)",
                lg: "var(--radius-large)",
                md: "var(--radius-medium)",
                sm: "var(--radius-small)",
            },
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: "hsl(var(--primary))",
                secondary: "hsl(var(--secondary))",
                form: "hsl(var(--form)",

                border: "hsl(var(--border))",

                fieldType: {
                    DEFAULT: "hsl(var(--field-type)",
                    foreground: "hsl(var(--field-type-foreground))",
                },
            },
            boxShadow: {
                nav: "0px 4px 8px rgba(0, 0, 0, 0.12)",
                card: "0px 4px 8px rgba(0, 0, 0, 0.12)",
            },
            backgroundImage: {
                'login': "url('src/assets/login_background.png')",
            }
        },
        fontFamily: {
            sans: ['"Ubuntu"', '"Noto Sans Thai"', "sans-serif", "Source Code Pro"],
        },
    },
    plugins: [require("tailwindcss-animate")],
}
