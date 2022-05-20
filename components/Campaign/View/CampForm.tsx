import { notification, Form, Input, InputNumber, Progress, Drawer } from "antd";
import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Checkout from "./Checkout";
export default function CampForm({ amount }: any) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const [checkout, setCheckout] = React.useState<any>();
  const [visible, setVisible] = React.useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const convertCurreny = (value: any, currency: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  const [form] = Form.useForm();
  const onFinish = async (value: any) => {
    try {
      setLoading(true);
      const url = router.query.id;

      const data = {
        url,
        value,
      };

      const response = await axios.post("/api/campaign/checkout", data);
      setCheckout(response.data);
      showDrawer();
      form.resetFields();

      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      const message = e?.response?.data?.message || "Something went wrong";
      notification.error({
        message: "Error",
        description: message,
      });
    }
  };

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg">
      <Drawer
        placement="right"
        onClose={onClose}
        visible={visible}
        destroyOnClose={true}
        maskClosable={false}
        size="large"
      >
        <Checkout checkout={checkout} />
      </Drawer>
      <div className="mb-3">
        <div className="text-gray-800 text-xl">
          {convertCurreny(amount.totalAmount, amount.currency)}
          <span className="text-xs">
            {` raised of ${convertCurreny(
              amount.targetAmount,
              amount.currency
            )} goal`}
          </span>
        </div>
        <Progress percent={amount.percentage} showInfo={false} />
        <span className="text-xs text-gray-800">
          {`${amount.totalDonation} donations`}
        </span>
      </div>
      <Form onFinish={onFinish} form={form}>
        <Form.Item
          name="amount"
          rules={[{ required: true, message: "Please input your amount" }]}
        >
          <InputNumber
            min={1}
            max={100}
            placeholder="Amount"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="name">
          <Input placeholder="Name (optional)" />
        </Form.Item>
        <Form.Item name="comment">
          <Input.TextArea rows={3} placeholder="Comment (optional)" />
        </Form.Item>
        <button
          disabled={loading}
          className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          {loading ? "Loading..." : "Done"}
        </button>
      </Form>
    </div>
  );
}
