import Head from "next/head";
import React from "react";
import { Navbar, Layout } from "../../src/components"
import { About as AboutScreen } from "../../src/screens";

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