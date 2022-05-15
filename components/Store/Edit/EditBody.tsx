import { SimpleGrid } from "@mantine/core";
import { Button, Empty, Modal, Typography, Card } from "antd";
import { useRouter } from "next/router";
const { Meta } = Card;
const { Title } = Typography;
import React from "react";
import ProductCreate from "./ProductCreate";

export default function EditBody({ store }: any) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const router = useRouter();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <Modal
        footer={null}
        title="Create Product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ProductCreate close={handleCancel} />
      </Modal>
      <div className="flex  justify-between">
        <Title className="flex" level={3}>
          {store.name}
        </Title>
        <div className="row">
          <Button type="primary" onClick={showModal}>
            Add Product
          </Button>
          <Button
            className="ml-3"
            target={"_blank"}
            rel="noopener noreferrer"
            onClick={() => router.push(`/store/${store.id}`)}
          >
            Vist
          </Button>
        </div>
      </div>
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
              cover={
                <img
                  alt={item.name}
                  className="h-64 w-full object-cover"
                  src={item.image}
                />
              }
            >
              <Meta
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
    </div>
  );
}
