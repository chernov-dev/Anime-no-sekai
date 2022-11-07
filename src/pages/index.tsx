import Head from "next/head";
import WelcomePageScreen from "../screens/WelcomePageScreen";

function WelcomePage() {
  return (
    <>
      <Head>
        <title>ANS - Welcome</title>
        <meta name="description" content="ANS - animevost API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WelcomePageScreen />
    </>
  );
}

export default WelcomePage;
