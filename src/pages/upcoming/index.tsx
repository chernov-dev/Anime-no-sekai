import Head from "next/head";
import UpcomingAnimeScreen from "../../screens/UpcomingAnimeScreen";


const UpcomingAnimesPage = () => {


  return (
    <>
      <Head>
        <title>ANS - Top</title>
        <meta name="description" content="ANS - animevost API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <UpcomingAnimeScreen />
      </main>
    </>
  );
};

// export const getStaticProps = async () => {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery(["anime-upcoming"], () =>
//     getUpcomingAnimes()
//   );

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };

export default UpcomingAnimesPage;
