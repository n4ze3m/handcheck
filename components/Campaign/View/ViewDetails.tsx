import React from "react";

export default function ViewDetail({ campaign }: any) {
  return (
    <div>
      <p>{campaign.description}</p>
    </div>
  );
}
