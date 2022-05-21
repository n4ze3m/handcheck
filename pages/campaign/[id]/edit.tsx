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
        response:  {
          where: {
            isPaid: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        }
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

    const totalAmoutCollected = await prisma.campaignResponse.findMany({
      where: {
        campaign_id: campaign.id,
        isPaid: true,
        paymentStatus: "PAID",
      },
    });

    const totalAmount = totalAmoutCollected.reduce((acc: number, cur: any) => {
      return acc + cur.amount;
    }, 0);


    const percentage = (totalAmount / campaign.targetAmount) * 100;
    const totalDonation = totalAmoutCollected.length

    return {
      props: {
        user: req.session?.user,
        campaign: JSON.parse(JSON.stringify(campaign)),
        amount: {
          totalAmount,
          percentage,
          totalDonation,
          targetAmount: campaign.targetAmount,
          currency: campaign.currency,
        }
      },
    };
  }
);

const NewStore: NextPage = ({ campaign , amount}: any) => {
  console.log(campaign);
  return (
    <>
      <Head>
        <title>{campaign.name} / HandCheck 🤝</title>
      </Head>
      <Layout>
        <EditBody campaign={campaign} amount={amount} />
      </Layout>
    </>
  );
};

export default NewStore;
