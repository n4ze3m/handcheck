import type { NextPage } from "next";
import Head from "next/head";
import { withSessionSsr } from "../../../lib/withSession";
import { PrismaClient } from "@prisma/client";
import StoreView from "../../../components/Store/View/StoreView";
const prisma = new PrismaClient();

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, params }) {
    const id = params!.id as string;


    const store = await prisma.store.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            Items: true,
            country: true,
            currency: true
        },
    })

    if(!store) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
      props: {
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
        <title>{store.name}</title>
      </Head>
      <StoreView store={store} />
    </>
  );
};

export default NewStore;
