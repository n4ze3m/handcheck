import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../../components/Common/Layout";
import NewStoreBody from "../../components/Store/New/NewBody";
import { withSessionSsr } from "../../lib/withSession";

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

const NewStore: NextPage = ({ user }: any) => {
  return (
    <>
      <Head>
        <title>New Store / Embd</title>
      </Head>
      <Layout>
        <NewStoreBody />
      </Layout>
    </>
  );
};

export default NewStore;
