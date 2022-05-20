import React from "react";
import { Empty, Layout, notification } from "antd";
const { Header, Content } = Layout;

import Detail from "./ViewDetails";
import CampForm from "./CampForm";

export default function CampaignViewBody({ campaign, amount }: any) {
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Header>
        <h1 className="mt-3 text-white text-xl">{campaign.name}</h1>
      </Header>
      <Content>
        <div className="container mx-auto px-4 py-10">
          {/* taiwind row with first col - 8 and second col 4 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2">
              <Detail campaign={campaign} />
            </div>
            <div>
              <CampForm amount={amount} />
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
}
