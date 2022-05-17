import { Button, Modal, Typography, Tabs } from "antd";
import { useRouter } from "next/router";
const { TabPane } = Tabs;
const { Title } = Typography;
import React from "react";
import ProductCreate from "./ProductCreate";
import Products from "./Products";
import Orders from "./Orders";

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
      <div className="bg-white p-3 rounded-lg shadow-md"  style={{
        minHeight: "100vh",
      }}>
        <Tabs defaultActiveKey="2" type="card">
          <TabPane tab="Orders" key="1">
            <Orders />
          </TabPane>
          <TabPane tab="Products" key="2">
            <Products store={store} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
