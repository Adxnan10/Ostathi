import "../styles/App.css";
import "../styles/sessions.css"
import "../styles/mystylesheet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { SessionProvider } from "next-auth/react"

/**
 *
 * @WARNING This file exists to only apply globals assets and context for all pages
 */

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <title>Ostathi</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>
      <SessionProvider session={session}>
        <Navbar />
        <Component {...pageProps} />
      </SessionProvider>
      <Footer />
    </>
  );
}

export default MyApp;
