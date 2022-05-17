import { SimpleGrid } from "@mantine/core";
import { Card, Empty } from "antd";
import React from "react";

export default function Products({ store }: any) {
  return (
    <div>
      {store.Items.length === 0 && (
        <Empty description="No products added yet" />
      )}
      <SimpleGrid
        spacing="xs"
        mb="md"
        cols={4}
        style={{
          marginTop: "1rem",
        }}
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: "md" },
          { maxWidth: 755, cols: 2, spacing: "sm" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
      >
        {store.Items.map((item: any) => (
          <Card
            className="mb-4 shadow-md"
            style={{ width: 240 }}
            key={item.id}
            cover={
              <img
                alt={item.name}
                className="h-64 w-full object-cover"
                src={item.image}
              />
            }
          >
            <Card.Meta
              title={item.name}
              description={new Intl.NumberFormat("en", {
                style: "currency",
                currency: store.currency,
              }).format(item.price)}
            />
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
}
