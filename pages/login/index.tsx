import Head from "next/head";
import React from "react";
import { Navbar, Layout } from "../../components"
import { Login as LoginScreen } from "../../screens";

const Login = ({data}:{data:string}) => {
    return <Layout>
        <Head>
            <title>Login</title>
        </Head>
        <Navbar />
        <LoginScreen />
    </Layout>
}

export async function getServerSideProps() {
    // Fetch data from external API
    return {
        props: {
            data: "my data"
        }
    }
  }

export default Login;