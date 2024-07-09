import { Tag } from "antd";
import ReactPlayer from "react-player";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface FeaturedCardsProps {
  id: string;
  url: string;
  title: string;
  tags?: string[];
  className?: string;
}

export const FeaturedCard = ({
  id,
  url,
  title,
  tags,
  className,
}: FeaturedCardsProps) => {
  const extension = url.split(".").pop()?.toLowerCase() || "";

  const navigate = useNavigate();

  const imageExtensions = ["jpg", "jpeg", "png", "gif"];
  const videoExtensions = ["mp4", "webm", "ogg"];

  if (imageExtensions.includes(extension)) {
    return (
      <div
        className="w-full h-[200px] md:h-[250px] bg-no-repeat bg-cover bg-center rounded-2xl p-8 relative"
        style={{ backgroundImage: `url(${url})` }}
      >
        <div className="flex flex-col justify-between w-full h-full relative z-20">
          <div>
            <h1 className="font-bold text-[32px] text-white capitalize tracking-tighter">
              {title}
            </h1>
            <div className="flex items-center flex-wrap gap-1 text-white relative">
              {tags?.map((tag, i) => (
                <Tag key={i} color="processing">
                  {tag}
                </Tag>
              ))}
            </div>
          </div>

          {/* <div>
            <span className="bg-primary text-white text-[12px] md:text-[16px] px-[10px] md:px-[24px] py-[5px] md:py-[12px] rounded-md hover:bg-white hover:text-primary ">
              View More
            </span>
          </div> */}
        </div>

        <div className="absolute top-0 left-0 w-full h-full bg-black/10 rounded-2xl"></div>
        <div
          className="absolute top-[5px] right-[5px] text-white text-2xl cursor-pointer"
          title="Edit post"
          onClick={() => navigate(`/dashboard/posts/${id}`)}
        >
          <FaEdit />
        </div>
      </div>
    );
  }

  if (videoExtensions.includes(extension)) {
    return (
      <div
        className={`relative rounded-2xl h-[200px] md:h-[250px] w-full overflow-hidden ${className}`}
      >
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          style={{ borderRadius: "16px", zIndex: 10 }}
          muted={true}
          playing={true}
          loop={true}
          controls={false}
          config={{
            youtube: {
              playerVars: {
                showinfo: 0,
                controls: 0,
                modestbranding: 1,
              },
            },
          }}
        />
        <div className="absolute top-0 left-0 w-full h-full p-8">
          <div className="flex flex-col justify-between w-full h-full relative z-20">
            <div>
              <h1 className="font-bold text-[32px] text-white capitalize tracking-tighter">
                {title}
              </h1>
              {tags?.map((tag, i) => (
                <Tag key={i} color="processing">
                  {tag}
                </Tag>
              ))}
            </div>

            {/* <div>
              <span className="bg-primary text-white text-[12px] md:text-[16px] px-[10px] md:px-[24px] py-[5px] md:py-[12px] rounded-md hover:bg-white hover:text-primary ">
                View More
              </span>
            </div> */}
          </div>
        </div>

        <div
          className="absolute top-[5px] right-[5px] text-white text-2xl cursor-pointer"
          title="Edit post"
          onClick={() => navigate(`/dashboard/posts/${id}`)}
        >
          <FaEdit />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-2xl h-[200px] md:h-[250px] w-full overflow-hidden ${className}`}
    >
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        style={{ borderRadius: "16px", zIndex: 10 }}
        muted={true}
        playing={true}
        controls={false}
        config={{
          youtube: {
            playerVars: {
              showinfo: 0,
              controls: 0,
              modestbranding: 1,
            },
          },
        }}
      />
      <div className="absolute top-0 left-0 w-full h-full p-8">
        <div className="flex flex-col justify-between w-full h-full relative z-20">
          <div>
            <h1 className="font-bold text-[32px] text-white capitalize tracking-tighter">
              {title}
            </h1>
            {tags?.map((tag, i) => (
              <Tag key={i} color="processing">
                {tag}
              </Tag>
            ))}
          </div>

          {/* <div>
            <span className="bg-primary text-white text-[12px] md:text-[16px] px-[10px] md:px-[24px] py-[5px] md:py-[12px] rounded-md hover:bg-white hover:text-primary ">
              View More
            </span>
          </div> */}
        </div>
      </div>

      <div
        className="absolute top-[5px] right-[5px] text-white text-2xl cursor-pointer"
        title="Edit post"
        onClick={() => navigate(`/dashboard/posts/${id}`)}
      >
        <FaEdit />
      </div>
    </div>
  );
};
