import { useNavigate } from "react-router-dom";
import { message, Statistic } from "antd";
import { useQuery } from "react-query";
import { IEditRequest, IFeaturedPosts, IInnovationType } from "../types";
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

  const [request, setRequest] = useState<IEditRequest[]>([]);

  const getAllRequest = async () => {
    const { data } = await api.get<IEditRequest[]>("/edit-request");
    return data;
  };

  const { isLoading: isRequesting } = useQuery(
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
      <div className="w-full flex items-center gap-6 flex-wrap">
        <div
          onClick={() => navigate("innovations")}
          className="rounded-md shadow-md p-4"
        >
          <Statistic
            loading={isLoading}
            title="Total Innovation"
            value={allInnovations.length}
          />
        </div>
        <div className="rounded-md shadow-md p-4">
          <Statistic
            loading={isLoading}
            title="Innovation pending approval"
            value={pendingInnovations.length}
          />
        </div>
        <div className="rounded-md shadow-md p-4">
          <Statistic
            loading={isFeaturedLoading}
            title="Featured Posts"
            value={featuredPosts.length}
          />
        </div>
        <div className="rounded-md shadow-md p-4">
          <Statistic
            loading={isRequesting}
            title="Edit Requests"
            value={request.length}
          />
        </div>
      </div>
    </div>
  );
};

export default Default;
