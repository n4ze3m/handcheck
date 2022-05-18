import { Group } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

export default function CampaignHome() {
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
    </>
  );
}
