import type { NextPage } from "next";
import Head from "next/head";
import Layout from "@/components/Common/Layout";
import { withSessionSsr } from "../../../lib/withSession";
import { prisma } from "@/database";
import EditBody from "@/components/Store/Edit/EditBody";

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

    const store = await prisma.store.findFirst({
      where: {
        id,
        user_id: user.id,
      },
      include: {
        Items: true,
        Checkout: {
          where: {
            completed: true
          },
        }
      },
    });

    if (!store) {
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
        store: JSON.parse(JSON.stringify(store)),
      },
    };
  }
);

const NewStore: NextPage = ({ store }: any) => {
  console.log(store)
  return (
    <>
      <Head>
        <title>{store.name} / HandCheck 🤝</title>
      </Head>
      <Layout>
        <EditBody store={store} />
      </Layout>
    </>
  );
};

export default NewStore;
