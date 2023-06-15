/* eslint-disable */
const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
	theme: {
		screens: {
			xs: '500px',
			...defaultTheme.screens
		},
		extend: {
			borderWidth: {
				1: '1px'
			},
			width: {
				64: '16rem'
			}
		}
	},
	plugins: []
};
