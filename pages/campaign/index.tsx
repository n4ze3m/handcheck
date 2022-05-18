import type { NextPage } from "next";
import Head from "next/head";
import { withSessionSsr } from "../../lib/withSession";
import Layout from "@/components/Common/Layout";
import CampaignHome from "@/components/Campaign/Home/CampaignHome";
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

const Home: NextPage = () => (
  <>
    <Head>
      <title>Campaign / HandCheck 🤝</title>
    </Head>
    <Layout>
      <CampaignHome />
    </Layout>
  </>
);

export default Home;
