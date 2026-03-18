/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        forest: {
          DEFAULT: '#3D7A4F',
          dark:    '#1F4D2E',
          mid:     '#2C6140',
          light:   '#5A9E6A',
          pale:    '#85C093',
          mist:    '#B8DBBF',
          bg:      '#E8F5EA',
        },
        sunny: {
          DEFAULT: '#E8C547',
          bg:      '#FEFAEE',
          dark:    '#8A7200',
        },
        terra: {
          DEFAULT: '#E07A5F',
          bg:      '#FDF2EF',
          dark:    '#7A2F1B',
        },
        skyteal: {
          DEFAULT: '#81B5C4',
          bg:      '#EFF7F9',
          dark:    '#1A3D48',
        },
        charcoal: '#4A4A3F',
        warmwhite: '#F5F2EC',
      },
    },
  },
  plugins: [],
}
