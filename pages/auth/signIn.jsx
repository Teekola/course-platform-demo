import { getProviders, getSession, signIn } from "next-auth/react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";

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

    .submit {
        padding: .5em 3em;
        border-radius: 10px;
        margin-top: .5rem;
    }

    .error-message {
        color: red;
        position: absolute;
        transform: translate(.5em, 3.75rem);
    }
`

export default function SignIn({ providers }) {
    const [validationError, setValidationError] = useState(false);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, setError, clearErrors, trigger } = useForm({
        defaultValues: {
            username: "",
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
    }

    const handleBlur = (fieldId) => {
        // Return a function that triggers validation to the field
        return () => trigger(fieldId);
    }


    const onSubmit = async data => {
        // If there is still a validation error,
        // the input has not changed
        if (validationError) {
            setError("password", { type: "manual", message: "Invalid username or password.", shouldFocus: true });
            return;
        }

        // SignIn using the credentials provider with id="username-login"
        const { username, password } = data;
        const response = await signIn("username-login", {
            redirect: false,
            username,
            password
        });

        // If there are no errors, redirect to the callbackurl given by the response
        if (response.ok) router.push(response.url);

        // If there was an error, e.g. the username-password combination was not in the database
        // Set an error
        if (response.error) {
            setError("password", { type: "manual", message: "Invalid username or password.", shouldFocus: true });
            setValidationError(true);
        }
    }

    return (
        <StyledFormContainer>
            <h1>Sign in</h1>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <div className="form-block">
                    <label>Username</label>
                    <input className="input-field" name="username" type="text"
                        {...register("username", {
                            required: "Please, type your username.",
                            onBlur: handleBlur("username"),
                            onChange: handleChange
                        })}
                    />
                    <p className="error-message">{errors.username?.message}</p>
                </div>

                <div className="form-block">
                    <label htmlFor="password">Password</label>
                    <input className="input-field" name="password" type="password"
                        {...register("password", {
                            required: "Please, type your password.",
                            minLength: {
                                value: 3,
                                message: "Your password should have at least 3 characters."
                            },
                            onBlur: handleBlur("password"),
                            onChange: handleChange
                        })}
                    />
                    <p className="error-message">{errors.password?.message}</p>
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