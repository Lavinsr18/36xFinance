// import type { Config } from "tailwindcss";

// export default {
//   darkMode: ["class"],
//   content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {
//       borderRadius: {
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//         card: {
//           DEFAULT: "var(--card)",
//           foreground: "var(--card-foreground)",
//         },
//         popover: {
//           DEFAULT: "var(--popover)",
//           foreground: "var(--popover-foreground)",
//         },
//         primary: {
//           DEFAULT: "var(--primary)",
//           foreground: "var(--primary-foreground)",
//         },
//         secondary: {
//           DEFAULT: "var(--secondary)",
//           foreground: "var(--secondary-foreground)",
//         },
//         muted: {
//           DEFAULT: "var(--muted)",
//           foreground: "var(--muted-foreground)",
//         },
//         accent: {
//           DEFAULT: "var(--accent)",
//           foreground: "var(--accent-foreground)",
//         },
//         destructive: {
//           DEFAULT: "var(--destructive)",
//           foreground: "var(--destructive-foreground)",
//         },
//         border: "var(--border)",
//         input: "var(--input)",
//         ring: "var(--ring)",
//         chart: {
//           "1": "var(--chart-1)",
//           "2": "var(--chart-2)",
//           "3": "var(--chart-3)",
//           "4": "var(--chart-4)",
//           "5": "var(--chart-5)",
//         },
//         sidebar: {
//           DEFAULT: "var(--sidebar-background)",
//           foreground: "var(--sidebar-foreground)",
//           primary: "var(--sidebar-primary)",
//           "primary-foreground": "var(--sidebar-primary-foreground)",
//           accent: "var(--sidebar-accent)",
//           "accent-foreground": "var(--sidebar-accent-foreground)",
//           border: "var(--sidebar-border)",
//           ring: "var(--sidebar-ring)",
//         },
//       },
//       keyframes: {
//         "accordion-down": {
//           from: {
//             height: "0",
//           },
//           to: {
//             height: "var(--radix-accordion-content-height)",
//           },
//         },
//         "accordion-up": {
//           from: {
//             height: "var(--radix-accordion-content-height)",
//           },
//           to: {
//             height: "0",
//           },
//         },
//       },
//       animation: {
//         "accordion-down": "accordion-down 0.2s ease-out",
//         "accordion-up": "accordion-up 0.2s ease-out",
//       },
//     },
//   },
//   plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
// } satisfies Config;


// import type { Config } from "tailwindcss";

// export default {
//   darkMode: ["class"],
//   content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {
//       borderRadius: {
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },
//       colors: {
//         background: "hsl(var(--background))",
//         foreground: "hsl(var(--foreground))",
//         card: {
//           DEFAULT: "hsl(var(--card))",
//           foreground: "hsl(var(--card-foreground))",
//         },
//         popover: {
//           DEFAULT: "hsl(var(--popover))",
//           foreground: "hsl(var(--popover-foreground))",
//         },
//         primary: {
//           DEFAULT: "hsl(var(--primary))",
//           foreground: "hsl(var(--primary-foreground))",
//         },
//         secondary: {
//           DEFAULT: "hsl(var(--secondary))",
//           foreground: "hsl(var(--secondary-foreground))",
//         },
//         muted: {
//           DEFAULT: "hsl(var(--muted))",
//           foreground: "hsl(var(--muted-foreground))",
//         },
//         accent: {
//           DEFAULT: "hsl(var(--accent))",
//           foreground: "hsl(var(--accent-foreground))",
//         },
//         destructive: {
//           DEFAULT: "hsl(var(--destructive))",
//           foreground: "hsl(var(--destructive-foreground))",
//         },
//         border: "hsl(var(--border))",
//         input: "hsl(var(--input))",
//         ring: "hsl(var(--ring))",
//         chart: {
//           "1": "hsl(var(--chart-1))",
//           "2": "hsl(var(--chart-2))",
//           "3": "hsl(var(--chart-3))",
//           "4": "hsl(var(--chart-4))",
//           "5": "hsl(var(--chart-5))",
//         },

