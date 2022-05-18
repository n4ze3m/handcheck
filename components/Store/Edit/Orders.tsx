import { Table } from "antd";

export default function Orders({ store }: any) {

  const columns = [
    {
      title: "Order Id",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Amount",
      dataIndex: "total",
      key: "total",
      render: (total: any) =>
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: store.currency,
        }).format(total),
    },
    {
      title: "Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: any) =>
        new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date(createdAt)),
    }
  ];
  return (
    <div>
      <Table columns={columns} dataSource={store.Checkout} />
    </div>
  );
}
