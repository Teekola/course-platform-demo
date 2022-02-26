import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
	*, *::before, *::after {
		box-sizing: border-box;
	}
	
	* {
		margin: 0;
		padding: 0;
	}

	html, body {
		height: 100%;
	}

	body {
		font-size: 16px;
		font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
		line-height: 1.5;
		-webkit-font-smoothing: antialiased;
	}
	
	img, picture, video, canvas, svg {
		display: block;
		max-width: 100%;
	}

	input, button, textarea, select {
		font: inherit;
		border: none;
	}

	p, h1, h2, h3, h4, h5, h6 {
		overflow-wrap: break-word;
	}

	table {
		border-collapse: collapse;
		border-spacing: 0;
	}

	#root, #__next {
		isolation: isolate;
	}
`

export default GlobalStyle;