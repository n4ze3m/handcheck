import React from "react";
import { Col, Layout, Menu, Dropdown, Avatar } from "antd";
const { Header, Content, Sider } = Layout;
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

export default function LayoutBody(props: Props) {
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="text-md text-white cursor-pointer font-bold m-3 p-3">
          <Link href="/">
            <span>HandCheck 🤝</span>
          </Link>
        </div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1">
            <Link href="/">Store</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/">Form</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }}>
          <div style={{ float: "right" }} className="mr-3">
            <Dropdown
              overlay={
                <Menu theme="dark">
                  <Menu.Item key="3">
                    <Link href="/api/logout">
                    Logout
                    </Link>
                  </Menu.Item>
                </Menu>
              }
            >
              <Avatar src="https://vercel.com/api/www/avatar/tvTvBUaOycYrEUTRPEBO3dFS?&s=120" />
            </Dropdown>
          </div>
        </Header>
        <Content className="m-3">
          <div style={{ padding: 24, minHeight: 360 }}>{props.children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}
