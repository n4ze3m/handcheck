import { Divider, Form, Input, notification, Select } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

interface INewBodyProps {
  countries: any;
}

export default function NewStoreBody(props: INewBodyProps) {

  const router = useRouter()

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post("/api/store/new", values);
      const store = response.data.store
      notification.success({
        message: "Success",
        description: "Store created successfully",
      });
      router.push(`/store/${store}/edit`)
    } catch (e:any) {
      notification.error({
        message: "Error",
        description: e?.response?.data?.message || "Something went wrong",
      });
    }
  };
  return (
    <div>
      <h1 className="text-xl mb-4">Start a new store today!</h1>
      <Form
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        wrapperCol={{ span: 16 }}
        layout="vertical"
      >
        <Divider orientation="left">Store Details</Divider>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input your store name!" }]}
        >
          <Input placeholder="Enter your store name" />
        </Form.Item>
        <Form.Item
          name="country"
          label="Country"
          rules={[{ required: true, message: "Please select your country" }]}
        >
          <Select showSearch placeholder="Select your country">
            {props.countries.map((country: any) => (
              <Select.Option key={country.id} value={country.iso_alpha2}>
                {country.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="currency"
          label="Currency"
          rules={[{ required: true, message: "Please select your currency" }]}
        >
          <Select showSearch placeholder="Select your currency">
            {props.countries.map((country: any) => (
              <Select.Option key={country.id} value={country.currency_code}>
                {country.currency_name}
              </Select.Option>
            ))}
          </Select>
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
          rules={[
            {
              required: true,
              message: "Please input your Rapyd Secret Token!",
            },
          ]}
        >
          <Input.Password placeholder="Enter your Rapyd Secret Token" />
        </Form.Item>
        <Form.Item
          name="rapydAccessToken"
          label="Rapyd Access Token"
          rules={[
            {
              required: true,
              message: "Please input your Rapyd Access Token!",
            },
          ]}
        >
          <Input.Password placeholder="Enter your Rapyd Access Token" />
        </Form.Item>
        <div className="float-right my-3">
          <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-400 active:bg-blue-600 font-bold transition duration-150 ease-in-out uppercase">
            Create Store
          </button>
        </div>
      </Form>
    </div>
  );
}
