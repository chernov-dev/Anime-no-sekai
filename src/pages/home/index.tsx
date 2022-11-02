import Head from "next/head";
import HomeScreen from "../../screens/HomeScreen";

function HomePage() {
  return (
    <>
      <Head>
        <title>ANS - Home</title>
        <meta name="description" content="ANS - animevost API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full">
        <HomeScreen />
      </main>
    </>
  );
}

// export const getServerSideProps = async (context) => {
//   const queryClient = new QueryClient();
//   let currentPage = context.query.page ?? 1;
//   await queryClient.prefetchQuery(["recent-anime", currentPage], () =>
//     getRecentAnimes(currentPage)
//   );

//   return {
//     props: {
//       currentPage,
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };

export default HomePage;
