import Head from 'next/head'
import { Layout, Navbar } from '../src/components'
import {Home as HomeComp } from "../src/screens"

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Next TS</title>
      </Head>
        <Navbar />
        <HomeComp />
    </Layout>
  )
}
