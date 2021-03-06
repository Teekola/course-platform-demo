import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const NEXTAUTH_URL = process.env.NODE_ENV === 'development' ? process.env.NEXTAUTH_URL : `https://${process.env.VERCEL_URL}`;

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			id: "email-login",
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: 'Sign in',
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: { label: "Email", type: "email", placeholder: "email" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials, req) {
				// You need to provide your own logic here that takes the credentials
				// submitted and returns either a object representing a user or value
				// that is false/null if the credentials are invalid.
				// e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
				// You can also use the `req` object to obtain additional parameters
				// (i.e., the request IP address)
				const res = await fetch(`${NEXTAUTH_URL}/api/auth/verifyCredentials`, {
					method: 'POST',
					body: JSON.stringify(credentials),
					headers: { "Content-Type": "application/json" }
				})
				const user = await res.json()

				// If no error and we have user data, return it
				if (res.ok && user) {
					return user
				}
				// Return null if user data could not be retrieved
				return null
			}
		})
	],
	pages: {
		signIn: '/auth/signIn',
	},

	callbacks: {
		session: async ({ session, token }) => {
			if (session?.user) {
				session.user.id = token.sub;
			}
			return session;
		},
	},

	session: {
		strategy: 'jwt'
	}

	// TODO: add userdata to some Contextprovider
})