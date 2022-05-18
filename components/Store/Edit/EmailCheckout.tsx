import { Group } from "@mantine/core";
import { Button, Form, Modal, Input, Space, Select, InputNumber } from "antd";
import React from "react";

export default function EmailCheckout({ store }: any) {
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

  const onFinish = (values: any) => {
    console.log(values)
  }

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Email Checkout
      </Button>

      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <Form
            name="basic"
            onFinish={onFinish}
          >
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
                  validator: (rule, value) => {
                    if (value.length === 0) {
                      return Promise.reject(
                        "Please select at least one product"
                      );
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map((field, index) => (
                      <Space key={field.key} align="start">
                        {/* // select and input  */}
                        <Form.Item
                          {...field }
                          
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
                          <InputNumber min={1} />
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
                  </div>
                );
              }}
            </Form.List>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Modal>
    </div>
  );
}
