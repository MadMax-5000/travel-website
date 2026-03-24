/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

// Custom color helper for CSS-variable driven palettes
function customColors(cssVar: string) {
	return ({ opacityVariable, opacityValue }: any) => {
		if (opacityValue !== undefined) return `rgba(var(${cssVar}), ${opacityValue})`;
		if (opacityVariable !== undefined)
			return `rgba(var(${cssVar}), var(${opacityVariable}, 1))`;
		return `rgb(var(${cssVar}))`;
	};
}

module.exports = {
	content: [
		// Your project paths
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./shared/**/*.{js,ts,jsx,tsx,mdx}",

		// Cloned project paths
		"./src/**/*.{js,jsx,ts,tsx}",
		"./public/index.html",
	],

	darkMode: ["class", "class"],

	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				'2xl': '128px'
			}
		},
		extend: {
			colors: {
				primary: {
					'50': '#f0fdf4',
					'100': '#dcfce7',
					'200': '#bbf7d0',
					'300': '#86efac',
					'400': '#4ade80',
					'500': '#22c55e',
					'600': '#16a34a',
					'700': '#15803d',
					'800': '#166534',
					'900': '#14532d',
					'6000': '#18181b',
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					'400': '#fbbf24',
					'500': '#f59e0b',
					'600': '#d97706',
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				green: {
					'50': '#30AF5B',
					'90': '#292C27'
				},
				gray: {
					'10': '#EEEEEE',
					'20': '#A2A2A2',
					'30': '#7B7B7B',
					'50': '#585858',
					'90': '#141414'
				},
				orange: {
					'50': '#FFF7ED',
					'100': '#FFEDD5',
					'200': '#FED7AA',
					'300': '#FDBA74',
					'400': '#FB923C',
					'500': '#EA580C',
					'600': '#C2410C',
					'700': '#9A3412',
					'800': '#7C2D12',
					'900': '#431407',
					'950': '#431407'
				},
				terracotta: {
					'50': '#FEF2F0',
					'100': '#FDECEA',
					'200': '#FBD9D4',
					'300': '#F8C6BE',
					'400': '#E97A6C',
					'500': '#E35336',
					'600': '#C42D1F',
					'700': '#9E2619',
					'800': '#7C1F14',
					'900': '#5A180F'
				},
				blue: {
					'70': '#021639'
				},
				yellow: {
					'50': '#FEC601'
				},
				neutral: {
					'50': '#fafafa',
					'100': '#f5f5f5',
					'200': '#e5e5e5',
					'300': '#d4d4d4',
					'400': '#a3a3a3',
					'500': '#737373',
					'600': '#525252',
					'700': '#404040',
					'800': '#262626',
					'900': '#171717'
				},
				brand: {
					primary: {
						50: customColors("--c-primary-50"),
						100: customColors("--c-primary-100"),
						200: customColors("--c-primary-200"),
						300: customColors("--c-primary-300"),
						400: customColors("--c-primary-400"),
						500: customColors("--c-primary-500"),
						700: customColors("--c-primary-700"),
						800: customColors("--c-primary-800"),
						900: customColors("--c-primary-900"),
						600: customColors("--c-primary-600")
					},
					secondary: {
						'50': customColors("--c-secondary-50"),
						'100': customColors("--c-secondary-100"),
						'200': customColors("--c-secondary-200"),
						'300': customColors("--c-secondary-300"),
						'400': customColors("--c-secondary-400"),
						'500': customColors("--c-secondary-500"),
						'700': customColors("--c-secondary-700"),
						'800': customColors("--c-secondary-800"),
						'900': customColors("--c-secondary-900"),
						'6000': customColors("--c-secondary-600")
					},
					neutral: {
						'50': customColors("--c-neutral-50"),
						'100': customColors("--c-neutral-100"),
						'200': customColors("--c-neutral-200"),
						'300': customColors("--c-neutral-300"),
						'400': customColors("--c-neutral-400"),
						'500': customColors("--c-neutral-500"),
						'700': customColors("--c-neutral-700"),
						'800': customColors("--c-neutral-800"),
						'900': customColors("--c-neutral-900"),
						'6000': customColors("--c-neutral-600")
					}
				},
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
				}
			},
			backgroundImage: {
				'bg-img-1': "url('/castle.png')",
				'bg-img-2': "url('/imsouane.png')",
				'feature-bg': "url('/feature-bg.png')",
				pattern: "url('/pattern.png')",
				'pattern-2': "url('/pattern-bg.png')"
			},
			screens: {
				xs: '400px',
				'3xl': '1680px',
				'4xl': '2200px'
			},
			maxWidth: {
				'10xl': '1512px'
			},
			borderRadius: {
				'5xl': '40px',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				'nc-shadow-lg': '0 10px 40px rgba(0,0,0,0.1)'
			}
		}
	},

	plugins: [
		require("@tailwindcss/typography"),
		require("@tailwindcss/forms"),
		require("@tailwindcss/aspect-ratio"),
		require("tailwindcss-animate")
	],
};