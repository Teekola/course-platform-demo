import styled from "styled-components";
import { useSession, signOut } from 'next-auth/react';
import ButtonCTA from '../components/ButtonCTA';
import Link from "next/link";
import { useRouter } from "next/router";


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
	const router = useRouter();

	const handleButtonClick = () => {
		router.push("/auth/signIn?callbackUrl=http://localhost:3000/courses/1", "/signIn");
	}

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
			<ButtonCTA width={300} onClick={handleButtonClick}>Sign in</ButtonCTA>
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