import styled from "styled-components";
import { useSession, signIn, signOut } from 'next-auth/react';
import ButtonCTA from '../components/ButtonCTA';


const StyledPage = styled.div`
	max-width: 1400px;
	margin: 0 auto;
`

const StyledHero = styled.div`
	margin-top: 5rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
`

const Hero = ({ isSignedIn }) => {
	if (isSignedIn) {
		return (
			<StyledHero>
				<h1>You are signed in.</h1>
				<ButtonCTA width={300} onClick={() => signOut()}>Sign out</ButtonCTA>
			</StyledHero>
		)
	}

	return (
		<StyledHero>
			<h1>Welcome to the Course Platform Demo.</h1>
			<ButtonCTA width={300} onClick={() => signIn()}>Sign in</ButtonCTA>
		</StyledHero>
	)
}

export default function Home() {
	const { data: session } = useSession();

	if (session) {
		return (
			<StyledPage>
				<Hero isSignedIn />
			</StyledPage>
		)
	}

	return (
		<StyledPage>
			<Hero />
		</StyledPage>
	)

}