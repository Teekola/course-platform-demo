import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/globalStyle';
import themeDefault from '../styles/themes';
import { SessionProvider } from 'next-auth/react';


export default function App({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<>
			<GlobalStyle />
			<ThemeProvider theme={themeDefault}>
				<SessionProvider session={session}>
					<Component {...pageProps} />
				</SessionProvider>
			</ThemeProvider>
		</>
	)
}