//         // 🎨 Brand Colors (36x Finance)
//         'royal-purple': {
//           DEFAULT: '#6B46C1',
//           50: '#F3F1FF',
//           100: '#E8E2FF',
//           200: '#D1C5FF',
//           300: '#B9A8FF',
//           400: '#A28BFF',
//           500: '#6B46C1',
//           600: '#5B38A3',
//           700: '#4B2A85',
//           800: '#3B1C67',
//           900: '#2B0E49',
//         },
//         'deep-blue': {
//           DEFAULT: '#1E40AF',
//           50: '#EBF0FF',
//           100: '#D7E1FF',
//           200: '#AFC3FF',
//           300: '#87A5FF',
//           400: '#5F87FF',
//           500: '#1E40AF',
//           600: '#1933A3',
//           700: '#142697',
//           800: '#0F198B',
//           900: '#0A0C7F',
//         },
//         'golden': {
//           DEFAULT: '#F59E0B',
//           50: '#FEF7E6',
//           100: '#FDEFD0',
//           200: '#FBE0A1',
//           300: '#F9D072',
//           400: '#F7C143',
//           500: '#F59E0B',
//           600: '#D1840A',
//           700: '#AD6B08',
//           800: '#895207',
//           900: '#653905',
//         },
//         'light-golden': '#FEF3C7',
//         'charcoal': '#374151',
//         'light-white': '#F9FAFB',
//         'soft-grey': '#F3F4F6',
//         'dark-grey': '#374151',
//       },
//       fontFamily: {
//         helvetica: ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
//         sans: ["var(--font-sans)"],
//         serif: ["var(--font-serif)"],
//         mono: ["var(--font-mono)"],
//       },
//       keyframes: {
//         "accordion-down": {
//           from: { height: "0" },
//           to: { height: "var(--radix-accordion-content-height)" },
//         },
//         "accordion-up": {
//           from: { height: "var(--radix-accordion-content-height)" },
//           to: { height: "0" },
//         },
//         fadeIn: {
//           from: { opacity: '0' },
//           to: { opacity: '1' },
//         },
//         slideUp: {
//           from: { transform: 'translateY(30px)', opacity: '0' },
//           to: { transform: 'translateY(0)', opacity: '1' },
//         },
//       },
//       animation: {
//         "accordion-down": "accordion-down 0.2s ease-out",
//         "accordion-up": "accordion-up 0.2s ease-out",
//         "fade-in": "fadeIn 0.6s ease-in-out",
//         "slide-up": "slideUp 0.8s ease-out",
//         "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
//       },
//     },
//   },
//   plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
// } satisfies Config;





// import type { Config } from "tailwindcss";

// export default {
//   darkMode: ["class"],
//   content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {
//       borderRadius: {
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },
//       colors: {
//         background: "hsl(var(--background))",
//         foreground: "hsl(var(--foreground))",
//         card: {
//           DEFAULT: "hsl(var(--card))",
//           foreground: "hsl(var(--card-foreground))",
//         },
//         popover: {
//           DEFAULT: "hsl(var(--popover))",
//           foreground: "hsl(var(--popover-foreground))",
//         },
//         primary: {
//           DEFAULT: "hsl(var(--primary))",
//           foreground: "hsl(var(--primary-foreground))",
//         },
//         secondary: {
//           DEFAULT: "hsl(var(--secondary))",
//           foreground: "hsl(var(--secondary-foreground))",
//         },
//         muted: {
//           DEFAULT: "hsl(var(--muted))",
//           foreground: "hsl(var(--muted-foreground))",
//         },
//         accent: {
//           DEFAULT: "hsl(var(--accent))",
//           foreground: "hsl(var(--accent-foreground))",
//         },
//         destructive: {
//           DEFAULT: "hsl(var(--destructive))",
//           foreground: "hsl(var(--destructive-foreground))",
//         },
//         border: "hsl(var(--border))",
//         input: "hsl(var(--input))",
//         ring: "hsl(var(--ring))",
//         chart: {
//           "1": "hsl(var(--chart-1))",
//           "2": "hsl(var(--chart-2))",
//           "3": "hsl(var(--chart-3))",
//           "4": "hsl(var(--chart-4))",
//           "5": "hsl(var(--chart-5))",
//         },
//         sidebar: {
//           DEFAULT: "var(--sidebar)",
//           foreground: "var(--sidebar-foreground)",
//           primary: "var(--sidebar-primary)",
//           "primary-foreground": "var(--sidebar-primary-foreground)",
//           accent: "var(--sidebar-accent)",
//           "accent-foreground": "var(--sidebar-accent-foreground)",
//           border: "var(--sidebar-border)",
//           ring: "var(--sidebar-ring)",
//         },

