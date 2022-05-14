import React from "react";
import { Form, Input, notification } from "antd";
import axios from "axios";
import { useRouter } from "next/router";

export default function RegisterBody() {
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      await axios.post("/api/register", values);
      notification.success({
        message: "Success",
        description: "Wellcome to Embd",
      });
      router.push("/");
    } catch (e: any) {
      notification.error({
        message: "Error",
        description: e?.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="mx-auto max-w-screen text-center py-10 mb-5 items-center relative">
      <div className="overflow-hidden mx-auto max-w-screen text-center py-10  mb-5 items-center relative">
        <div className="relative w-11/12 max-w-xl p-8 bg-white shadow-xl mx-auto rounded mb-10">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input type={"email"} placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <button className="uppercase text-xl w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-400 active:bg-blue-600 font-bold transition duration-150 ease-in-out">
              Register
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
