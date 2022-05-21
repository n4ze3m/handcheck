import React from "react";
import { Button, Modal, Typography, Tabs } from "antd";
import { useRouter } from "next/router";
const { Title } = Typography;

import CampaignTable from "./CampaignTable"
import Summary from "./Summary"

export default function EditBody({ campaign, amount }: any) {
  const router = useRouter();

  return (
    <>
      <div className="flex  justify-between">
        <Title className="flex" level={3}>
          {campaign.name}
        </Title>
          <div
          className="bg-white rounded-md shadow-md p-3"
          >
          <a
           href={`/campaign/${campaign.url}`}
           className="row flex justify-between text-gray-600" 
           rel="noopener noreferrer"
           target={`_blank`}
          >

            Open

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
          </div>
      </div>
        <div className="mt-3">
          <Summary amount={amount} />
          <CampaignTable campaign={campaign} />
        </div>
    </>
  );
}
