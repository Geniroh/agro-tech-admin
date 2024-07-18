import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "../api/api";
import { Button, Card, message, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import type { TableProps } from "antd";
import { IEditRequest } from "../types";
import { useState } from "react";

const EditInnovation = () => {
  const navigate = useNavigate();
  const [request, setRequest] = useState<IEditRequest[]>([]);
  const queryClient = useQueryClient();

  const getAllRequest = async () => {
    const { data } = await api.get<IEditRequest[]>("/edit-request");
    return data;
  };

  const updateRequest = async (id: string, values: any) => {
    const { data } = await api.post(`/edit-request/${id}`, values);
    console.log(data);
  };

  const { mutateAsync, isLoading: isEditing } = useMutation(
    ({ id, values }: { id: string; values: any }) => updateRequest(id, values),
    {
      onSuccess: () => {
        message.success("Approved");
        queryClient.invalidateQueries(["get-all-edit-request"]);
      },
      onError: (err: any) => {
        if (err.error) {
          message.error(err.error.toString());
        } else {
          message.error("Failed to approve");
        }
      },
    }
  );

  const { isLoading } = useQuery(
    "get-all-edit-request",
    () => getAllRequest(),
    {
      onSuccess: (data) => {
        setRequest(data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleApproveEdit = async (id: string, values: any) => {
    try {
      await mutateAsync({ id, values });
    } catch (error) {
      console.error(error);
    }
  };
  const columns: TableProps<IEditRequest>["columns"] = [
    {
      title: "Email",
      dataIndex: "email",
      key: "_id",
    },
    {
      title: "Innovation Name",
      dataIndex: "title",
      key: "_id",
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
          case "unapprove":
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
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (id, record) => (
        <Button onClick={() => handleApproveEdit(id, record)}>
          Approve Request
        </Button>
      ),
    },
  ];
  return (
    <Card bordered={false} className="w-full">
      <div
        className="w-full text-[16px] mb-3 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        Back
      </div>
      <div className="text-xl md:text-3xl font-bold">Edit Requests</div>

      <div className="mt-5">
        <Table
          loading={isLoading || isEditing}
          columns={columns}
          dataSource={request}
        />
      </div>
    </Card>
  );
};

export default EditInnovation;
