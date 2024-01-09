import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
        pacifico: ['var(--font-pacifico)'],
        poppins: ['var(--font-poppins)'],
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
};

export default config;
