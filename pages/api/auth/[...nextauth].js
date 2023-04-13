import axios, { AxiosError } from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import frontend from '../../../utils/frontend';

async function refreshAccessToken(tokenObject) {
    console.log("Refresh ", tokenObject)
    try {
        // Get a new set of tokens with a refreshToken
        const tokenResponse = await axios.post(frontend.WebURL + 'api/user/refreshToken', {
            token: tokenObject.refreshToken
        });

        return {
            ...tokenObject,
            accessToken: tokenResponse.data.accessToken,
            accessTokenExpiry: tokenResponse.data.accessTokenExpiry,
            refreshToken: tokenResponse.data.refreshToken
        }
    } catch (error) {
        return {
            ...tokenObject,
            error: "RefreshAccessTokenError",
        }
    }
}

const providers = [
    CredentialsProvider({
        name: 'Credentials',
        authorize: async (credentials) => {
            try {
                console.log("User --> Run ");
                // Authenticate user with credentials
                const user = await axios.post('http://localhost:3000/api/user/login', {
                    password: credentials.password,
                    email: credentials.email
                })

                if (user.data.accessToken) {
                    return user.data;
                }
                return null;
            } catch (e) {
                console.log("RRR ", e.response.data);
                throw new Error(JSON.stringify({message : e.response.data.message}));
            }
        }
    })
]

const callbacks = {
    jwt: async ({token, user}) => {
        if (user) {
            // This will only be executed at login. Each next invocation will skip this part.
            token.accessToken = user.accessToken;
            token.accessTokenExpiry = user.accessTokenExpiry;
            token.refreshToken = user.refreshToken;
        }

        // If accessTokenExpiry is 24 hours, we have to refresh token before 24 hours pass.
        const shouldRefreshTime = Math.round((token.accessTokenExpiry - 60 * 4 * 1000) - Date.now());
        
        // const shouldRefreshTime = Math.round((token.accessTokenExpiry - 60 * 1 * 1000) - Date.now());

        // If the token is still valid, just return it.
        if (shouldRefreshTime > 0) {
            return Promise.resolve(token);
        }

        console.log("Token JJ ", token)
        console.log("User JJ: ", user)
        // If the call arrives after 23 hours have passed, we allow to refresh the token.
        token = refreshAccessToken(token);
        return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
        // Here we pass accessToken to the client to be used in authentication with your API
        session.accessToken = token.accessToken;
        session.accessTokenExpiry = token.accessTokenExpiry;
        session.error = token.error;

        return Promise.resolve(session);
    },
}

export const options = {
    providers,
    callbacks,
    pages: {
        signIn: '/login',
        error: '/login',
    },
    secret: process.env.SECRET_KEY
}

const Auth = (req, res) => NextAuth(req, res, options)
export default Auth;