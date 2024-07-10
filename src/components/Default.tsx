import { useNavigate } from "react-router-dom";
import { Col, message, Row, Statistic } from "antd";
import { useQuery } from "react-query";
import { IInnovationType } from "../types";
import { api } from "../api/api";
import { useState } from "react";

const Default = () => {
  const [allInnovations, setAllInnovations] = useState<IInnovationType[]>([]);
  const [pendingInnovations, setPendingInnovations] = useState<
    IInnovationType[]
  >([]);

  const navigate = useNavigate();
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
        const pending = data.filter(
          (innovation) => innovation.status === "pending"
        );

        setAllInnovations(data);
        setPendingInnovations(pending);
      },
    }
  );

  return (
    <div>
      <Row gutter={16} className="max-w-[400px]">
        <Col span={12} onClick={() => navigate("innovations")}>
          <Statistic
            loading={isLoading}
            title="Total Innovation"
            value={allInnovations.length}
          />
        </Col>
        <Col span={12}>
          <Statistic
            loading={isLoading}
            title="Innovation pending approval"
            value={pendingInnovations.length}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Default;
