import { getProviders, getSession, signIn } from "next-auth/react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import ButtonCTA from "../../components/ButtonCTA";

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
    gap: 1.5rem;

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

    .error-message {
        color: red;
        position: absolute;
        transform: translate(.5em, 3.75rem);
    }
`

const WEBSITE_URL = process.env.NODE_ENV === 'development' ? "http://localhost:3000" : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

export default function Register({ providers }) {
    const [validationError, setValidationError] = useState(false);
    const [alreadyInUseError, setAlreadyInUseError] = useState(false);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, setError, clearErrors, trigger } = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const handleChange = () => {
        // If a form field changes, if there is a validation error,
        // remove it and clear manually set password error
        if (validationError) {
            setValidationError(false);
            clearErrors("password");
        }

        // If a form field changes, if there is a alreadyInUse error,
        // remove it and clear manually set password error
        if (alreadyInUseError) {
            setAlreadyInUseError(false);
            clearErrors("password");
        }
    }

    const handleBlur = (fieldId) => {
        // Return a function that triggers validation to the field
        return () => trigger(fieldId);
    }


    const onSubmit = async data => {
        // If there is still a validation error,
        // the input has not changed
        if (validationError) {
            setError("password", { type: "manual", message: "Invalid email or password.", shouldFocus: false });
            return;
        }

        // If there is still a alreadyInUse error,
        // the input has not changed
        if (alreadyInUseError) {
            setError("password", { type: "manual", message: "This email is already in use. Do you want to login instead?", shouldFocus: true });
            return;
        }

        const { email, password } = data;

        // Create salt and hash
        
        // Check if the email is available
        const checkUser = await fetch(`${WEBSITE_URL}/api/users/id?email=${email}`, {
            method: "GET"
        });

        const foundUser = await checkUser.json();

        // If a user was found, set error and return
        if (foundUser.user) {
            setError("password", { type: "manual", message: "This email is already in use. Do you want to login instead?", shouldFocus: true });
            setAlreadyInUseError(true);
            console.log(foundUser);
            return;
        }

        // If there was not an existing user, create new one
        const createUser = await fetch(`${WEBSITE_URL}/api/users`, {
            method: "POST",
            body: JSON.stringify({ email, password})
        });

        // If error occurs in creation, set error
        if (!createUser.ok) {
            setError("password", { type: "manual", message: "Failed to create an account. Please provide valid credentials.", shouldFocus: true });
            setValidationError(true);
            return;
        }

        // SignIn using the credentials provider with id="email-login"
        const response = await signIn("email-login", {
            redirect: false,
            email,
            password
        });

        // If there are no errors, redirect to the callbackurl given by the response
        if (response.ok) router.push(response.url);

        // If there was an error, e.g. the email-password combination was not in the database
        // Set an error
        if (response.error) {
            setError("password", { type: "manual", message: "Invalid email or password.", shouldFocus: true });
            setValidationError(true);
        }
    }

    return (
        <StyledFormContainer>
            <h1>Create new account</h1>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <div className="form-block">
                    <label>Email</label>
                    <input className="input-field" name="email" type="text"
                        {...register("email", {
                            required: "Please, type your email.",
                            onBlur: handleBlur("email"),
                            onChange: handleChange
                        })}
                    />
                    <p className="error-message">{errors.email?.message}</p>
                </div>

                <div className="form-block">
                    <label htmlFor="password">Password</label>
                    <input className="input-field" name="password" type="password"
                        {...register("password", {
                            required: "Please, type your password.",
                            minLength: {
                                value: 8,
                                message: "Your password should have at least 8 characters."
                            },
                            onBlur: handleBlur("password"),
                            onChange: handleChange
                        })}
                    />
                    <p className="error-message">{errors.password?.message}</p>
                </div>
                <ButtonCTA type="submit">Register</ButtonCTA>
            </StyledForm>
            {
                Object.values(providers).filter(provider => provider.name !== "Sign in").map((provider) => (
                    <div key={provider.name}>
                        <button onClick={() => signIn(provider.id)}>
                            Register with {provider.name}
                        </button>
                    </div>
                ))
            }
        </StyledFormContainer>
    )
}

export async function getServerSideProps(context) {
    const { req } = context;

    // If already signed in, redirect to home page
    const session = await getSession({ req });
    if (session) {
        return {
            redirect: { destination: "/courses/1" }
        }
    }
    // Get providers
    return {
        props: {
            providers: await getProviders(context),
        },
    }
}