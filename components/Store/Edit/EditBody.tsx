import { Button, Empty, Modal, Typography } from "antd";
import { useRouter } from "next/router";

const { Title } = Typography;
import React from "react";
import ProductCreate from "./ProductCreate";

export default function EditBody({ store }: any) {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = React.useState(false);

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
        <ProductCreate />
      </Modal>
      <div className="flex  justify-between">
        <Title className="flex" level={3}>
          {store.name}
        </Title>
        <div className="row">
          <Button type="primary" onClick={showModal}>
            Add Product
          </Button>
          <Button className="ml-3">Vist</Button>
        </div>
      </div>
      <div>
        {store.Items.length}
        <Empty description="No products added yet" />
      </div>
    </div>
  );
}
