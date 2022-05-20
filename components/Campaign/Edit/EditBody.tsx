import React from "react";
import { Button, Modal, Typography, Tabs } from "antd";
import { useRouter } from "next/router";
const { Title } = Typography;

export default function EditBody({ campaign }: any) {
  const router = useRouter();

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
    </>
  );
}
