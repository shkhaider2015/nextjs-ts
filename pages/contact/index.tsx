import Head from "next/head";
import React from "react";
import { Navbar, Layout } from "../../components"
import { Contact as ContactScreen } from "../../screens";

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