import { getProviders, getSession, signIn } from "next-auth/react";
import styled from "styled-components";

const StyledFormContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 25%;
    transform: translate(-50%, 0);
    max-width: 350px;
    width: 100%;
    display: grid;
    gap: 1rem;
`
const StyledForm = styled.form`
    display: grid;
    gap: 1rem;

    .form-block {
        display: flex;
        flex-direction: column;
        gap: .25rem;
    }

    .input-field {
        padding: .25em .5em;
        border: 1px solid gray;
        border-radius: 10px;
    }

    .submit {
        padding: .5em 3em;
        border-radius: 10px;
    }
`

export default function SignIn({ providers }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        // SignIn using the "username-login"
        signIn("username-login", { username: "johndoe", password: "123" });
    }
    return (
        <StyledFormContainer>
            <h1>Sign in</h1>
            <StyledForm onSubmit={handleSubmit}>
                <div className="form-block">
                    <label>Username</label>
                    <input className="input-field" name="username" type="text" />
                </div>

                <div className="form-block">
                    <label>Password</label>
                    <input className="input-field" name="username" type="password" />
                </div>

                <button className="submit" type="submit">Sign in</button>
            </StyledForm>
            {
                Object.values(providers).filter(provider => provider.name !== "Sign in").map((provider) => (
                    <div key={provider.name}>
                        <button onClick={() => signIn(provider.id)}>
                            Sign in with {provider.name}
                        </button>
                    </div>
                ))
            }
        </StyledFormContainer>
    )
}

export async function getServerSideProps(context) {
    const { req, query } = context;

    // If already signed in, redirect to the actual page
    const session = await getSession({ req });
    if (session) {
        return {
            redirect: { destination: query.callbackUrl }
        }
    }
    // Get providers
    return {
        props: {
            providers: await getProviders(context),
        },
    }
}