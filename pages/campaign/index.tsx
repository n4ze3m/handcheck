import type { NextPage } from "next";
import Head from "next/head";
import { withSessionSsr } from "../../lib/withSession";
import Layout from "@/components/Common/Layout";
import CampaignHome from "@/components/Campaign/Home/CampaignHome";
import { prisma } from "@/database";

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

    const campaigns = await prisma.campaign.findMany({
      where: {
        user_id: user.id,
      },
    });

    return {
      props: {
        user: req.session?.user,
        campaigns: JSON.parse(JSON.stringify(campaigns)),
      },
    };
  }
);

const Home: NextPage = ({ campaigns }: any) => (
  <>
    <Head>
      <title>Campaign / HandCheck 🤝</title>
    </Head>
    <Layout>
      <CampaignHome campaigns={campaigns}  />
    </Layout>
  </>
);

export default Home;
