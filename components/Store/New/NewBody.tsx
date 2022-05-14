import { Divider, Form, Input } from "antd";
import React from "react";

export default function NewStoreBody() {
  return (
    <div>
      <h1 className="text-xl mb-4">Start a new store today!</h1>
      <Form wrapperCol={{ span: 16 }}>
        <Divider orientation="left">Store Details</Divider>
        <Form.Item
          name="name"
          label="Store Name"
          rules={[{ required: true, message: "Please input your store name!" }]}
        >
          <Input placeholder="Enter your store name" />
        </Form.Item>
        <Divider orientation="left">Rapyd Credentials</Divider>
        <p className="mr-3 text-sm">
          You can find your Rapyd Payments keys in your{" "}
          <a href="https://dashboard.rapyd.net/developers/credentials">
            Rapyd Dashboard
          </a>
          . This site is only for demo purposes do not use your production
          credentials. You can self host embd for production.
        </p>
        <Form.Item
          name="rapydSecretToken"
          label="Rapyd Secret Token"
          rules={[{ required: true, message: "Please input your Rapyd Secret Token!" }]}
        >
          <Input.Password placeholder="Enter your Rapyd Secret Token" />
        </Form.Item>
        <Form.Item
          name="rapydAccessToken"
          label="Rapyd Access Token"
          rules={[{ required: true, message: "Please input your Rapyd Access Token!" }]}
        >
          <Input.Password placeholder="Enter your Rapyd Access Token" />
        </Form.Item>
      </Form>
    </div>
  );
}
