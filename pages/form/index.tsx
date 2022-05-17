import type { NextPage } from "next";
import Head from "next/head";
import { withSessionSsr } from "../../lib/withSession";
import Layout from "@/components/Common/Layout";
// import { prisma } from "@/database";


export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (!user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }


    return {
      props: {
        user: req.session?.user,
      },
    };
  }
);

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Form / HandCheck 🤝</title>
      </Head>
      <Layout>
          <div>
              form start from here
          </div>
      </Layout>
    </>
  );
};

export default Home;
