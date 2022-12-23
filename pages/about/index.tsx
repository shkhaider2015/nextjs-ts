import Head from "next/head";
import React from "react";
import { Navbar, Layout } from "../../components"
import { About as AboutScreen } from "../../screens";

const About = () => {
    return <Layout>
        <Head>
            <title>About</title>
        </Head>
        <Navbar />
        <AboutScreen />
    </Layout>
}

export default About;