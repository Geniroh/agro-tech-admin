import { useQuery } from "react-query";
import { api } from "../api/api";
import { message, Card, Tabs, Table, Tag } from "antd";
import type { TabsProps } from "antd";
import { FaExternalLinkAlt } from "react-icons/fa";
import type { TableProps } from "antd";
import { IInnovationType } from "../types";
import { Link } from "react-router-dom";
import { useState } from "react";

const columns: TableProps<IInnovationType>["columns"] = [
  {
    title: "Name",
    dataIndex: "productName",
    key: "_id",
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "_id",
  },
  {
    title: "Year Invented",
    dataIndex: "yearInvented",
    key: "_id",
    render: (value, record) => <span>{record.month + " " + value}</span>,
  },
  {
    title: "Phase",
    dataIndex: "productPhase",
    key: "_id",
  },
  {
    title: "Chain",
    key: "_id",
    dataIndex: "productChain",
    render: (chains) => (
      <>
        {chains.map((tag: string) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          switch (tag) {
            case "Input supply":
              color = "blue";
              break;
            case "Production":
              color = "cyan";
              break;
            case "Harvesting":
              color = "geekblue";
              break;
            case "Processing":
              color = "processing";
              break;
            case "Logistics":
              color = "lime";
              break;
            case "Export":
              color = "green";
              break;
            default:
              color = "green-inverse";
              break;
          }
          return (
            <Tag color={color} key={tag} className="text-[9px]">
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "_id",
    render: (status) => {
      let color = "geekblue";
      switch (status) {
        case "approved":
          color = "green";
          break;
        case "pending":
          color = "processing";
          break;
        case "rejected":
          color = "volcano";
          break;
        default:
          color = "green-inverse";
          break;
      }
      return (
        <Tag color={color} key={status} className="text-[9px]">
          {status.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Preview",
    dataIndex: "_id",
    key: "_id",
    render: (id) => (
      <Link to={`preview/${id}`}>
        <FaExternalLinkAlt />
      </Link>
    ),
  },
];

const Innovations = () => {
  const [allInnovations, setAllInnovations] = useState<IInnovationType[]>([]);
  const [approvedInnovations, setApprovedInnovations] = useState<
    IInnovationType[]
  >([]);
  const [rejectedInnovations, setRejectedInnovations] = useState<
    IInnovationType[]
  >([]);
  const [pendingInnovations, setPendingInnovations] = useState<
    IInnovationType[]
  >([]);
  const getInnovations = async () => {
    const { data } = await api.get<IInnovationType[]>("/innovation");
    return data;
  };

  const { isLoading } = useQuery(
    ["get-all-innovation"],
    () => getInnovations(),
    {
      keepPreviousData: true,
      onError: () => {
        message.error("Could not get innovations at this moment");
      },
      onSuccess: (data) => {
        const approved = data.filter(
          (innovation) => innovation.status === "approved"
        );
        const rejected = data.filter(
          (innovation) => innovation.status === "rejected"
        );
        const pending = data.filter(
          (innovation) => innovation.status === "pending"
        );

        setAllInnovations(data);
        setApprovedInnovations(approved);
        setPendingInnovations(pending);
        setRejectedInnovations(rejected);
      },
    }
  );

  const tabs: TabsProps["items"] = [
    {
      key: "1",
      label: "All",
      children: (
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={allInnovations}
        />
      ),
    },
    {
      key: "2",
      label: "Approved",
      children: (
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={approvedInnovations}
        />
      ),
    },
    {
      key: "3",
      label: "Pending",
      children: (
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={pendingInnovations}
        />
      ),
    },
    {
      key: "4",
      label: "Rejected",
      children: (
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={rejectedInnovations}
        />
      ),
    },
  ];
  return (
    <div>
      <Card bordered={false} className="w-full">
        <div className="text-xl md:text-3xl font-bold">Innovations</div>
        <Tabs defaultActiveKey="1" items={tabs} />
      </Card>
    </div>
  );
};

export default Innovations;
