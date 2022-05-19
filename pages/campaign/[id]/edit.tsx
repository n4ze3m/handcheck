import type { NextPage } from "next";
import Head from "next/head";
import Layout from "@/components/Common/Layout";
import { withSessionSsr } from "../../../lib/withSession";
import { prisma } from "@/database";
import EditBody from "@/components/Campaign/Edit/EditBody";

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, params }) {
    const id = params!.id as string;
    const user = req.session.user;

    if (!user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const campaign = await prisma.campaign.findFirst({
      where: {
        id,
        user_id: user.id,
      },
      include: {
        response: true,
      },
    });

    if (!campaign) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        user: req.session?.user,
        campaign: JSON.parse(JSON.stringify(campaign)),
      },
    };
  }
);

const NewStore: NextPage = ({ campaign }: any) => {
  console.log(campaign);
  return (
    <>
      <Head>
        <title>{campaign.name} / HandCheck 🤝</title>
      </Head>
      <Layout>
        <EditBody campaign={campaign} />
      </Layout>
    </>
  );
};

export default NewStore;
