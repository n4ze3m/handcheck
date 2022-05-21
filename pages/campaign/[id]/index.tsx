import type { NextPage } from "next";
import Head from "next/head";
import { withSessionSsr } from "../../../lib/withSession";
import { prisma } from "@/database";
import CampaignViewBody from "@/components/Campaign/View/CampaignViewBody";
// import StoreView from "@/components/Store/View/StoreView";

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, params }) {
    const id = params!.id as string;

    const campaign = await prisma.campaign.findFirst({
      where: {
        url: id,
      },
      select: {
        id: true,
        name: true,
        country: true,
        currency: true,
        description: true,
        targetAmount:true,
        response: {
          where: {
            isPaid: true,
            paymentStatus:"PAID"
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10
        },
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

const NewStore: NextPage = ({ campaign, amount }: any) => {
  return (
    <>
      <Head>
        <title>{campaign.name}</title>
      </Head>
      <CampaignViewBody campaign={campaign} amount={amount} />
    </>
  );
};

export default NewStore;
