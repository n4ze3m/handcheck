import type { NextPage } from "next";
import Head from "next/head";
import { withSessionSsr } from "../lib/withSession";
import Layout from "@/components/Common/Layout";
import HomeBody from "@/components/Home/HomeBody";
import { PrismaClient } from "@prisma/client";
const pirsma = new PrismaClient();

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

    const stores = await pirsma.store.findMany({
      where: {
        user_id: user.id,
      },
    });

    return {
      props: {
        user: req.session?.user,
        stores: JSON.parse(JSON.stringify(stores)),
      },
    };
  }
);

const Home: NextPage = ({ stores }: any) => {
  return (
    <>
      <Head>
        <title>Home / HandCheck 🤝</title>
      </Head>
      <Layout>
        <HomeBody stores={stores} />
      </Layout>
    </>
  );
};

export default Home;
