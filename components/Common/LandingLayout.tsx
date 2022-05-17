import { Layout } from "antd";
const { Header, Content } = Layout;
import React from "react";

interface IProps {
  children: React.ReactNode;
}

export default function LandingLayout(props: IProps) {
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Header>
        <div className="text-lg text-white cursor-pointer font-bold mt-3">
          <span>HandCheck 🤝</span>
        </div>
      </Header>
      <Content className="m-3">{props.children}</Content>
    </Layout>
  );
}
