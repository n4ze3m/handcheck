import { ActionIcon, Group, SimpleGrid } from "@mantine/core";
import { Card, Drawer, Empty, Layout } from "antd";
import React from "react";
import Cart from "./Cart";
const { Header, Content } = Layout;

export default function StoreView({ store }: any) {
  const [visible, setVisible] = React.useState(false);
  const [triggerState, setTriggerState] = React.useState(
    new Date().getMilliseconds()
  );
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const addProductToCart = (item: any) => {
    const cart = localStorage.getItem("products-" + store.id);
    if (cart) {
      const products = JSON.parse(cart);
      //check if product already exists
      const product = products.find((p: any) => p.id === item.id);
      if (product) {
        products.map((p: any) => {
          if (p.id === item.id) {
            p.quantity += 1;
          }
        });
      } else {
        products.push({ ...item, quantity: 1, currency: store.currency });
      }

      localStorage.setItem("products-" + store.id, JSON.stringify(products));
    } else {
      localStorage.setItem(
        "products-" + store.id,
        JSON.stringify([
          {
            ...item,
            quantity: 1,
            currency: store.currency,
          },
        ])
      );
    }
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Drawer placement="right" onClose={onClose} visible={visible}>
        <Cart state={triggerState} />
      </Drawer>
      <Header>
        <Group position="apart" className="mt-3">
          <div>
            <h1 className="text-white text-xl">{store.name}</h1>
          </div>
          <div className="cursor-pointer" onClick={showDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        </Group>
      </Header>
      <Content className="m-3 p-3">
        {store.Items.length === 0 && <Empty description="No products" />}
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
              hoverable
              actions={[
                <ActionIcon key="quik" className="mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </ActionIcon>,
                <ActionIcon
                  key="cart"
                  className="mx-auto"
                  onClick={() => {
                    addProductToCart(item);
                    setTriggerState(new Date().getMilliseconds());
                    showDrawer();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </ActionIcon>,
              ]}
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
      </Content>
    </Layout>
  );
}
