import { Card, message, Skeleton, Space } from "antd";
import { api } from "../api/api";
import { useQuery } from "react-query";
import { IFeaturedPosts } from "../types";
import { useState } from "react";
import { FeaturedCard } from "./FeaturedCard";

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState<IFeaturedPosts[]>([]);
  const getFeaturedPosts = async () => {
    const { data } = await api.get<IFeaturedPosts[]>("/featured");
    console.log(data);
    return data;
  };

  const { isLoading } = useQuery("get-all-featured-posts", getFeaturedPosts, {
    onSuccess: (data) => {
      setFeaturedPosts(data);
    },
    onError: () => {
      message.error("Network error!");
    },
  });

  if (isLoading) {
    return (
      <div>
        <Card bordered={false} className="w-full">
          <div className="text-xl md:text-3xl font-bold">Featured Posts</div>

          <Space>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} />
              ))}
            </div>
          </Space>
        </Card>
      </div>
    );
  }
  return (
    <div>
      <Card bordered={false} className="w-full">
        <div className="text-xl md:text-3xl font-bold">Featured Posts</div>

        <Space className="w-full mt-5">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredPosts.map((posts) => (
              <FeaturedCard
                id={posts._id}
                title={posts.title}
                url={posts.mediaUrl}
                tags={posts.tag}
              />
            ))}
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default FeaturedPosts;
