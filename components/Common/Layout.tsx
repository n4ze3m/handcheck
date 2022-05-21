import React from "react";
import { Col, Layout, Menu, Dropdown, Avatar, Badge } from "antd";
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
            <Badge count={"pre-alpha"} size="small" style={{
              backgroundColor: "#1890ff",
            }}>
              <div className="p-3">
              <span className="text-white">HandChecks 🤝</span>
              </div>
            </Badge>
          </Link>
        </div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1">
            <Link href="/">store 🏪</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/campaign">campaign 💰</Link>
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
