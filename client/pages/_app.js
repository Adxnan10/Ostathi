import "../styles/App.css";
import "../styles/mystylesheet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
/**
 *
 * @WARNING This file exists to only apply globals assets and context for all pages
 */

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Ostathi</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
