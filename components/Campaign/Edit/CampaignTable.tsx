import { Table } from "antd";
import Link from "next/link";

export default function CampaignTable({ campaign }: any) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (data: any) => (data ? data : "N/A"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (data: any) =>
        data ? <Link href={`mailto:${data}`}>{data}</Link> : "N/A",
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      render: (data: any) => (data ? data : "N/A"),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (total: any) =>
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: campaign.currency,
        }).format(total),
    },
    {
      title: "Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (data: any) => (
        <div className="row">
          {data}
        
        </div>
      ),
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
    },
    {
        title: "",
        dataIndex: "paymend_id",
        key: "paymend_id",
        render: (data:any) => (
              <a target="_blank" href={`https://dashboard.rapyd.net/collect/payments/details/${data}`} rel="noopener noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a> 
        )
    }
  ];
  return (
    <div className="mt-6">
      <Table columns={columns} dataSource={campaign.response} />
    </div>
  );
}
