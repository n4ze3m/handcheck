import React from "react";
import { Form, Input, notification } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
export default function LoginBody() {
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      await axios.post("/api/login", values);
      notification.success({
        message: "Success",
        description: "Wellcome back to HandCheck 🤝",
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
              name="email"
              initialValue={"admin@example.com"}
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input type={"email"} placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              name="password"
              initialValue={"admin123"}
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <button className="uppercase text-xl w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-400 active:bg-blue-600 font-bold transition duration-150 ease-in-out">
              Login
            </button>
          </Form>
          <div className="text-center text-gray-500 mt-3">
            <span>
              {"Don't have an account? "}
              <Link
                className="text-blue-600 hover:text-blue-400"
                href="/register"
              >
                Register
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
