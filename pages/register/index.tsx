import Head from "next/head";
import React from "react";
import { Navbar, Layout } from "../../components"
import { Register as RegisterScreen } from "../../src/screens";

const Register = ({data}:{data:string}) => {
    return <Layout>
        <Head>
            <title>Register</title>
        </Head>
        <Navbar />
        <RegisterScreen />
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

export default Register;