//         // Brand Colors
//         'royal-purple': { DEFAULT: '#6B46C1' },
//         'deep-blue': { DEFAULT: '#1E40AF' },
//         'golden': { DEFAULT: '#F59E0B' },
//         'light-golden': '#FEF3C7',
//         'charcoal': '#374151',
//         'light-white': '#F9FAFB',
//         'soft-grey': '#F3F4F6',
//         'dark-grey': '#374151',
//       },
//       fontFamily: {
//         helvetica: ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
//         sans: ["var(--font-sans)"],
//         serif: ["var(--font-serif)"],
//         mono: ["var(--font-mono)"],
//       },
//       keyframes: {
//         "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
//         "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
//         fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
//         slideUp: { from: { transform: 'translateY(30px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
//         gradient: {
//           "0%": { "background-position": "0% 50%" },
//           "50%": { "background-position": "100% 50%" },
//           "100%": { "background-position": "0% 50%" },
//         },
//         float: { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-20px)" } },
//         slideIn: { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
//         scaleIn: { from: { opacity: "0", transform: "scale(0.9)" }, to: { opacity: "1", transform: "scale(1)" } },
//       },
//       animation: {
//         "accordion-down": "accordion-down 0.2s ease-out",
//         "accordion-up": "accordion-up 0.2s ease-out",
//         "fade-in": "fadeIn 0.6s ease-in-out",
//         "slide-up": "slideUp 0.8s ease-out",
//         gradient: "gradient 15s ease infinite",
//         float: "float 6s ease-in-out infinite",
//         "slide-in": "slideIn 0.5s ease-out",
//         "scale-in": "scaleIn 0.3s ease-out",
//         "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
//       },
//     },
//   },
//   plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
// } satisfies Config;



import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },

        // 🎨 Brand Colors (36x Finance)
        'royal-purple': {
          DEFAULT: '#6B46C1',
          50: '#F3F1FF',
          100: '#E8E2FF',
          200: '#D1C5FF',
          300: '#B9A8FF',
          400: '#A28BFF',
          500: '#6B46C1',
          600: '#5B38A3',
          700: '#4B2A85',
          800: '#3B1C67',
          900: '#2B0E49',
        },
        'deep-blue': {
          DEFAULT: '#1E40AF',
          50: '#EBF0FF',
          100: '#D7E1FF',
          200: '#AFC3FF',
          300: '#87A5FF',
          400: '#5F87FF',
          500: '#1E40AF',
          600: '#1933A3',
          700: '#142697',
          800: '#0F198B',
          900: '#0A0C7F',
        },
        'golden': {
          DEFAULT: '#F59E0B',
          50: '#FEF7E6',
          100: '#FDEFD0',
          200: '#FBE0A1',
          300: '#F9D072',
          400: '#F7C143',
          500: '#F59E0B',
          600: '#D1840A',
          700: '#AD6B08',
          800: '#895207',
          900: '#653905',
        },
        'light-golden': '#FEF3C7',
        'charcoal': '#374151',
        'light-white': '#F9FAFB',
        'soft-grey': '#F3F4F6',
        'dark-grey': '#374151',
      },
      fontFamily: {
        helvetica: ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(30px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.8s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
