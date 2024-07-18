//eslint-disable-next-line
import { Image } from "antd";
import ReactPlayer from "react-player";

interface IMedia {
  name: string;
  url: string;
  type?: string;
  size?: number;
}

interface RenderMediaProps {
  media: IMedia;
  className?: string;
}

export const RenderMedia = ({ media, className }: RenderMediaProps) => {
  const extension = media?.url.split(".").pop()?.toLowerCase() || "";

  const imageExtensions = ["jpg", "jpeg", "png", "gif"];
  const videoExtensions = ["mp4", "webm", "ogg"];

  if (imageExtensions.includes(extension)) {
    return <Image src={media.url} className={className} />;
  }

  if (videoExtensions.includes(extension)) {
    const videoThumbnail = `${media.url}#t=0.5`;

    return (
      <div className={`relative ${className}`}>
        <ReactPlayer
          url={media.url}
          light={videoThumbnail}
          controls={true}
          width="100%"
          height="100%"
        />
      </div>
    );
  }

  return (
    <div className="text-center text-muted-foreground h-[100px] flex justify-center items-center">
      --- No data ----
    </div>
  );
};
