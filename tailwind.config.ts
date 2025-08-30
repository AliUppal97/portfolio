import type { Config } from "tailwindcss";

// all in fixtures is set to tailwind v3 as interims solutions

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			// Premium Color System
  			text: {
  				primary: 'hsl(var(--text-primary))',
  				secondary: 'hsl(var(--text-secondary))',
  				tertiary: 'hsl(var(--text-tertiary))',
  				quaternary: 'hsl(var(--text-quaternary))',
  				inverse: 'hsl(var(--text-inverse))',
  				success: 'hsl(var(--text-success))',
  				warning: 'hsl(var(--text-warning))',
  				error: 'hsl(var(--text-error))',
  				info: 'hsl(var(--text-info))',
  				link: 'hsl(var(--text-link))',
  				'link-hover': 'hsl(var(--text-link-hover))'
  			},
  			surface: {
  				DEFAULT: 'hsl(var(--surface))',
  				variant: 'hsl(var(--surface-variant))'
  			},
  			bg: 'hsl(var(--bg))',
  			// Premium Shadow System
  			shadow: {
  				'1': 'var(--shadow-1)',
  				'2': 'var(--shadow-2)',
  				'3': 'var(--shadow-3)',
  				'4': 'var(--shadow-4)',
  				'5': 'var(--shadow-5)',
  				card: 'var(--shadow-card)',
  				'card-hover': 'var(--shadow-card-hover)'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			// Premium Animation Keyframes
  			'fade-in': {
  				from: { opacity: '0' },
  				to: { opacity: '1' }
  			},
  			'slide-up': {
  				from: { 
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				to: { 
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'scale-in': {
  				from: { 
  					opacity: '0',
  					transform: 'scale(0.95)'
  				},
  				to: { 
  					opacity: '1',
  					transform: 'scale(1)'
  				}
  			},
  			'gradient': {
  				'0%, 100%': { backgroundPosition: '0% 50%' },
  				'50%': { backgroundPosition: '100% 50%' }
  			},
  			'spin-slow': {
  				from: { transform: 'rotate(0deg)' },
  				to: { transform: 'rotate(360deg)' }
  			},
  			'spin-reverse': {
  				from: { transform: 'rotate(360deg)' },
  				to: { transform: 'rotate(0deg)' }
  			},
  			'float': {
  				'0%, 100%': { transform: 'translateY(0px)' },
  				'50%': { transform: 'translateY(-10px)' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			// Premium Animations
  			'fade-in': 'fade-in 0.5s ease-out',
  			'slide-up': 'slide-up 0.5s ease-out',
  			'scale-in': 'scale-in 0.3s ease-out',
  			'gradient': 'gradient 3s ease infinite',
  			'spin-slow': 'spin-slow 20s linear infinite',
  			'spin-reverse': 'spin-reverse 15s linear infinite',
  			'float': 'float 6s ease-in-out infinite'
  		},
  		// Premium Spacing and Layout
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem',
  			'128': '32rem'
  		},
  		// Premium Typography
  		fontSize: {
  			'2xs': ['0.625rem', { lineHeight: '0.75rem' }],
  			'3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
  			'4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em' }],
  			'5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
  			'6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
  			'7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
  			'8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
  			'9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.02em' }]
  		},
  		fontWeight: {
  			thin: '100',
  			extralight: '200',
  			light: '300',
  			normal: '400',
  			medium: '500',
  			semibold: '600',
  			bold: '700',
  			extrabold: '800',
  			black: '900'
  		},
  		// Premium Backdrop Blur
  		backdropBlur: {
  			xs: '2px',
  			'4xl': '72px'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
