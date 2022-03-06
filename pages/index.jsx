import styled from "styled-components";
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from "next/link";

const StyledPage = styled.div`
	max-width: 1400px;
	margin: 0 auto;
`

const StyledHero = styled.div`
	margin-top: 5rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;

	button {
		padding: .5em 3em;
	}
	.primary-cta {
		background: tomato;
	}

	.secondary-cta {
		background: none;
		color: tomato;
		border: 2px solid tomato;
	}
`

const Hero = ({ isSignedIn }) => {
	if (isSignedIn) {
		return (
			<StyledHero>
				<h1>You are signed in.</h1>
				<button className="primary-cta" onClick={() => signOut()}>Sign Out</button>
			</StyledHero>
		)
	}

	return (
		<StyledHero>
			<h1>Welcome to the Course Platform Demo.</h1>
			<button className="primary-cta" onClick={() => signIn()}>Sign in</button>
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