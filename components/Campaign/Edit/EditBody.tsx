import React from "react";
import { Button, Modal, Typography, Tabs } from "antd";
import { useRouter } from "next/router";
const { Title } = Typography;

import CampaignTable from "./CampaignTable"
import Summary from "./Summary"

export default function EditBody({ campaign, amount }: any) {
  const router = useRouter();
  console.log(campaign)

  return (
    <>
      <div className="flex  justify-between">
        <Title className="flex" level={3}>
          {campaign.name}
        </Title>
        <div className="row">
          <Button
            className="ml-3"
            target={"_blank"}
            rel="noopener noreferrer"
            onClick={() => router.push(`/campaign/${campaign.url}`)}
          >
            Share
          </Button>
        </div>
      </div>
        <div className="mt-3">
          <Summary amount={amount} />
          <CampaignTable campaign={campaign} />
        </div>
    </>
  );
}
