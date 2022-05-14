import { Button, Empty } from "antd";
import { useRouter } from "next/router";
import React from "react";

export default function HomeBody() {
  const router = useRouter();
  return (
    <div className="p-3 m-3">
      <div className="float-right">
        <Button onClick={() => router.push("/store/new")} type="primary">
          New Store
        </Button>
      </div>
      <div className="my-5">
        <div>
          <Empty description="No stores yet" />
        </div>
      </div>
    </div>
  );
}
