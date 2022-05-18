import { Group } from "@mantine/core";
import {
  Button,
  Form,
  Modal,
  Input,
  Space,
  Select,
  InputNumber,
  Table,
} from "antd";
import React from "react";
import { nanoid } from "nanoid";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
export default function EmailCheckout({ store }: any) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
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

  const onFinish = async (values: any) => {
    try {
      setIsLoading(true);
      const data = {
        ...values,
        store_id: store.id,
        isEmailCheckout: true,
        via: "EMAIL",
      };
      await axios.post("/api/checkout/create", data);
      router.replace(router.asPath);
      form.resetFields();
      handleCancel();
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  const [form] = Form.useForm();

  const column = [
    {
      title: "Customer Email",
      dataIndex: "email",
      key: "email",
      render: (data: any) =>
        data ? <Link href={`mailto:${data}`}>{data}</Link> : "N/A",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Checkout Form",
      dataIndex: "checkout_id",
      key: "checkout_id",
      render: (data: any) => <Link href={`/checkout/${data}`}>{data}</Link>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: any) =>
        new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date(createdAt)),
    },
  ];
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Email Checkout
      </Button>

      <Table
        className="mt-3"
        columns={column}
        dataSource={store.emailCheckout}
      />

      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="mt-6">
          <Form form={form} name="basic" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input email!" }]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.List
              name="products"
              rules={[
                {
                  validator: async (_, value) => {
                    if (!value || value.length === 0) {
                      return Promise.reject(
                        new Error("Please select at least one product")
                      );
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }) => {
                return (
                  <>
                    {fields.map((field, index) => (
                      <Space key={nanoid()} align="start">
                        {/* // select and input  */}
                        <Form.Item
                          {...field}
                          name={[field.name, "product_id"]}
                          rules={[
                            {
                              required: true,
                              message: "Please select product!",
                            },
                          ]}
                        >
                          <Select placeholder="Select a product">
                            {store.Items.map((item: any) => (
                              <Select.Option key={item.id} value={item.id}>
                                {item.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          {...field}
                          name={[field.name, "quantity"]}
                          rules={[
                            {
                              required: true,
                              message: "Please input quantity!",
                            },
                          ]}
                        >
                          <InputNumber placeholder="Quantity" min={1} />
                        </Form.Item>
                        <Button onClick={() => remove(field.name)}>-</Button>
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        block
                      >
                        Add Product
                      </Button>
                    </Form.Item>
                  </>
                );
              }}
            </Form.List>
            <Button loading={isLoading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Modal>
    </div>
  );
}
