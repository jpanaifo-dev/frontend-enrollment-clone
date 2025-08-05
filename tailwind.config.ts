import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '2.5rem',
          xl: '3rem',
        },
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        gold: {
          50: '#FFF9E5',
          100: '#FFF0C2',
          200: '#FFE299',
          300: '#FFD470',
          400: '#FFC547',
          500: '#FFB61F',
          600: '#E69500',
          700: '#B37300',
          800: '#805200',
          900: '#4D3100',
        },
        primaryEpg: {
          50: '#E6F1FE',
          100: '#CCE3FD',
          200: '#99C7FB',
          300: '#66AAF9',
          400: '#006FEE',
          500: '#005BC4',
          600: '#004493',
          700: '#004493',
          800: '#002E62',
          900: '#001731',
          DEFAULT: '#005BC4', // para usar como `bg-primary`
          foreground: '#ffffff', // para `text-primary-foreground`, puedes ajustarlo si tienes un color específico
        },
        studio: {
          black: '#000000',
          gold: '#D4AF37',
          'gold-light': '#F0D78C',
          'gold-dark': '#A67C00',
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(to right, #D4AF37, #F0D78C, #D4AF37)',
        'gold-gradient-dark':
          'linear-gradient(to right, #A67C00, #D4AF37, #A67C00)',
        'gold-to-black': 'linear-gradient(to right, #D4AF37, #000000)',
        'black-to-gold': 'linear-gradient(to right, #000000, #D4AF37)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        fadeIn: 'fadeIn 0.5s ease-out',
        shimmer: 'shimmer 8s ease-in-out infinite',
      },
    },
  },
  plugins: [animate],
}
export default config
