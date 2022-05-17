import { Button, Card, Text, Grid, Group, SimpleGrid } from "@mantine/core";
import { Empty } from "antd";
import { useRouter } from "next/router";
import React from "react";
import RCard from "../Common/RCard";
export default function HomeBody({ stores }: any) {
  const router = useRouter();
  return (
    <>
      <Group position="right">
        <button
          onClick={() => router.push("/store/new")}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-400 active:bg-blue-600 font-bold transition duration-150 ease-in-out uppercase"
        >
          New Store
        </button>
      </Group>
      <div className="mt-5">
        {stores.length === 0 && <Empty description="No stores yet" />}
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
          {stores.map((store: any) => (
            <RCard key={store.id}
            onClick={() => router.push(`/store/${store.id}/edit`)}
            >
              <Text weight={500}>{store.name}</Text>
            </RCard>
          ))}
        </SimpleGrid>
      </div>
    </>
  );
}
