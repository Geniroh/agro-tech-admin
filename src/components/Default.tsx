import { useNavigate } from "react-router-dom";
import { Col, message, Row, Statistic } from "antd";
import { useQuery } from "react-query";
import { IFeaturedPosts, IInnovationType } from "../types";
import { api } from "../api/api";
import { useState } from "react";

const Default = () => {
  const [allInnovations, setAllInnovations] = useState<IInnovationType[]>([]);
  const [pendingInnovations, setPendingInnovations] = useState<
    IInnovationType[]
  >([]);
  const [featuredPosts, setFeaturedPosts] = useState<IFeaturedPosts[]>([]);

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
  const getFeaturedPosts = async () => {
    const { data } = await api.get<IFeaturedPosts[]>("/featured");
    return data;
  };

  const { isLoading: isFeaturedLoading } = useQuery(
    "get-all-featured-posts-home",
    getFeaturedPosts,
    {
      onSuccess: (data) => {
        setFeaturedPosts(data);
      },
      onError: () => {
        message.error("Network error!");
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
        <Col span={12}>
          <Statistic
            loading={isFeaturedLoading}
            title="Featured Posts"
            value={featuredPosts.length}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Default;
