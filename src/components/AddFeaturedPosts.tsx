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
import { VALUE_CHAIN_OPTIONS } from "../constants";
import ImgCrop from "antd-img-crop";
import type { UploadProps } from "antd";
import ReactPlayer from "react-player";
import { useMutation } from "react-query";
import { api } from "../api/api";
import { FaPlus } from "react-icons/fa";

const AddFeaturedPosts = () => {
  //eslint-disable-next-line
  const [fileList, setFileList] = useState<any[]>([]);
  const [choice, setChoice] = useState<string>("image");
  const [mediaUrl, setMediaUrl] = useState<string>();

  const [form] = Form.useForm();

  console.log();

  const addNewPost = async ({
    mediaUrl,
    title,
    tag,
  }: {
    mediaUrl: string;
    title: string;
    tag: string[];
  }) => {
    const { data } = await api.post(`/featured`, {
      mediaUrl,
      title,
      tag,
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
    action: `/upload`,
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

  const handleChoice = (e: RadioChangeEvent) => {
    setChoice(e.target.value);
    setMediaUrl(""); // Reset mediaUrl on choice change
    form.resetFields(["mediaUrl"]); // Reset mediaUrl field in form
  };

  const onFinishFailed = () => {
    message.error("Please fill in all required fields");
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      // Add the mediaUrl to the form values before submission
      values.mediaUrl = mediaUrl || values.mediaUrl;

      await mutateAsync({
        mediaUrl: values.mediaUrl,
        tag: values.tag,
        title: values.title,
      });
      console.log(values);

      form.resetFields();
      // Submit your form data here
    } catch (error) {
      message.error("Something went wrong!");
    }
  };

  return (
    <div>
      <Card bordered={false} className="w-full">
        <div className="text-xl md:text-3xl font-bold">Featured Posts</div>
        <div className="mt-5 w-full flex justify-end">
          Add New <FaPlus />
        </div>

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

          <Form.Item label="Media Type">
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
