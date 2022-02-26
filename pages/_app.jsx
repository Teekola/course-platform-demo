import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/globalStyle';
import themeDefault from '../styles/themes';


export default function App({ Component, pageProps }) {
	return (
		<>
			<GlobalStyle />
			<ThemeProvider theme={themeDefault}>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	)
}
