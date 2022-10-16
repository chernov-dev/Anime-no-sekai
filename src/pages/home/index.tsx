import Head from "next/head";
import ProtectedWrapper from "../../components/AuthComponents/Protected";
import HomeScreen from "../../screens/HomeScreen";

function HomePage() {
  return (
    <ProtectedWrapper>
      <Head>
        <title>ANS - Home</title>
        <meta name="description" content="ANS - animevost API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full">
        <HomeScreen/>
      </main>
    </ProtectedWrapper>
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
