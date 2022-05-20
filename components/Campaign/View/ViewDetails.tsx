import React from "react";
import { List } from "antd";

export default function ViewDetail({ campaign }: any) {
  return (
    <div>
      <p>{campaign.description}</p>
      <div className="mt-3">
        <h1 className="text-lg text-gray-800 font-bold">Recent donations</h1>
        <List
          dataSource={campaign.response}
          renderItem={(res: any) => (
            <List.Item
            key={res.id}
            className="border-b border-white"
            >
              <List.Item.Meta
                title={res?.name || "Someone"}
                description={res?.comment}
              />
              <div>

              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: campaign?.currency,
              }).format(res?.amount)}
                </div>

            </List.Item>
          )}
        />
      </div>
    </div>
  );
}
