import Head from "next/head";
import React from "react";
import { Navbar, Layout } from "../../src/components"
import { Contact as ContactScreen } from "../../src/screens";

const Contact = () => {
    return <Layout>
        <Head>
            <title>Contact</title>
        </Head>
        <Navbar />
        <ContactScreen />
    </Layout>
}

export default Contact;