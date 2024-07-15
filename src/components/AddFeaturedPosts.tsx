import {
  Button,
  Card,
  Form,
  Input,
  Select,
  Upload,
  Radio,
  RadioChangeEvent,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { BACKEND_API, VALUE_CHAIN_OPTIONS } from "../constants";
import ImgCrop from "antd-img-crop";
import type { UploadProps } from "antd";
import ReactPlayer from "react-player";
import { useMutation } from "react-query";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

const AddFeaturedPosts = () => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [thumbnailFileList, setThumbnailFileList] = useState<any[]>([]);
  const [choice, setChoice] = useState<string>("image");
  const [mediaUrl, setMediaUrl] = useState<string>();
  const [thumbnailUrl, setThumbnailUrl] = useState<string>();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const addNewPost = async ({
    mediaUrl,
    thumbnailImage,
    title,
    tag,
    type,
  }: {
    mediaUrl: string;
    thumbnailImage: string;
    title: string;
    tag: string[];
    type: string;
  }) => {
    const { data } = await api.post(`/featured`, {
      mediaUrl,
      thumbnailImage,
      title,
      tag,
      type,
    });
    return data;
  };

  const { mutateAsync, isLoading } = useMutation(addNewPost, {
    onSuccess: () => {
      message.success("Post created");
    },
    onError: () => {
      message.error("Failed to create post");
    },
  });

  const props: UploadProps = {
    name: "file",
    action: `${BACKEND_API}/upload`,
    showUploadList: { showRemoveIcon: false },
    listType: "picture-card",
    maxCount: 1,
    onChange(info) {
      if (info.file.status === "done") {
        if (info.file.response && info.file.response.file.url) {
          const mediaUrl = info.file.response.file.url;
          setMediaUrl(mediaUrl);
          setFileList([info.file]);
        } else {
          message.error("Failed to upload file");
        }
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const thumbnailProps: UploadProps = {
    name: "file",
    action: `${BACKEND_API}/upload`,
    showUploadList: { showRemoveIcon: false },
    listType: "picture-card",
    maxCount: 1,
    onChange(info) {
      if (info.file.status === "done") {
        if (info.file.response && info.file.response.file.url) {
          const thumbnailUrl = info.file.response.file.url;
          setThumbnailUrl(thumbnailUrl);
          setThumbnailFileList([info.file]);
        } else {
          message.error("Failed to upload thumbnail");
        }
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleChoice = (e: RadioChangeEvent) => {
    setChoice(e.target.value);
    setMediaUrl("");
    setThumbnailUrl("");
    form.resetFields(["mediaUrl"]);
  };

  const onFinishFailed = () => {
    message.error("Please fill in all required fields");
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      values.mediaUrl = mediaUrl || values.mediaUrl;
      values.thumbnailUrl = thumbnailUrl || values.thumbnailUrl;
      if (values.mediaType !== "image") {
        values.mediaType = "video";

        if (!values.thumbnailUrl) {
          message.error("Please upload a thumbnail for your video");
          return;
        }
      }

      await mutateAsync({
        mediaUrl: values.mediaUrl,
        thumbnailImage: values.thumbnailUrl,
        tag: values.tag,
        title: values.title,
        type: values.mediaType,
      });

      form.resetFields();
      setMediaUrl("");
      setThumbnailUrl("");
    } catch (error: any) {
      console.log(error);
      if (error?.errorFields[0]?.errors[0]) {
        message.error(error?.errorFields[0]?.errors[0]);
      } else {
        message.error("Something went wrong!");
      }
    }
  };

  return (
    <div>
      <Card bordered={false} className="w-full">
        <div
          className="w-full text-[16px] mb-3 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Back
        </div>
        <div className="text-xl md:text-3xl font-bold">Add New Post</div>

        <Form className="mt-5" form={form} onFinishFailed={onFinishFailed}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="tag"
            label="Tag"
            rules={[{ required: true, message: "Please select a tag" }]}
          >
            <Select
              mode="tags"
              allowClear
              className="w-full"
              placeholder=""
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={VALUE_CHAIN_OPTIONS}
            />
          </Form.Item>

          <Form.Item label="Media Type" name="mediaType">
            <Radio.Group onChange={handleChoice} defaultValue={"image"}>
              <Radio value="image"> Image upload </Radio>
              <Radio value="video"> Video Upload </Radio>
              <Radio value="link"> Video Link </Radio>
            </Radio.Group>
          </Form.Item>

          {choice !== "link" && (
            <Form.Item
              label="Media"
              valuePropName="fileList"
              getValueFromEvent={() => fileList}
              rules={[
                { required: true, message: "Please upload a media file" },
              ]}
            >
              {choice === "image" && (
                <ImgCrop aspect={16 / 9}>
                  <Upload {...props}>
                    <button
                      style={{ border: 0, background: "none" }}
                      type="button"
                    >
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload Image</div>
                    </button>
                  </Upload>
                </ImgCrop>
              )}

              {choice === "video" && (
                <Upload {...props}>
                  <button
                    style={{ border: 0, background: "none" }}
                    type="button"
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload Video</div>
                  </button>
                </Upload>
              )}
            </Form.Item>
          )}

          {choice === "link" && (
            <Form.Item
              name="mediaUrl"
              label="Media"
              rules={[{ required: true, message: "Please enter a video link" }]}
            >
              <Input onChange={(e) => setMediaUrl(e.target.value)} />
            </Form.Item>
          )}

          {choice != "image" && (
            <Form.Item
              label="Thumbnail"
              // name="thumbnailImage"
              valuePropName="fileList"
              getValueFromEvent={() => thumbnailFileList}
              rules={[
                { required: true, message: "Please upload a thumbnail image" },
              ]}
            >
              <ImgCrop aspect={2 / 3}>
                <Upload {...thumbnailProps}>
                  <button
                    style={{ border: 0, background: "none" }}
                    type="button"
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload Thumbnail</div>
                  </button>
                </Upload>
              </ImgCrop>
            </Form.Item>
          )}

          {choice === "link" && (
            <div>
              Preview:
              <div className="w-[150px] h-[150px]">
                <ReactPlayer
                  url={mediaUrl}
                  width="100%"
                  height="100%"
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
              </div>
            </div>
          )}

          <Button
            type="primary"
            className="mt-3"
            onClick={handleSubmit}
            loading={isLoading}
          >
            Submit Post
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default AddFeaturedPosts;
