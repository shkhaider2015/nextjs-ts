import Head from "next/head";
import React from "react";
import { Navbar, Layout } from "../../components"
import { Login as LoginScreen } from "../../src/screens";
import { useRouter } from "next/router";

const Login = () => {
    return <Layout>
        <Head>
            <title>Login</title>
        </Head>
        <Navbar />
        <LoginScreen />
    </Layout>
}

export default Login;