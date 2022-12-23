import Head from "next/head";
import React from "react";
import { Navbar, Layout } from "../../components"
import { Register as RegisterScreen } from "../../screens";

const Register = () => {
    return <Layout>
        <Head>
            <title>Register</title>
        </Head>
        <Navbar />
        <RegisterScreen />
    </Layout>
}

export default Register;