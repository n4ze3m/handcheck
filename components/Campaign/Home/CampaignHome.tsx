import { Text, Group, SimpleGrid } from "@mantine/core";
import { Empty } from "antd";
import { useRouter } from "next/router";
import React from "react";
import RCard from "../../Common/RCard";

export default function CampaignHome({campaigns}:any) {
  const router = useRouter();

  return (
    <>
      <Group position="right">
        <button
          onClick={() => router.push("/campaign/new")}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-400 active:bg-blue-600 font-bold transition duration-150 ease-in-out uppercase"
        >
          New Campaign
        </button>
      </Group>
      <div className="mt-5">
        {campaigns.length === 0 && <Empty description="No campaigns yet" />}
        <SimpleGrid
          spacing="xs"
          mb="md"
          cols={3}
          style={{
            marginTop: "1rem",
          }}
          breakpoints={[
            { maxWidth: 980, cols: 3, spacing: "md" },
            { maxWidth: 755, cols: 2, spacing: "sm" },
            { maxWidth: 600, cols: 1, spacing: "sm" },
          ]}
        >
          {campaigns.map((campaign: any) => (
            <RCard key={campaign.id}
            onClick={() => router.push(`/campaign/${campaign.id}/edit`)}
            >
              <Text weight={500}>{campaign.name}</Text>
            </RCard>
          ))}
        </SimpleGrid>
      </div>
    </>
  );
}
