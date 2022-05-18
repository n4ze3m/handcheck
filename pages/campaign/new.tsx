import type { NextPage } from "next";
import Head from "next/head";
import Layout from "@/components/Common/Layout";
import NewCampaignBody from "@/components/Campaign/New/NewBody";
import { rapydRequest } from "lib/rapyd";
import { withSessionSsr } from "lib/withSession";

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

    const response = await rapydRequest({
      accessKey: process.env.RAPYD_ACCESS_KEY!,
      secretKey: process.env.RAPYD_SCRET_KEY!,
      method: "GET",
      urlPath: "/v1/data/countries",
    });

    const countries = response.data.data;

    return {
      props: {
        user: req.session?.user,
        countries,
      },
    };
  }
);

const NewStore: NextPage = ({ countries }: any) => {
  return (
    <>
      <Head>
        <title>New Campaign / HandCheck 🤝</title>
      </Head>
      <Layout>
        <NewCampaignBody countries={countries} />
      </Layout>
    </>
  );
};

export default NewStore;
